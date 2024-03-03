import React from "react";
import { Button, Skeleton, Avatar, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  FacebookOutlined,
  GithubOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
  CopyOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../utils/helpers";
import axios from "axios";
import QrCodeModal from "./QrCodeModal";
import ProfileSeo from "./ProfileSeo";

const ViewProfile = () => {
  const [singleUser, setSingleUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = React.useContext(AuthContext);
  let userId = location.search.slice(1);
  const [messageApi, contextHolder] = message.useMessage();
  const [urlOrigin, setUrlOrigin] = React.useState("");

  React.useEffect(() => {
    setUrlOrigin(window.location.origin);
  }, []);

  //   Function to handle copying the timeline link to user clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${urlOrigin}/${singleUser?.name?.replace(/\s+/g, "_")}?${
          singleUser?._id
        }`
      );
      message.success("Profile link copied successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageNav = () => {
    navigate(`/settings`);
  };

  const getUserInfo = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/auth/${userId}`);
      console.log(res);
      setSingleUser(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const sendWhatsAppMessage = (userPhoneNumber) => {
    // Replace with the message you want to send
    let userWhatsAppNumber;

    if (userPhoneNumber.startsWith("+234")) {
      userWhatsAppNumber = userPhoneNumber;
    }

    if (userPhoneNumber.length === 10) {
      userWhatsAppNumber = `+234${userPhoneNumber}`;
    }

    if (!userPhoneNumber.startsWith("+234") && userPhoneNumber.length !== 10) {
      userWhatsAppNumber = `+234${userPhoneNumber.slice(1)}`;
    }
    return `https://wa.me/${userWhatsAppNumber}`;
  };

  React.useEffect(() => {
    getUserInfo();
  }, []);

  if (loading) {
    return (
      <div className="grid h-screen place-items-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <ProfileSeo
        title={`Social access | ${singleUser?.name}`}
        description={singleUser?.profile_bio}
        name={singleUser?.name}
        image={singleUser?.profile_picture?.url}
      />
      <section className="container mx-auto flex flex-col md:flex-row my-10 gap-10">
        {contextHolder}
        <div className="card md:w-2/5 h-fit shadow-md rounded-lg p-4 border  border-gray-200 border-solid">
          <div className="grid place-items-center">
            {loading ? (
              <Skeleton.Image
                active={loading}
                style={{
                  width: "24rem",
                  height: "24rem",
                }}
              />
            ) : (
              <Avatar
                src={
                  singleUser?.profile_picture?.url ||
                  "https://th.bing.com/th/id/OIP.pc5acKBwn4ol1rWfu1ETKwHaHW?rs=1&pid=ImgDetMain"
                }
                shape="square"
                // className="w-full h-64 md:w-96 max-w-full rounded-md"
                style={{
                  height: "300px",
                  width: "300px",
                }}
                alt="my profile picture"
              />
            )}
            {loading ? (
              <Skeleton.Input active={loading} size={"large"} />
            ) : (
              <h1>{singleUser?.name}</h1>
            )}
            {loading ? (
              <div className="mt-2">
                {" "}
                <Skeleton.Input active={loading} size={"small"} />
              </div>
            ) : (
              <p className="text-gray-300">
                {singleUser?.profile_bio || "null"}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            {user && user._id === userId && (
              <Button type="primary" onClick={handlePageNav} block>
                Update profile
              </Button>
            )}
            <Button onClick={handleCopy} icon={<CopyOutlined />} block>
              Copy profile link
            </Button>
          </div>
          <div className="mt-4">
            {" "}
            <QrCodeModal
              qrCodeLink={`${urlOrigin}/${singleUser?.name?.replace(
                /\s+/g,
                "_"
              )}?${singleUser?._id}`}
            />
          </div>
        </div>
        <div className=" card md:w-3/5 shadow-md h-fit rounded-lg p-4 border bg-white border-gray-200 border-solid">
          <h1>Social links</h1>
          {/* <UpdateProfile /> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {singleUser?.github_link && (
              <SocialLink
                link={singleUser?.github_link}
                bgColor={"bg-black"}
                icon={
                  <GithubOutlined
                    style={{ fontSize: "2rem", color: "white" }}
                  />
                }
                description={"Github profile"}
              />
            )}

            {singleUser?.linkedin_link && (
              <SocialLink
                link={singleUser?.linkedin_link}
                bgColor={"bg-[#40A2E3]"}
                icon={
                  <LinkedinOutlined
                    style={{ fontSize: "2rem", color: "white" }}
                  />
                }
                description={"LinkedIn profile"}
              />
            )}

            {singleUser?.twitter_link && (
              <SocialLink
                link={singleUser?.twitter_link}
                bgColor={"bg-black"}
                icon={
                  <TwitterOutlined
                    style={{ fontSize: "2rem", color: "white" }}
                  />
                }
                description={"Twitter profile"}
              />
            )}

            {singleUser?.instagram_link && (
              <SocialLink
                link={singleUser?.instagram_link}
                bgColor={"bg-gradient-to-r from-[#EB0F1D] to-[#9049C6]"}
                icon={
                  <InstagramOutlined
                    style={{ fontSize: "2rem", color: "white" }}
                  />
                }
                description={"Instagram profile"}
              />
            )}

            {singleUser?.facebook_link && (
              <SocialLink
                link={singleUser?.facebook_link}
                bgColor={"bg-blue-700"}
                icon={
                  <FacebookOutlined
                    style={{ fontSize: "2rem", color: "white" }}
                  />
                }
                description={"Facebook profile"}
              />
            )}
            {singleUser?.email && (
              <SocialLink
                link={`mailto:${singleUser?.email}`}
                mail
                bgColor={"bg-white"}
                icon={
                  <MailOutlined style={{ fontSize: "2rem", color: "black" }} />
                }
                description={"Send a mail"}
              />
            )}

            {singleUser?.phone_number && (
              <SocialLink
                link={`tel:${singleUser?.phone_number}`}
                bgColor={"bg-green-500"}
                icon={
                  <PhoneOutlined style={{ fontSize: "2rem", color: "white" }} />
                }
                description={"Call"}
              />
            )}

            {singleUser?.phone_number && (
              <SocialLink
                link={sendWhatsAppMessage(singleUser?.phone_number)}
                bgColor={"bg-green-800"}
                icon={
                  <WhatsAppOutlined
                    style={{ fontSize: "2rem", color: "white" }}
                  />
                }
                description={"Text on whatsapp"}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewProfile;

const SocialLink = ({ link, icon, description, bgColor, mail }) => {
  return (
    <a
      href={link}
      rel="noreferrer"
      target="_blank"
      className={`rounded-md ${bgColor} ${
        mail ? "text-black" : "text-white"
      } shadow w-full border-2 justify-center border-gray-200 border-solid flex items-center gap-4 p-2 hover:opacity-50 hover:border-2 hover:border-black transition-all duration-300`}
    >
      <span>{icon}</span>
      <span className="font-semibold text-2xl capitalize ">{description}</span>
    </a>
  );
};
