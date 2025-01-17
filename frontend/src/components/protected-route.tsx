import { Navigate, Outlet } from "react-router";
import ROUTES from "@/routes";
import { authClient } from "@/lib/auth-client";

const ProtectedRoute = () => {
	const { data: session } = authClient.useSession();
	const hasToken = localStorage.getItem("token");
	return session || hasToken ? <Outlet /> : <Navigate to={ROUTES.login} />;
};

export default ProtectedRoute;
