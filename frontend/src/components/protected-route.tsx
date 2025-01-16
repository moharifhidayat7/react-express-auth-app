import { Navigate, Outlet } from 'react-router'
import ROUTES from "@/routes"
import { useAuth } from "@/context/AuthContext"

const ProtectedRoute = () => {
  const { auth } = useAuth()

  return (
    auth ?
      <Outlet /> : <Navigate to={ROUTES.login} />
  )
}

export default ProtectedRoute;
