import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './pages/layouts/MainLayout';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/Sign-up';
import Settings from './pages/profile/settings/Settings';
import ViewProfile from './pages/profile/ViewProfile';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const { user } = React.useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route
          path="sign-up"
          element={user ? <Navigate to="/settings" /> : <SignUp />}
        />

        <Route
          path="login"
          element={user ? <Navigate to="/settings" /> : <Login />}
        />
        <Route
          path="settings"
          element={!user ? <Navigate to="/login" /> : <Settings />}
        />
        <Route path=":profile_name" element={<ViewProfile />} />
      </Route>
    </Routes>
  );
};

export default App;
