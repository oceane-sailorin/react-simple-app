import logo from './logo.svg';
import './App.css';
import React, { useEffect } from "react";
import { Routes, Route, Link, useNavigate, BrowserRouter } from "react-router-dom"; 
import { IKUIInit, IKUIUserAPI } from "@indykiteone/jarvis-sdk-web";
import Login from "./components/Login";
import Registration from "./components/Registration";
import ForgotPassword from "./components/ForgotPassword";
import {useLocation} from 'react-router-dom';


function App() {
  
  const [token, setToken] = React.useState(null);
  const [refreshToken, setRefreshToken] = React.useState(null);
  
  return (
    <div>
      <header>
        <h1>Sample Login App</h1>
      </header>
  
      <Routes>
      <Route path="/" exact element={<Home />}> </Route> 
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/registration" element={<Registration setToken={setToken} />} />
      <Route path="/authenticated" element={<Authenticated />} />
      <Route path="/callback" element={<Callback setToken={setToken} />} />
      <Route path="/forgot" element={<ForgotPassword setToken={setToken} />} />
      
      </Routes>
    </div>
  );
}

function Home() {
  const onLoginStart = React.useCallback(() => {
    const uiSwitch = localStorage.getItem("whatUiToUse");
    localStorage.clear();
    localStorage.setItem("whatUiToUse", uiSwitch);
   }, []);
  return (
    <>
       <div className="App">
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </div>
      <nav>
        <Link to="/login">
           <button id="start-btn" onClick={onLoginStart}>
             Start
           </button>
          </Link>
      </nav>
    </>
  );
}

function Authenticated() {

  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [refreshToken, setRefreshToken] = React.useState(null);
 
  useEffect(() => {
    if (location.state) {
      setData(new Map(Object.entries(location.state.data)));
      setToken(location.state.token);  
      setRefreshToken(location.state.refresh_token);  
    }
  }, []);
 


  const onLogout = React.useCallback(() => {
    IKUIUserAPI.logoutCurrentUser()
      .then(() => {
        setToken(null);
        setRefreshToken(null);
        navigate("/login");
      })
      .catch(console.log);
  }, [navigate]);

  const onRefreshToken = React.useCallback(() => {
    IKUIUserAPI.getValidAccessToken({ refreshToken: refreshToken })
      .then((token) => {
        setRefreshToken(token);
        //setToken(null);
      })
      .catch(console.log);
  }, []);

 

  return (
    <>
    {token || refreshToken ? (
      <>
      <div className="buttons-wrapper">
        <button id="refresh-token-btn" onClick={onRefreshToken}>
          Refresh token
        </button>
        <button id="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
      </>
    ) : (
      <>
        <h5>No token found</h5>
        <Link to="/login">go to login</Link>
      </>
    )}
    {data && (
        <div className="responseWrapper">
          <h4>Token</h4>
          <p id="token-field">{data.get('token')}</p>
          <h4>Refresh Token</h4>
          <p id="refresh-token-field">{data.get('refresh_token')}</p>
          <h4>Token Type</h4>
          <p id="token-type-field">{data.get('token_type')}</p>
          <h4>Token Expiration (timestamp)</h4>
          <p id="token-expiration-field">{data.get('expiration_time')}</p>
          <h4>Token Expires In (seconds)</h4>
          <p id="token-expires-in-field">{data.get('expires_in')}</p>
        </div>
      )}
      {refreshToken && (
        <div className="responseWrapper">
          <h4>Token</h4>
          <p id="token-field">{refreshToken}</p>
        </div>
      )}
    </>
  );
}

function Callback() {
}


export default App;
