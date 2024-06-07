const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const statusCode = require('../constants/statusCodes');
const Token = require('../models/Tokens');
const { APIError } = require('../middleware/handleAsyncRequest');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new APIError('Invalid email or password', statusCode.unauthorized);
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new APIError('Invalid email or password', statusCode.unauthorized);
  }
  const token = await Token.generateToken(user._id);
  return { success: true, user, token };
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.header('Authorization');
    if (!refreshToken) {
      throw new APIError('Invalid refresh token', statusCode.badRequest);
    }

    /*
    check if the token exists in the database before verifying.
    protect agaist token tempering
    */
    const token = await Token.findOne({ token: refreshToken.split(' ')[1] });
    if (!token) {
      throw new APIError('Invalid refresh token', statusCode.badRequest);
    }
    const decoded = jwt.verify(refreshToken, CONFIG.REFRESH_SECRET);
    const user = await User.findById(decoded.userId);
    const newToken = await Token.generateToken(user._id);
    return { success: true, user, newToken };
  } catch (error) {
    console.log(error);
    throw new APIError('Invalid refresh token', statusCode.badRequest);
  }
};

const logout = async (req, res) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      throw new APIError('Invalid token', statusCode.badRequest);
    }
    await Token.findOneAndDelete({ token: token.split(' ')[1] });
    return { success: true, message: 'Logout successful' };
  } catch (error) {
    console.log(error);
    throw new APIError('Unable to logout.', statusCode.badRequest);
  }
};

// default user created for testing
const createUser = async (req, res) => {
  try {
    const userExist = await User.findOne({ email: 'akash@madkudu.com' });
    if (userExist) {
      return { success: true, message: 'User already exists' };
    }
    const { email, password } = {
      email: 'akash@madkudu.com',
      password: 'password',
    };
    const user = await User({ email, password });
    await user.save();
    return { success: true, user };
  } catch (error) {
    console.log(error);
    throw new APIError('Unable to create user.', statusCode.badRequest);
  }
};

module.exports = { login, refreshToken, logout, createUser };
