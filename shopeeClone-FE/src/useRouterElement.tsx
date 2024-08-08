/* eslint-disable react-refresh/only-export-components */
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
// import ProductList from './Pages/ProductList'
import Register from './Pages/Register'
import Login from './Pages/Login'
import RegisterLayout from './Layouts/RegisterLayout'
import Profile from './Pages/Profile'
import MainLayout from './Layouts/MainLayout'

const isAuthenticate = false
function ProtectedRoute() {
  return isAuthenticate ? <Outlet /> : <Navigate to='/login' />
}

function RejectRoute() {
  return isAuthenticate ? <Navigate to='/' /> : <Outlet />
}

export default function useRouterElement() {
  const routeElement = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      index: true
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/profile',
          element: <Profile />
        }
      ]
    },
    {
      path: '',
      element: <RejectRoute />,
      children: [
        {
          path: '/register',
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        },
        {
          path: '/login',
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        }
      ]
    }
  ])
  return routeElement
}
