import { Request, Response } from "express";
import { db } from "../../drizzle/db.ts";
import * as schema from "../../drizzle/schema.ts";
import { eq } from "drizzle-orm";

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await db.select().from(schema.user);
		res.set("Content-Type", "application/json").status(200);
		const result: any = users.map((user) => {
			const formatted = user.createdAt
				.toISOString()
				.replace("T", " ")
				.replace("Z", "");
			return {
				id: user.id,
				name: user.name,
				email: user.email,
				registration_date: formatted,
				successful_logins: 50,
				last_login: new Date(),
			};
		});
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "some error" });
	}
};

export const getStats = async (req: Request, res: Response) => {
	try {
		const users = await db.select().from(schema.user);

		const data = {
			registeredUsers: users.length,
			activeSessions: 0,
			averageActiveUser: 0,
		};
		res.set("Content-Type", "application/json").status(200);
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: "some error" });
	}
};

export const getOneUser = async (req: Request, res: Response) => {
	try {
		const user = await db
			.select()
			.from(schema.user)
			.where(eq(schema.user.id, req.params.id));
		res.set("Content-Type", "application/json").status(200);
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: "some error" });
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const { displayName } = req.body;
		const user = await db
			.update(schema.user)
			.set({ displayName })
			.where(eq(schema.user.id, req.body.id))
			.returning();
		res.set("Content-Type", "application/json").status(200);
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: "some error" });
	}
};
