import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.jsx';
import userReducer from '../features/user/userSlice.jsx';

// Create store
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
  },
  devTools: import.meta.env.VITE_APP_ENVIRONMENT == 'Development' ? true : false
});

//export
export default store;
