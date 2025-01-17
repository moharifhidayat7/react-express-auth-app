import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import ROUTES from "@/routes";

type ForgotPasswordFormInputs = {
	email: string;
};

export function ForgotPasswordForm() {
	const [sent, setSent] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotPasswordFormInputs>();

	const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = async (data) => {
		console.log(data);
		console.log(setSent(true));
	};

	return (
		<Card className="mx-auto w-full max-w-md">
			<CardHeader>
				<CardTitle className="text-2xl">Forgot Password</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-4">
				{sent && (
					<Alert variant="success">
						<AlertDescription>
							We have sent you an email with a link to reset your password.
							Please check your email and click on the link to reset your
							password.
						</AlertDescription>
					</Alert>
				)}
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid gap-4">
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
							{errors.email && (
								<Alert variant="destructive">
									<AlertDescription>{errors.email.message}</AlertDescription>
								</Alert>
							)}
						</div>
						<Button type="submit" className="w-full flex items-center">
							Reset my Password
						</Button>
					</div>
				</form>
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
