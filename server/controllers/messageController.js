import asyncHandler from 'express-async-handler';
import Message from '../models/MessageModal.js';
import { cloudUpload } from '../utils/cloudinary.js';

/**
 * @DESC Send Message
 * @ROUTE /api/v1/message/send-message
 * @method POST
 * @access private
 */
export const sendMessage = asyncHandler(async (req, res) => {
  const { senderName, reseverId, text } = req.body;
  const senderId = req?.me?._id;

  if (!senderName || !reseverId || !senderId) {
    return res.status(400).json({ message: 'User Information is required' });
  }

  let imageUrL = null;
  if (req.file) {
    const data = await cloudUpload(req.file.path, 'Chat-App-MERN');
    imageUrL = data.secure_url;
  }

  if (req.file) {
    const createMessage = await Message.create({
      senderId,
      senderName,
      reseverId,
      image: imageUrL
    });

    return res.status(201).json({ data: createMessage, message: 'Message sent success' });
  } else {
    const createMessage = await Message.create({
      senderId,
      senderName,
      reseverId,
      text
    });
    return res.status(201).json({ data: createMessage, message: 'Message sent success' });
  }
});

/**
 * @DESC Get Message
 * @ROUTE /api/v1/message/get-message
 * @method GET
 * @access private
 */
export const getMessage = asyncHandler(async (req, res) => {
  const frdId = req.params.id;
  const myId = req.me._id;
  let getAllMessage = await Message.find();

  getAllMessage = getAllMessage?.filter((item) => (item.senderId == myId && item.reseverId == frdId) || (item.reseverId == myId && item.senderId == frdId));

  res.status(200).json({ data: getAllMessage, message: 'Fetch message with this user success' });
});

/**
 * @DESC Message Status change
 * @ROUTE /api/v1/message/seen-message
 * @method POST
 * @access private
 */
export const messageSeen = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;

  const msg = await Message.findById(id);

  if (!msg) return res.status(400).json({ message: 'Message not found!' });

  msg.status = status;

  msg.save();
  res.status(200).json({ data: msg, message: 'Status change successful!' });
});
