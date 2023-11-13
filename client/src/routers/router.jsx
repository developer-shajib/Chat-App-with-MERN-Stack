import PrivateRouter from './PrivateRouter.jsx';
import PublicRouter from './PublicRouter.jsx';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([...PublicRouter, ...PrivateRouter]);

export default router;
