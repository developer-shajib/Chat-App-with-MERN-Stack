import Message from '../pages/Message/Message.jsx';
import PrivateGard from './PrivateGard.jsx';

const PrivateRouter = [
  {
    element: <PrivateGard />,
    children: [
      {
        path: '/',
        element: <Message />
      }
    ]
  }
];

export default PrivateRouter;
