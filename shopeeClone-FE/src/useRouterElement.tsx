import { useRoutes } from 'react-router-dom'
import ProductList from './Pages/ProductList'
import Register from './Pages/Register'
import Login from './Pages/Login'
import RegisterLayout from './Layouts/RegisterLayout'

export default function useRouterElement() {
  const routeElement = useRoutes([
    {
      path: '/',
      element: <ProductList />
    },
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
  ])
  return routeElement
}
