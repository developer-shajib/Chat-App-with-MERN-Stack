import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Message from '../models/MessageModal.js';

const getLastMsg = async (myId, frdId) => {
  const msg = await Message.findOne({ $or: [{ $and: [{ senderId: { $eq: myId } }, { reseverId: { $eq: frdId } }] }, { $and: [{ senderId: { $eq: frdId } }, { reseverId: { $eq: myId } }] }] }).sort({ updatedAt: -1 });

  return msg;
};

/**
 * @DESC Get all user
 * @ROUTE /api/v1/user
 * @method GET
 * @access private
 */
export const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.me._id } });
  let frdLastMsg = [];

  for (let i = 0; i < users.length; i++) {
    let lsMsg = await getLastMsg(req.me._id, users[i]._id);
    frdLastMsg = [...frdLastMsg, lsMsg];
  }

  res.status(200).json({ users, frdLastMsg, message: 'Fetch all user data success' });
});
