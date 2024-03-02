const CustomError = require("../utils/customError"); // Import the custom error class
const UserModel = require("../model/userModel"); // Import the user model
const HTTPSTATUSCODE = require("../utils/httpStatusCodes"); // Import the HTTP status codes
const { generateJwtToken } = require("../utils/tokens"); // Import the function to generate JWT tokens
const validator = require("validator").default; // Import the validator library
const bcrypt = require("bcrypt"); // Import the bcrypt library for password hashing
const jwt = require("jsonwebtoken");

const googleAuth = async (req, res) => {
  // extract the google token
  const { googleToken } = req.body;
  // confirm that the google token is provided
  if (!googleToken) {
    throw new CustomError(HTTPSTATUSCODE.BAD_REQUEST, "Invalid credentials");
  }
  // decode the token and extract it's values
  const decoded = jwt.decode(googleToken);
  if (!decoded) {
    throw new CustomError(HTTPSTATUSCODE.BAD_REQUEST, "Invalid credentials");
  }
  const user = await UserModel.findOne({
    email: { $regex: new RegExp(decoded.email, "i") },
  });

  //   if user already exist, return their already existing credentials
  if (user) {
    const userInfo = {
      userId: user._id, // Use the user's ID as the subject of the token
      name: user.name, // Include the user's name in the token payload
      email: user.email, // Include the user's email in the token payload
    };

    // first create a jsonwebtoken and a refresh token
    const token = await generateJwtToken(userInfo);
    // establish a login session
    return res.status(HTTPSTATUSCODE.OK).json({ user, token });
  }

  //   create a new account with for the user
  const createNewUser = await UserModel.findOneAndUpdate(
    { email: decoded.email },
    {
      name: decoded.name,
      email: decoded.email,
    },
    {
      upsert: true,
      new: true,
    }
  );

  //   information to encrypt in the jsonwebtoken
  const userInfo = {
    userId: createNewUser._id,
    email: createNewUser.email,
    name: createNewUser.name,
  };

  // first create a jsonwebtoken
  const token = await generateJwtToken(userInfo);
  // establish a login session
  res.status(HTTPSTATUSCODE.OK).json({ createNewUser, token });
};

module.exports = {
  googleAuth,
};
