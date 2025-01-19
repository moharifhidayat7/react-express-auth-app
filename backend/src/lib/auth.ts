import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../../drizzle/db.ts";
import * as schema from "../../drizzle/schema.ts";
import { sendMail } from "../services/mailer.ts";

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
		sendVerificationEmail: async ({ user, token }, request) => {
			sendMail({
				to: user.email,
				subject: "Verify your email address",
				text: `Click the link to verify your email: ${process.env.APP_URL}verification?token=${token}`,
			});
		},
	},
	socialProviders: {
		google: {
			redirectUri: process.env.GOOGLE_REDIRECT_URI as string,
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
		facebook: {
			redirectURI: process.env.FACEBOOK_REDIRECT_URI as string,
			clientId: process.env.FACEBOOK_CLIENT_ID as string,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
		},
	},
});
