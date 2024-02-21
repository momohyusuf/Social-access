import React from 'react';
import { Button, Tooltip } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { LogoutOutlined } from '@ant-design/icons';

import { AuthContext } from '../../context/AuthContext';

// Define the Navbar component
const Navbar = () => {
  // Use the useNavigate hook to navigate to different routes
  const navigate = useNavigate();

  // Use the useContext hook to access the AuthContext
  const { user, setUser } = React.useContext(AuthContext);

  // Return the JSX for the Navbar component
  return (
    <nav className="shadow bg-white">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {' '}
        {/* Logo and link to the homepage */}
        <h2 className="text-[#1ea7eb]">
          <Link to={'/'}>Social access</Link>
        </h2>
        {/* Display different content depending on whether the user is logged in or not */}
        {user ? (
          // If the user is logged in, display their name and avatar, and a button to navigate to their profile page
          <span className="flex gap-2 items-center">
            <Button
              icon={<LogoutOutlined />}
              style={{
                textTransform: 'capitalize',
                fontWeight: '600',
              }}
              type="text"
              onClick={() => {
                localStorage.removeItem('user');
                localStorage.removeItem('accessToken');
                setUser(null);
                navigate('/');
              }}
            >
              Logout
            </Button>

            <Tooltip title={user?.name}>
              <Button
                size="large"
                onClick={() =>
                  navigate(`/${user.name.replace(/\s+/g, '_')}?${user._id}`)
                }
                // type="text"
              >
                <span className="font-extrabold text-[#1ea7eb]">
                  {' '}
                  {user?.name?.slice(0, 1)}
                </span>
              </Button>
            </Tooltip>
          </span>
        ) : (
          // If the user is not logged in, display buttons to navigate to the login and sign up pages
          <div className="flex gap-4">
            <Button onClick={() => navigate('/login')}>Login</Button>
            <Button onClick={() => navigate('/sign-up')} type="primary">
              Sign up
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

// Export the Navbar component
export default Navbar;

// This version of the code includes detailed comments that explain the purpose of each part of the code, making it easier to understand and modify.
