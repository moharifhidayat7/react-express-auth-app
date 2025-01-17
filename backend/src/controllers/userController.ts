import { Request, Response } from "express";
import { db } from "../../drizzle/db.ts";
import * as schema from "../../drizzle/schema.ts";
import { eq, gt, lte } from "drizzle-orm";

export const getUsers = async (req: Request, res: Response) => {
	try {
		const result = await db
			.select()
			.from(schema.user)
			.leftJoin(schema.session, lte(schema.user.id, schema.session.userId));
		const groupedData: any = [];

		result.forEach((curr) => {
			let userGroup = groupedData.find(
				(group: any) => group.id === curr.user.id,
			);

			if (!userGroup) {
				userGroup = {
					...curr.user,
					sessions: [],
				};
				groupedData.push(userGroup);
			}

			if (curr.session) {
				userGroup.sessions.push(curr.session);
			}
		});
		const jsonRes = groupedData.map((user: any) => {
			const formattedDate = user.createdAt
				.toISOString()
				.replace("T", " ")
				.split(".")[0];
			return {
				id: user.id,
				name: user.name,
				email: user.email,
				registration_date: formattedDate,
				successful_logins: user.sessions.length,
			};
		});
		res.json(jsonRes);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "some error" });
	}
};

export const getStats = async (req: Request, res: Response) => {
	try {
		const users = await db.select().from(schema.user);
		const sessions = await db
			.select()
			.from(schema.session)
			.where(gt(schema.session.expiresAt, new Date()));

		const data = {
			registeredUsers: users.length,
			activeSessions: sessions.length,
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
		res.json(user[0]);
	} catch (error) {
		res.status(500).json({ message: "some error" });
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const { name } = req.body;
		const user = await db
			.update(schema.user)
			.set({ name })
			.where(eq(schema.user.id, req.body.id))
			.returning();
		res.set("Content-Type", "application/json").status(200);
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: "some error" });
	}
};
