import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import { ConfigProvider } from "antd";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="356216069827-a1lkq3hcpdmqvt14uhmf3h2n50snro96.apps.googleusercontent.com">
    <AuthContextProvider>
      <BrowserRouter>
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: "black",
              borderRadius: 8,

              // // Alias Token
              // colorBgContainer: '#f6ffed',
            },
          }}
        >
          {" "}
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </GoogleOAuthProvider>
);
