import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IKUICore } from "@indykiteone/jarvis-sdk-web";

const Registration = ({ setToken }) => {
  const navigate = useNavigate();
  const onSuccess = React.useCallback(
    (data) => {
      //setToken(data);
      //navigate("/authenticated");
      console.log(data) ;  
      navigate("/authenticated", {state:{token:data.token, refresh_token:data.refresh_token, data: data}});
    },
    [navigate],
  );

  useEffect(() => {
    IKUICore.renderRegister({
      renderElementSelector: ".register-container",
      onSuccessRegistration: onSuccess,
      redirectUri: "/callback",
      labels: {
        // username: "Custom Username",
        // password: "Custom Password",
        // confirmPassword: "Custom Confirm Password",
        // registerButton: "Custom Join",
        // alreadyHaveAnAccountButton: "Custom Already have an account",
        //     orOtherOptions: "Custom you can also continue with"
      },
      // termsAgreementSectionContent:
      // "<h5>By clicking Agree & Join you agree with our secret terms and conditions.</h5>",
    });
  });
  return (
    <div>
      <div className="register-container" style={{ width: 350 }} />
    </div>
  );
};
export default Registration;
