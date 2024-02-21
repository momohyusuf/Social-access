import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Skeleton, Upload, Avatar } from 'antd';
import axios from 'axios';

const UploadProfilePhoto = ({ setUserProfile }) => {
  const [previousImage, setPreviousImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleChange = async ({ fileList: newFileList }) => {
    setLoading(true);
    try {
      console.log(newFileList[0]);
      const formData = new FormData();
      formData.append('file', newFileList[0].originFileObj);
      formData.append('upload_preset', 'ml_default'); // Replace 'your_cloudinary_upload_preset' with your actual Cloudinary upload preset

      const { data } = await axios.post(
        'https://api.cloudinary.com/v1_1/starkweb/image/upload',
        formData
      );
      const { public_id, secure_url } = data;
      setPreviousImage({ public_id, url: secure_url });
      setUserProfile((preValue) => ({
        ...preValue,
        profile_picture: {
          public_id,
          url: secure_url,
        },
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  return (
    <div>
      <Upload
        listType="picture-circle"
        maxCount={1}
        fileList={fileList}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {loading ? (
        <Skeleton.Image active={loading} />
      ) : (
        previousImage?.url && (
          <div className="mx-4">
            <Avatar size={64} src={previousImage.url} />
          </div>
        )
      )}
    </div>
  );
};
export default UploadProfilePhoto;
