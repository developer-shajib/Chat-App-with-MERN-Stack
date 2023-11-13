import { Login, Register } from '../pages/';
import PublicGard from './PublicGard.jsx';

const PublicRouter = [
  {
    element: <PublicGard />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  }
];

export default PublicRouter;
