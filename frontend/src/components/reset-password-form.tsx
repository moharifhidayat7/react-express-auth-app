import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";

import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import ROUTES from "@/routes";

type ResetPasswordFormInputs = {
	password: string;
	new_password: string;
	new_password_confirmation: string;
};

export function ResetPasswordForm() {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ResetPasswordFormInputs>();

	const onSubmit: SubmitHandler<ResetPasswordFormInputs> = async (data) => {
		setLoading(true);
		await fetch("https://67877bebc4a42c916106ed9c.mockapi.io/api/users", {
			method: "POST",
			body: JSON.stringify(data),
		})
			.then(async (res) => {
				const json = await res.json();
				const mock = {
					...json,
					token:
						"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9oYW1hZCBBcmlmIEhpZGF5YXQiLCJlbWFpbCI6Im1vaGFyaWZoaWRheWF0N0BnbWFpbC5jb20ifQ._EBE-OW-xAURJCAmlaewjpotD6V4kF15pDtcoR8cl5k",
				};
			})
			.finally(() => setLoading(false));
	};

	return (
		<Card className="mx-auto w-full max-w-md">
			<CardHeader>
				<CardTitle className="text-2xl">Reset Password</CardTitle>
			</CardHeader>
			<CardContent>
				{success ? (
					<Alert variant="success">
						<AlertDescription>
							Your Password Has Been Reset. You Can Now Login To Your Account.
						</AlertDescription>
					</Alert>
				) : (
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="grid gap-4">
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
								</div>
								<Input
									id="password"
									type="password"
									{...register("password", {
										required: true,
									})}
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="new_password">New Password</Label>
								</div>
								<Input
									id="new_password"
									type="password"
									{...register("new_password", {
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
								{errors.new_password && (
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
									<Label htmlFor="password_confirmation">
										Reenter New Password
									</Label>
								</div>
								<Input
									id="new_password_confirmation"
									type="password"
									{...register("new_password_confirmation", {
										required: true,
										validate: (val, formValues) =>
											val === formValues.new_password,
									})}
								/>
								{errors.new_password_confirmation && (
									<Alert variant="destructive">
										<AlertDescription>
											Password does not match.
										</AlertDescription>
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
									"Reset my Password"
								)}
							</Button>
						</div>
					</form>
				)}
				<div className="mt-4 text-center text-sm">
					Back to{" "}
					<Link to={ROUTES.login} className="underline">
						Sign In
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
