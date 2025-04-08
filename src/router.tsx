import { createBrowserRouter, RouteObject } from 'react-router-dom'
import App from './App'

import MainPage from './pages/MainPage'
import MainLayout from './component/mainLayout'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <MainPage />,
          },
          {
            path: 'wallet',
            element: <MainPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <div>404 Not Found</div>,
  },
]

export const router = createBrowserRouter(routes)
