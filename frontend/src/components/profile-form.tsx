"use client";

import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type ProfileFormValues = {
	display_name: string;
	email: string;
};

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
	display_name: "I own a computer.",
	email: "arif@example.com",
};

export function ProfileForm() {
	const form = useForm<ProfileFormValues>({
		defaultValues,
		mode: "onChange",
	});

	function onSubmit(data: ProfileFormValues) {
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="display_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Type your name" {...field} />
							</FormControl>
							<FormDescription>
								This is your public display name. It can be your real name or a
								pseudonym.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<Input
								type="email"
								placeholder="m@example.com"
								disabled
								{...field}
							/>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Update profile</Button>
			</form>
		</Form>
	);
}
