import express from 'express';
import { getAllUser } from '../controllers/userController.js';
import tokenVerify from '../middleware/tokenVerify.js';

const router = express.Router();

router.use(tokenVerify);

// create route
router.route('/').get(getAllUser);

// export default router
export default router;
