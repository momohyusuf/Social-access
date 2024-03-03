import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./pages/layouts/MainLayout";
import Settings from "./pages/profile/settings/Settings";
import ViewProfile from "./pages/profile/ViewProfile";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
const App = () => {
  const { user } = React.useContext(AuthContext);
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route
              path="settings"
              element={!user ? <Navigate to="/" /> : <Settings />}
            />
            <Route path=":profile_name" element={<ViewProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
