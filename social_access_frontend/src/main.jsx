import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import { ConfigProvider } from "antd";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
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
