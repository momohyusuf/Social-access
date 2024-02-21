const CustomError = require('../utils/customError'); // Import the custom error class
const UserModel = require('../model/userModel'); // Import the user model
const HTTPSTATUSCODE = require('../utils/httpStatusCodes'); // Import the HTTP status codes
const { generateJwtToken } = require('../utils/tokens'); // Import the function to generate JWT tokens
const validator = require('validator').default; // Import the validator library
const bcrypt = require('bcrypt'); // Import the bcrypt library for password hashing

const signUpUser = async (req, res) => {
  // Extract the name, email, and password from the request body
  const { name, email, password } = req.body;

  // Validate the input
  if (
    !name?.trim() || // Check if the name is empty or contains only whitespace
    !validator?.isEmail(email) || // Check if the email is valid
    !password?.trim() // Check if the password is provided
  ) {
    // If any of the checks fail, throw a custom error
    res
      .status(HTTPSTATUSCODE.BAD_REQUEST)
      .json({ message: 'Please provide the required values' });
    return;
  }

  // Check if a user with the provided email already exists
  const checkUser = await UserModel.findOne({ email });
  if (checkUser) {
    // If a user with the same email exists, throw a custom error
    res
      .status(HTTPSTATUSCODE.BAD_REQUEST)
      .json({ message: `An account with ${email} already exist` });
    return;
  }

  // Create a new user with the provided data
  const newUser = await UserModel.create({
    name,
    email,
    password,
  });

  // Generate a JWT access token for the user
  const accessToken = await generateJwtToken({
    userId: newUser._id, // Use the user's ID as the subject of the token
    name: newUser.name, // Include the user's name in the token payload
    email: newUser.email, // Include the user's email in the token payload
  });

  // Send the response with the user's information and the access token
  res
    .status(HTTPSTATUSCODE.CREATED) // Set the status code to 201 (Created)
    .json({ ...newUser._doc, password: undefined, accessToken }); // Send the user's name, email, and the access token in the response body
};

const signIn = async (req, res) => {
  // Extract the email and password from the request body
  const { email, password } = req.body;

  // Validate the input
  if (!validator.isEmail(email) || !password) {
    // If any of the checks fail, throw a custom error
    throw new CustomError(
      HTTPSTATUSCODE.BAD_REQUEST,
      'Please provide the required values'
    );
  }

  // Find the user with the provided email
  const user = await UserModel.findOne({ email });

  // If the user does not exist, throw a custom error
  if (!user) {
    throw new CustomError(
      HTTPSTATUSCODE.BAD_REQUEST,
      'Account not found check your email and password'
    );
  }

  // Compare the provided password with the user's hashed password
  const passwordCorrect = await bcrypt.compare(password, user.password);

  // If the password is incorrect, throw a custom error
  if (!passwordCorrect) {
    throw new CustomError(
      HTTPSTATUSCODE.BAD_REQUEST,
      'Password or email is incorrect'
    );
  }

  // Generate a JWT access token for the user
  const accessToken = await generateJwtToken({
    userId: user._id, // Use the user's ID as the subject of the token
    name: user.name, // Include the user's name in the token payload
    email: user.email, // Include the user's email in the token payload
  });

  // Create a user info object to send in the response

  // Send the response with the user's information and the access token
  res.status(200).json({ ...user._doc, password: undefined, accessToken }); // Send the user's name, user ID, and the access token in the response body
};

module.exports = {
  signUpUser,
  signIn,
};
