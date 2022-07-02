import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IKUICore } from "@indykiteone/jarvis-sdk-web";

  const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const onSuccess = React.useCallback(
    (data) => {
      //setToken(data);
      //console.log(data.refresh_token) ;  
      navigate("/authenticated", {state:{token:data.token, refresh_token:data.refresh_token, data: data}});
    },
    [navigate],
  );

  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      IKUICore.render({
        renderElementSelector: ".login-container",
        onSuccessLogin: onSuccess,
        redirectUri: "/callback",
        forgotPasswordPath: "/forgot",
        userInputNote: "Username must be in email form",
      passwordInputNote: "Password must be at least 8 characters",
      passwordCheckInputNote: "Passwords must match" 
        // labels: {
        //   username: "Custom Username",
        //   password: "Custom Password",
        //   loginButton: "Custom Login with us!",
        //     registerButton: "Custom Register",
        //     forgotPasswordButton: "custom Forgot Password",
        //     orOtherOptions: "Custom you can also continue with"
        // }
        });
      }
      return () => {
        ignore = true;
      };
    });

  
  return (
    <div>
      <div className="login-container" style={{ width: 350 }} />
    </div>
  );
};
export default Login;