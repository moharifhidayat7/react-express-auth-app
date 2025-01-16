import DashboardLayout from "@/components/layouts/dashboard";
import AuthLayout from "@/components/layouts/auth";
import { LoginForm } from "@/components/login-form";
import DashboardPage from "@/pages/dashboard/page";
import LandingPage from "@/pages/landing/page";
import UsersPage from "@/pages/users/page";
import ProfilePage from "@/pages/profile/page";
import ProtectedRoute from "@/components/protected-route";
import { BrowserRouter, Routes, Route } from "react-router";
import ROUTES from "@/routes";
import { AuthProvider } from "@/context/AuthContext";
import { SignUpForm } from "@/components/signup-form";
import { VerificationForm } from "@/components/email-verification-form";
import { ResetPasswordForm } from "@/components/reset-password-form";
import { ForgotPasswordForm } from "@/components/forgot-password-form";

export default function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route index element={<LandingPage />} />
					<Route element={<AuthLayout />}>
						<Route path={ROUTES.login} element={<LoginForm />} />
						<Route path={ROUTES.signup} element={<SignUpForm />} />
						<Route path={ROUTES.verification} element={<VerificationForm />} />
						<Route
							path={ROUTES.resetPassword}
							element={<ResetPasswordForm />}
						/>
						<Route
							path={ROUTES.forgotPassword}
							element={<ForgotPasswordForm />}
						/>
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route path={ROUTES.dashboard} element={<DashboardLayout />}>
							<Route index element={<DashboardPage />} />
							<Route path={ROUTES.users} element={<UsersPage />} />
							<Route path={ROUTES.profile} element={<ProfilePage />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}
