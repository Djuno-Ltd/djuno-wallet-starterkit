import { RouteObject, createBrowserRouter } from 'react-router-dom'
// import ErrorPage from './pages/layouts/ErrorPage';

const routes: Array<RouteObject> = [
  {
    path: '/',
    // errorElement: <ErrorPage />,
  },
  {
    path: '*',
    // element: <ErrorPage />,
  },
]
export const router = createBrowserRouter(routes)
