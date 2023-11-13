import { Navigate, Outlet } from 'react-router-dom';

const PublicGard = () => {
  if (localStorage.getItem('user')) {
    return <Navigate to={'/'} />;
  } else {
    return <Outlet />;
  }
};

export default PublicGard;
