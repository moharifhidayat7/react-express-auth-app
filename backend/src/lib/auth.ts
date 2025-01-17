import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../../drizzle/db.ts";
import * as schema from "../../drizzle/schema.ts";
import { sendMail } from "./mailer.ts";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
	},
	emailVerification: {
		sendOnSignUp: true,
		sendVerificationEmail: async ({ user, url, token }, request) => {
			sendMail({
				to: user.email,
				subject: "Verify your email address",
				text: `Click the link to verify your email: ${url}`,
			});
		},
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
		facebook: {
			clientId: process.env.FACEBOOK_CLIENT_ID as string,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
		},
	},
});
