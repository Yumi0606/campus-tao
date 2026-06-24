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
import { Login } from '@/pages/auth/Login'
import { RequireAuth } from '@/components/base/RequireAuth'

import type { RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/secondhand',
    element: <RequireAuth><Secondhand /></RequireAuth>,
  },
  {
    path: '/secondhand/:id',
    element: <RequireAuth><SecondhandDetail /></RequireAuth>,
  },
  {
    path: '/groupbuy',
    element: <RequireAuth><Groupbuy /></RequireAuth>,
  },
  {
    path: '/groupbuy/:id',
    element: <RequireAuth><GroupbuyDetail /></RequireAuth>,
  },
  {
    path: '/forum',
    element: <RequireAuth><Forum /></RequireAuth>,
  },
  {
    path: '/forum/:id',
    element: <RequireAuth><ForumDetail /></RequireAuth>,
  },
  {
    path: '/profile',
    element: <RequireAuth><Profile /></RequireAuth>,
  },
  {
    path: '/profile/edit',
    element: <RequireAuth><EditProfile /></RequireAuth>,
  },
  {
    path: '/chat',
    element: <RequireAuth><Chat /></RequireAuth>,
  },
  {
    path: '/chat/:contactId',
    element: <RequireAuth><Chat /></RequireAuth>,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]
