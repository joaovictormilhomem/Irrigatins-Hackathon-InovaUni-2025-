import { createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import App from './App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/login',
    element: <Login />
  }
])

export default router