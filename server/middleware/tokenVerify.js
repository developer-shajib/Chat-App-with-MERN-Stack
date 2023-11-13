import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Verify Token
const tokenVerify = (req, res, next) => {
  // const authHeader = req.headers.authorization || req.headers.Authorization;

  const token = req.cookies.accessToken;

  if (!token) return res.status(400).json({ message: 'Unauthorized' });

  // const token = authHeader.split(' ')[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    asyncHandler(async (error, decode) => {
      if (error) {
        return res.status(400).json({ message: 'Invalid Token' });
      }

      const me = await User.findOne({ email: decode.email }).select('-password');

      req.me = me;

      next();
    })
  );
};

export default tokenVerify;
