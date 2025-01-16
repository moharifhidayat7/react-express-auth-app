"use client";

import { ColumnDef } from "@tanstack/react-table";

export type User = {
	id: number;
	name: string;
	email: string;
	registration_date: string;
	successful_logins: number;
	last_logout: string;
};

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "registration_date",
		header: "Registration Date",
	},
	{
		accessorKey: "successful_logins",
		header: "Successful Logins",
	},
	{
		accessorKey: "last_logout",
		header: "Last Logout",
	},
];
