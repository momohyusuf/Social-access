const jwt = require('jsonwebtoken');
const HTTPSTATUSCODE = require('../utils/httpStatusCodes');
const CustomError = require('../utils/customError');

// authenticate user login session

const authenticationMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  //   step one check if token is provided
  if (!token) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, 'Not authorized');
  }
  //   step two verify jwt token
  const verifyToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (!verifyToken) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, 'Not authorized');
  }
  /* this req.user object will the accessable in the next func that comes after this
            so just do "req.user" in the next fuction to access it */

  req.user = verifyToken;
  next();
};

module.exports = { authenticationMiddleware };
