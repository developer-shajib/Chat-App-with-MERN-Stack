import { createSlice } from '@reduxjs/toolkit';
import { getAllUser, getSingleMessage, messageStatusChange, sendMessage } from './userApiSlice.jsx';

// <!-- Initial State -->
const initialState = {
  users: [],
  isLoading: false,
  successMessage: '',
  error: '',
  messageData: [],
  lastMessage: [],
  socketMessageStatus: false,
  socketGetLastMsgToDb: {},
  messageStatusChangeData: {},
  newUserAdded: ''
};

// <!-- create auth slice -->
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setMessageEmpty: (state) => {
      state.successMessage = '';
      state.error = '';
    },
    sendSocketMessage: (state, action) => {
      state.messageData = [...state.messageData, action.payload];
      state.lastMessage[
        state.lastMessage.findIndex((item) => (item?.senderId == action.payload?.senderId && item?.reseverId == action.payload?.reseverId) || (item?.senderId == action.payload?.reseverId && item?.reseverId == action.payload?.senderId))
      ] = action.payload;
      // state.lastMessage;
    },
    socketMessageStatusChange: (state, action) => {
      state.socketMessageStatus = action.payload;
    },
    socketGetLastMsgToDbClear: (state) => {
      state.socketGetLastMsgToDb = {};
    },
    setLogoutEmpty: (state) => {
      state.users = [];
      state.isLoading = false;
      state.successMessage = '';
      state.error = '';
      state.messageData = [];
      state.lastMessage = [];
      state.socketMessageStatus = false;
      state.socketGetLastMsgToDb = {};
      state.messageStatusChangeData = {};
    },
    setNewUserAdded: (state, action) => {
      state.newUserAdded = action.payload;
    },
    clearNewUserAdded: (state) => {
      state.newUserAdded = '';
    }
  },
  extraReducers: (build) => {
    // <!-- Register Api -->
    build

      // <!-- User Register -->
      .addCase(getAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.successMessage = action.payload.message;
        state.lastMessage = action.payload.frdLastMsg;
        state.isLoading = false;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })

      // <!-- Send Message -->
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messageData = [...state.messageData, action.payload.data];
        state.socketMessageStatus = true;
        state.socketGetLastMsgToDb = action.payload.data;
        state.lastMessage[
          state.lastMessage.findIndex(
            (item) => (item?.senderId == action.payload.data?.senderId && item?.reseverId == action.payload.data?.reseverId) || (item?.senderId == action.payload.data?.reseverId && item?.reseverId == action.payload.data?.senderId)
          )
        ] = action.payload.data;
        state.isLoading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })

      // <!-- Get Single User Message -->
      .addCase(getSingleMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleMessage.fulfilled, (state, action) => {
        state.messageData = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getSingleMessage.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })

      // <!-- Message Status change -->
      .addCase(messageStatusChange.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(messageStatusChange.fulfilled, (state, action) => {
        state.messageData[state.messageData.findIndex((item) => item?._id == action.payload.data?._id)] = action.payload.data;
        state.lastMessage[state?.lastMessage?.findIndex((item) => item?._id == action.payload.data?._id)] = action.payload.data;
        state.messageStatusChangeData = action.payload.data;
        state.isLoading = false;
      })
      .addCase(messageStatusChange.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  }
});

// <!-- export selectors -->
export const getAllUsers = (state) => state.user;

// <!-- export actions -->
export const { setMessageEmpty, sendSocketMessage, socketMessageStatusChange, setLogoutEmpty, setNewUserAdded, clearNewUserAdded } = usersSlice.actions;

// <!-- export reducer -->
export default usersSlice.reducer;
