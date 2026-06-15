import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Home from '../pages/home/Home';
import Secondhand from '../pages/secondhand/Secondhand';
import Groupbuy from '../pages/groupbuy/Groupbuy';
import Forum from '../pages/forum/Forum';
import Profile from '../pages/profile/Profile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'secondhand',
        element: <Secondhand />,
      },
      {
        path: 'groupbuy',
        element: <Groupbuy />,
      },
      {
        path: 'forum',
        element: <Forum />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);