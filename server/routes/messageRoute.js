import express from 'express';
import tokenVerify from '../middleware/tokenVerify.js';
import { getMessage, messageSeen, sendMessage } from '../controllers/messageController.js';
import { chatImgMulter } from '../middleware/multer.js';

const router = express.Router();

router.use(tokenVerify);

// create route
router.route('/send-message').post(chatImgMulter, sendMessage);
router.route('/get-message/:id').get(getMessage);
router.route('/seen-message/:id').post(messageSeen);

// export default router
export default router;
