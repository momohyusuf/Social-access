import React from 'react';
import { Button, Avatar } from 'antd';
import UpdateProfile from './UpdateProfile';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import { baseUrl } from '../../../utils/helpers';

const Settings = () => {
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);

  const handlePageNav = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    navigate(`/${user?.name?.replace(/\s+/g, '_')}?${user._id}`);
  };
  const handleAccountDeleting = async () => {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));

    setLoading(true);
    try {
      await axios.delete(`${baseUrl}/auth/`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      navigate(`/`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="container mx-auto flex flex-col md:flex-row my-10 gap-10">
      <div className="md:w-2/5 shadow-md rounded-lg p-4 border bg-white  border-gray-200 border-solid h-fit">
        <div className="grid place-items-center">
          <Avatar
            src={
              user?.profile_picture?.url ||
              'https://th.bing.com/th/id/OIP.pc5acKBwn4ol1rWfu1ETKwHaHW?rs=1&pid=ImgDetMain'
            }
            shape="square"
            style={{
              maxHeight: '300px',
              maxWidth: '300px',
              height: '100%',
              width: '100%',
            }}
            alt="my profile picture"
          />
          <h1 className="text-2xl capitalize">{user?.name}</h1>
          <p className="text-gray-500 text-[1.2rem]">
            {user?.profile_bio || 'null'}
          </p>
        </div>
        <Button type="primary" size="large" onClick={handlePageNav} block>
          View
        </Button>
        <div className="mt-4">
          <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={handleAccountDeleting}
            block
            danger
          >
            Delete my account
          </Button>
        </div>
      </div>
      <div className="md:w-3/5 shadow-md rounded-lg p-4 border bg-white border-gray-200 border-solid">
        <h1>Update links</h1>
        <UpdateProfile />
      </div>
    </section>
  );
};

export default Settings;
