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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";

import { useForm, SubmitHandler } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import ROUTES from "@/routes";

type SignUpFormInputs = {
	name: string;
	email: string;
	password: string;
	confirm: string;
};

export function SignUpForm() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<SignUpFormInputs>();

	const onSubmit: SubmitHandler<SignUpFormInputs> = async (formBody) => {
		await authClient.signUp.email(formBody, {
			onRequest: () => {
				setLoading(true);
			},
			onSuccess: () => {
				navigate(ROUTES.verification, {
					state: { email: formBody.email, sent: true },
				});
			},
			onError: (ctx) => {
				setError("root.serverError", ctx.error);
				setLoading(false);
			},
		});
	};

	return (
		<Card className="mx-auto w-full max-w-md">
			<CardHeader>
				<CardTitle className="text-2xl">Sign Up</CardTitle>
				<CardDescription>
					Fill sign up form below to create an account
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
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								type="text"
								placeholder="Type your name"
								{...register("name", {
									required: true,
								})}
							/>
						</div>
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
							</div>
							<Input
								id="password"
								type="password"
								{...register("password", {
									required: true,
									validate: (val) => {
										const hasLowercase = /[a-z]/.test(val);
										const hasUppercase = /[A-Z]/.test(val);
										const hasDigit = /\d/.test(val);
										const hasSpecialChar = /[@$!%*?&]/.test(val);
										const hasMinLength = val.length >= 8;
										return (
											hasLowercase &&
											hasUppercase &&
											hasDigit &&
											hasSpecialChar &&
											hasMinLength
										);
									},
								})}
							/>
							{errors.password && (
								<Alert variant="destructive">
									<AlertDescription>
										Password must contain at least one lowercase letter, one
										uppercase letter, one digit, one special character, and be
										at least 8 characters long.
									</AlertDescription>
								</Alert>
							)}
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password_confirmation">Reenter Password</Label>
							</div>
							<Input
								id="confirm"
								type="password"
								{...register("confirm", {
									required: true,
									validate: (val, formValues) => val === formValues.password,
								})}
							/>
							{errors.confirm && (
								<Alert variant="destructive">
									<AlertDescription>Password does not match.</AlertDescription>
								</Alert>
							)}
						</div>
						<Button
							type="submit"
							className="w-full flex items-center"
							disabled={loading}
						>
							{loading ? (
								<Spinner size="small" className="text-primary-foreground" />
							) : (
								"Submit"
							)}
						</Button>
					</div>
				</form>
				<div className="mt-4 text-center text-sm">
					Already have an account?{" "}
					<Link to={ROUTES.login} className="underline">
						Sign In
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
