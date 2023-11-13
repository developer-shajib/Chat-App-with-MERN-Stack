import { Navigate, Outlet } from 'react-router-dom';

const PrivateGard = () => {
  if (localStorage.getItem('user')) {
    return <Outlet />;
  } else {
    return <Navigate to={'/login'} />;
  }
};

export default PrivateGard;
