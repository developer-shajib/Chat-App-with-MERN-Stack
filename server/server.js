import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { mongoBDConnect } from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js';
import userRouter from './routes/userRoute.js';
import messageRouter from './routes/messageRoute.js';
import { errorHandler } from './middleware/errorHandler.js';
import cors from 'cors';
import corsOptions from './config/cors.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
dotenv.config();

// Express initialize
const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 4000;

// set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser());

// Static folder
app.use(express.static('public'));

// Router Initialize
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/message', messageRouter);

// use error handler
app.use(errorHandler);

// <!-- Socket Io -->
const io = new Server(httpServer, {
  cors: corsOptions
});

// <!-- Add User -->
let users = [];

// <!-- Add or Login a user -->
const addUser = (userInfo, socketId) => {
  const checkUser = users?.some((item) => item.userId === userInfo?._id);

  if (!checkUser && userInfo._id) {
    users.push({ userId: userInfo._id, socketId, userInfo });
  }
};

// <!-- Logout User -->
const userLogout = (userId) => {
  const checkUser = users?.some((item) => item.userId === userId);

  if (checkUser) {
    users = users.filter((item) => item.userId != userId);
  }
};

io.on('connection', (socket) => {  
  console.log('Socket connected'.bgGreen);

  socket.on('addUser', (userInfo) => {
    addUser(userInfo, socket.id);
    io.sockets.emit('getUser', users);

    const us = users.filter((u) => u.userId != userInfo._id);
    const con = 'new_user_add';
    for (let i = 0; us.length > i; i++) {
      socket.to(us[i].socketId).emit('new_user_add', con); 
    }
  });

  // <!-- Send Message -->
  socket.on('sendMessage', (data) => {
    const findUser = users.find((item) => item.userId == data.reseverId);

    if (findUser) {
      socket.to(findUser.socketId).emit('getMessage', data);
    }
  });

  socket.on('typingMessage', (data) => {
    const findUser = users.find((item) => item.userId == data.reseverId);

    if (findUser) {
      socket.to(findUser.socketId).emit('typingMsgGet', data);
    }
  });

  socket.on('seenStatusChange', (data) => {
    const findUser = users?.find((item) => item?.userId == data.reseverId);
    if (findUser) {
      const updateData = (data.status = 'delivered');
      socket.to(findUser?.socketId).emit('seenStatusSee', data);
    }
  });

  socket.on('logout', (userId) => {
    userLogout(userId);
  });

  socket.on('disconnect', () => {
    console.log('Socekt disconnected'.bgRed);
    users = users?.filter((item) => item?.socketId != socket.id);
    io.sockets.emit('getUser', users);
  });
});

// <!-- server listener -->
httpServer.listen(PORT, () => {
  mongoBDConnect();
  console.log(`server is running on port ${PORT}`.bgGreen.black);
});
