import { UserOutlined } from '@ant-design/icons';
import { Input, Button, message } from 'antd';
import axios from 'axios';
import React from 'react';
import { baseUrl } from '../../../utils/helpers';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UploadProfilePhoto from './uploadProfilePhoto';

const { TextArea } = Input;

const validateInput = (userInfo) => {
  let result;
  if (!userInfo.name.trim()) {
    result = 'Please provide your name';
  }
  return result;
};

const UpdateProfile = () => {
  const { user, setUser } = React.useContext(AuthContext);
  const [userProfile, setUserProfile] = React.useState({
    name: user.name,
    profile_bio: user.profile_bio,
    facebook_link: user.facebook_link,
    phone_number: user.phone_number,
    twitter_link: user.twitter_link,
    github_link: user.github_link,
    linkedin_link: user.linkedin_link,
    instagram_link: user.instagram_link,
    profile_picture: user.profile_picture,
  });
  const [loading, setLoading] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserProfile((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));

    if (validateInput(userProfile)) {
      messageApi.open({
        style: {
          color: 'red',
        },
        type: 'error',
        content: validateInput(userProfile),
      });

      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}/auth/update-profile`,
        userProfile,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      navigate(
        `/${response.data.name.replace(/\s+/g, '_')}?${response.data._id}`
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="mb-4">
        <UploadProfilePhoto setUserProfile={setUserProfile} />
        <div className="w-full">
          <p className="mb-4 font-semibold">Name</p>
          <Input
            width="full"
            name="name"
            size="large"
            onChange={handleInput}
            value={userProfile.name}
            // disabled
            placeholder="Your name"
            prefix={<UserOutlined />}
          />
        </div>
      </div>

      <p className="font-semibold">Your bio</p>
      <TextArea
        rows={4}
        name="profile_bio"
        onChange={handleInput}
        size="large"
        placeholder="Profile bio"
        defaultValue={user?.profile_bio}
      />

      <h3>Social links</h3>
      <section>
        <div className="flex gap-4 w-full">
          <InputField
            title={'Phone number'}
            name="phone_number"
            addonBefore={'+234'}
            handleInput={handleInput}
            defaultValue={user?.phone_number}
            placeholder="+234123456789"
          />

          <InputField
            title={'Facebook'}
            name="facebook_link"
            handleInput={handleInput}
            defaultValue={user?.facebook_link}
            placeholder="https://www.facebook.com/username"
          />
        </div>
        <div className="flex gap-4">
          <InputField
            title={'X (formerly Twitter)'}
            name="twitter_link"
            handleInput={handleInput}
            defaultValue={user?.twitter_link}
            placeholder="https://x.com/username"
          />
          <InputField
            title={'Github'}
            name="github_link"
            defaultValue={user?.github_link}
            handleInput={handleInput}
            placeholder="https://github.com/username"
          />
        </div>

        <div className="flex gap-4 w-full">
          <InputField
            title={'LinkedIn'}
            name="linkedin_link"
            defaultValue={user?.linkedin_link}
            handleInput={handleInput}
            placeholder="https://www.linkedin.com/in/username"
          />
          <InputField
            title={'Instagram'}
            name="instagram_link"
            defaultValue={user?.instagram_link}
            handleInput={handleInput}
            placeholder="https://www.instagram/username"
          />
        </div>
      </section>
      <br />
      <br />
      <Button
        loading={loading}
        size="large"
        onClick={handleSubmit}
        type="primary"
        block
      >
        Update
      </Button>
    </>
  );
};
export default UpdateProfile;

const InputField = ({
  title,
  name,
  handleInput,
  placeholder,
  addonBefore,
  defaultValue,
}) => {
  return (
    <div className="w-full">
      <p className="font-semibold">{title}</p>
      <Input
        size="large"
        defaultValue={defaultValue}
        name={name}
        onChange={handleInput}
        addonBefore={addonBefore ? addonBefore : 'http://'}
        placeholder={placeholder}
      />
    </div>
  );
};
