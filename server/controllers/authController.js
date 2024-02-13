import asyncHandler from 'express-async-handler';
import validator from 'validator';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { cloudUpload } from '../utils/cloudinary.js';
import jwt from 'jsonwebtoken';

/**
 * @DESC Register a User
 * @ROUTE /api/v1/auth/register
 * @method POST
 * @access public
 */
export const register = asyncHandler(async (req, res) => {
  const { userName, email, password, confirmPassword } = req.body;

  //   <!-- User validation -->

  if (!userName) {
    return res.status(400).json({ message: 'please provide your user name' });
  }

  if (!email) {
    return res.status(400).json({ message: 'please provide your email' });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'please provide your valid email' });
  }

  if (!password) {
    return res.status(400).json({ message: 'please provide your password' });
  }

  if (password.length < 4) {
    return res.status(400).json({ message: 'please provide password must be 4 character' });
  }

  if (!confirmPassword) {
    return res.status(400).json({ message: 'please provide your confirm password' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'your confirm password not match' });
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: 'Email already exist' });
  }

  let imageUrL = null;
  if (req.file) {
    const data = await cloudUpload(req.file.path, 'Chat-App-MERN');
    imageUrL = data.secure_url;
  }

  // hash password
  const hashPass = await bcrypt.hash(password, 10);
  //   <!-- Create User -->
  const createUser = await User.create({
    userName,
    email,
    password: hashPass,
    image: imageUrL
  });

  //   <!-- create Token -->
  const token = jwt.sign({ id: createUser._id, email: createUser.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN });

  res
    .status(201)
    // .cookie('accessToken', token, {
    //   httpOnly: false,
    //   secure: process.env.APP_ENV === 'Development' ? false : true,
    //   sameSite: 'strict',
    //   path: '/',
    //   maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    // })
    .json({ user: createUser, message: 'User Create Done', token });
});

/**
 * @DESC Login a User
 * @ROUTE /api/v1/auth/login
 * @method POST
 * @access public
 */
export const login = asyncHandler(async (req, res) => {
  if (!req.body.email || !req.body?.password) {
    return res.status(400).json({ message: 'Please provide your email & password' });
  }

  if (!validator.isEmail(req.body.email)) {
    return res.status(400).json({ message: 'Please provide a valid email' });
  }

  const user = await User.findOne({ email: req.body?.email });

  if (!user) {
    return res.status(400).json({ message: 'Please create a account' });
  }

  // check password
  const passCheck = await bcrypt.compare(req.body?.password, user?.password);

  if (!passCheck) {
    return res.status(400).json({ message: 'Wrong password. Try again!' });
  }

  //   <!-- create Token -->
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN });

  res
    .status(200)
    // .cookie('accessToken', token, {
    //   httpOnly: false,
    //   secure: process.env.APP_ENV === 'Development' ? false : true,
    //   sameSite: 'strict',
    //   path: '/',
    //   maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    // })
    .json({ user, message: 'Login Success', token });
});

/**
 * @DESC logout a User
 * @ROUTE /api/v1/auth/logout
 * @method POST
 * @access public
 */
export const logout = asyncHandler(async (req, res) => {
  res.status(200).clearCookie('accessToken').json({ message: 'Logout success.' });
});

/**
 * @DESC me a User
 * @ROUTE /api/v1/auth/me
 * @method POST
 * @access public
 */
export const me = asyncHandler(async (req, res) => {
  res.status(200).json({ user: req.me, message: 'Logged In user' });
});
