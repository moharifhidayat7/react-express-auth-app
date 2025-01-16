import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

import { useForm, SubmitHandler } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/context/AuthContext";
import ROUTES from "@/routes";
import { useEffect } from "react";

type LoginFormInputs = {
	email: string;
	password: string;
};

export function LoginForm() {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		setError,
	} = useForm<LoginFormInputs>();
	const { auth, setAuthFromToken } = useAuth();

	const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
		await authClient.signIn.email(data, {
			onRequest: () => {
				setLoading(true);
			},
			onSuccess: (ctx) => {
				setAuthFromToken(ctx.data);
				navigate(ROUTES.dashboard);
			},
			onError: (ctx) => {
				setError("root.serverError", ctx.error);
				setLoading(false);
			},
		});
	};

	useEffect(() => {
		setValue("email", "test@example.com");
		setValue("password", "password");
	}, []);

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Sign In</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid gap-4">
						{errors.root?.serverError && (
							<Alert variant="destructive">
								<AlertDescription>
									{errors.root?.serverError.message}
								</AlertDescription>
							</Alert>
						)}
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								{...register("email", {
									required: true,
								})}
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								<Link
									to={ROUTES.forgotPassword}
									className="ml-auto inline-block text-sm underline"
								>
									Forgot your password?
								</Link>
							</div>
							<Input
								id="password"
								type="password"
								{...register("password", { required: true })}
							/>
						</div>
						<Button type="submit" className="w-full" disabled={loading}>
							{loading ? (
								<Spinner size="small" className="text-primary-foreground" />
							) : (
								"Submit"
							)}
						</Button>
						<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
							<span className="relative z-10 bg-background px-2 text-muted-foreground">
								Or continue with
							</span>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<Button variant="outline" className="w-full">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
									<path
										d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
										fill="currentColor"
									/>
								</svg>
								<span className="sr-only">Sign In with Google</span>
							</Button>
							<Button variant="outline" className="w-full">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
								</svg>
								<span className="sr-only">Sign In with Facebook</span>
							</Button>
						</div>
					</div>
				</form>
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link to={ROUTES.signup} className="underline">
						Sign up
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
