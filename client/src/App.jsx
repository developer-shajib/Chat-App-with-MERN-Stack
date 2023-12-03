import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routers/router.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { me } from './features/auth/authApiSlice.jsx';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      dispatch(me());
    }
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
