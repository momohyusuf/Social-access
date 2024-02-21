const UserModel = require('../model/userModel'); // Import the user model
const HTTPSTATUSCODE = require('../utils/httpStatusCodes'); // Import the HTTP status codes
const validator = require('validator').default; // Import the validator library

// function to update profile
const updateUserProfile = async (req, res) => {
  const { userId } = req.user;
  const {
    name,
    profile_bio,
    facebook_link,
    linkedin_link,
    twitter_link,
    github_link,
    phone_number,
    instagram_link,
    profile_picture,
  } = req.body;

  const updatedProfile = await UserModel.findOneAndUpdate(
    { _id: userId },
    {
      name: name,
      profile_bio,
      facebook_link,
      linkedin_link,
      twitter_link,
      github_link,
      phone_number,
      instagram_link,
      profile_picture,
    },
    { new: true }
  ).select('-password');

  res.status(HTTPSTATUSCODE.CREATED).json(updatedProfile);
};

const getUserProfile = async (req, res) => {
  const { userId } = req.params;
  const user = await UserModel.findOne({ _id: userId }).select('-password');
  res.status(HTTPSTATUSCODE.CREATED).json(user);
};

const deleteUserProfile = async (req, res) => {
  const { userId } = req.user;
  await UserModel.findOneAndDelete({ _id: userId });
  res
    .status(HTTPSTATUSCODE.CREATED)
    .json({ message: 'Account deleted successfully' });
};

module.exports = { updateUserProfile, getUserProfile, deleteUserProfile };
