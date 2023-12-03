import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routers/router.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { me } from './features/auth/authApiSlice.jsx';
import Cookies from 'js-cookie';

function App() {
  const dispatch = useDispatch();
  const token = Cookies.get('accessToken');

  useEffect(() => {
    if (localStorage.getItem('user')) {
      dispatch(me());
    }

    if (token) {
      Cookies.set('accessToken', token);
    }
  }, [dispatch, token]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
