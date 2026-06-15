// 路由配置
import { Home } from '@/pages/home/Home'
import { Secondhand } from '@/pages/secondhand/Secondhand'
import { SecondhandDetail } from '@/pages/secondhand/detail/SecondhandDetail'
import { Groupbuy } from '@/pages/groupbuy/Groupbuy'
import { GroupbuyDetail } from '@/pages/groupbuy/detail/GroupbuyDetail'
import { Forum } from '@/pages/forum/Forum'
import { ForumDetail } from '@/pages/forum/detail/ForumDetail'
import { Profile } from '@/pages/profile/Profile'
import { EditProfile } from '@/pages/profile/edit/EditProfile'
import { Chat } from '@/pages/chat/Chat'
import { NotFound } from '@/pages/NotFound'

import type { RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/secondhand',
    element: <Secondhand />,
  },
  {
    path: '/secondhand/:id',
    element: <SecondhandDetail />,
  },
  {
    path: '/groupbuy',
    element: <Groupbuy />,
  },
  {
    path: '/groupbuy/:id',
    element: <GroupbuyDetail />,
  },
  {
    path: '/forum',
    element: <Forum />,
  },
  {
    path: '/forum/:id',
    element: <ForumDetail />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/profile/edit',
    element: <EditProfile />,
  },
  {
    path: '/chat',
    element: <Chat />,
  },
  {
    path: '/chat/:contactId',
    element: <Chat />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]