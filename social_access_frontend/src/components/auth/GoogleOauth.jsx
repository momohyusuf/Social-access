import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { baseUrl } from "../../utils/helpers";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const GoogleSignInAuth = () => {
  const { setUser } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/google/callback`, {
        googleToken: credentialResponse.credential,
      });

      //   console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("accessToken", JSON.stringify(response.data.token));
      setUser(response.data.user);
      navigate("/settings");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* {contextHolder} */}
      <GoogleLogin
        text="continue_with"
        theme="filled_black"
        shape="circle"
        onSuccess={(credentialResponse) =>
          handleGoogleSuccess(credentialResponse)
        }
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </>
  );
};

export default GoogleSignInAuth;
