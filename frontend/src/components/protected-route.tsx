import { useEffect } from "react";
import { Navigate, Outlet, useSearchParams } from "react-router";
import ROUTES from "@/routes";
import { useAuth } from "@/context/AuthContext";
import { authClient } from "@/lib/auth-client";

const ProtectedRoute = () => {
	const { getAuthToken, setAuthToken } = useAuth();
	const { data } = authClient.useSession();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const authenticated = searchParams.get("authenticated");
		if (authenticated === "true" && data?.session.token) {
			setAuthToken(data?.session.token);
			searchParams.delete("authenticated");
			const url = new URL(window.location.href);
			url.search = "";
			window.history.replaceState({}, document.title, url.toString());
		}
	}, [data]);

	const isLoggedIn = getAuthToken() && getAuthToken() !== "undefined";

	return isLoggedIn ? <Outlet /> : <Navigate to={ROUTES.login} />;
};

export default ProtectedRoute;
