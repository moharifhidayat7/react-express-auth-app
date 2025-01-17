"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

type ProfileFormValues = {
	name: string;
	email: string;
};

export function ProfileForm() {
	const { toast } = useToast();
	const { data: session } = authClient.useSession();
	const { register, setValue, handleSubmit } = useForm<ProfileFormValues>();
	async function onSubmit(data: ProfileFormValues) {
		await authClient.updateUser(
			{
				image: "https://example.com/image.jpg",
				name: data.name,
			},
			{
				onSuccess: () => {
					toast({
						variant: "success",
						title: "Update Profile Success",
						description: "User profile has been updated.",
					});
				},
				onError: (ctx) => {
					toast({
						variant: "destructive",
						title: "Update Profile Failed",
						description: ctx.error.message,
					});
				},
			},
		);
	}

	useEffect(() => {
		const getUserProfile = async () => {
			await fetch(`${import.meta.env.VITE_API_URL}/users/${session?.user.id}`, {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			}).then(async (res) => {
				const user = await res.json();
				setValue("name", user.name);
				setValue("email", user.email);
			});
		};

		getUserProfile();
	}, []);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
					disabled
					{...register("email", {
						required: true,
					})}
				/>
			</div>
			<Button type="submit">Update profile</Button>
		</form>
	);
}
