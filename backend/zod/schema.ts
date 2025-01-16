import { z } from "zod";

export const registerSchema = z
	.object({
		name: z.string(),
		email: z
			.string()
			.email()
			.refine(
				(val) => {
					return (
						/[a-z]/.test(val) &&
						/[A-Z]/.test(val) &&
						/\d/.test(val) &&
						/[@$!%*?&]/.test(val) &&
						val.length >= 8
					);
				},
				{
					message:
						"Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.",
				},
			),
		password: z.string(),
		confirm: z.string(),
	})
	.refine((data) => data.password === data.confirm, {
		message: "Passwords do not match",
		path: ["confirm"],
	});
