import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { authClient } from "@/lib/auth-client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useLocation, useSearchParams } from "react-router";
import ROUTES from "@/routes";

type VerificationFormInputs = {
	email: string;
};

type VerificationStatus = "" | "sending" | "sent" | "error" | "verified";

export function VerificationForm() {
	const [searchParams] = useSearchParams();
	const location = useLocation();
	const { email, sent } = location.state || {};
	const [status, setStatus] = useState<VerificationStatus>(sent ? "sent" : "");

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<VerificationFormInputs>();

	const onSubmit: SubmitHandler<VerificationFormInputs> = async (data) => {
		await authClient.sendVerificationEmail(data, {
			onRequest: () => {
				setStatus("sending");
			},
			onSuccess: () => {
				setStatus("sent");
			},
			onError: (ctx) => {
				setError("root.serverError", ctx.error);
				setStatus("");
			},
		});
	};

	useEffect(() => {
		const verifyEmail = async () => {
			authClient.verifyEmail(
				{
					query: {
						token: searchParams.get("token") || "",
					},
				},
				{
					onRequest: () => {
						setStatus("sending");
					},
					onSuccess: () => {
						setStatus("verified");
					},
					onError: (ctx) => {
						setError("root.serverError", ctx.error);
						setStatus("error");
					},
				},
			);
		};

		if (searchParams.get("token")) {
			verifyEmail();
		}
	}, []);

	return (
		<Card className="mx-auto w-full max-w-md">
			<CardHeader>
				<CardTitle className="text-2xl">Email Verification</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-4">
				{errors.root?.serverError && (
					<Alert variant="destructive">
						<AlertDescription>
							{errors.root.serverError.message}
						</AlertDescription>
					</Alert>
				)}
				{status !== "sending" && status !== "" && (
					<Alert variant={status === "error" ? "destructive" : "success"}>
						<AlertDescription>
							{status === "verified" &&
								"Your Email Has Been Verified. You Can Now Login To Your Account."}
							{status === "sent" &&
								"We Have Sent You An Email With A Verification Link. Please Check Your Email And Click On The Link To Verify Your Account. Click the resend button if you did not receive the email."}
							{status === "error" &&
								"An Error Occurred While Verifying Your Email. Please Try Again."}
						</AlertDescription>
					</Alert>
				)}
				{status === "verified" && (
					<Button type="button" className="w-full flex items-center" asChild>
						<Link to={ROUTES.login}>Go to Login Page</Link>
					</Button>
				)}
				{status === "" && (
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									defaultValue={email}
									{...register("email", {
										required: true,
									})}
								/>
							</div>
							<Button type="submit" className="w-full flex items-center">
								Resend Email
							</Button>
						</div>
					</form>
				)}
			</CardContent>
		</Card>
	);
}
