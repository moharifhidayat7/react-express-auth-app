import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
	const [data, setData] = useState({
		registeredUsers: 0,
		activeSessions: 0,
		averageActiveUser: 0,
	});
	const { auth } = useAuth();

	useEffect(() => {
		const getStats = async () => {
			const res = await fetch(import.meta.env.VITE_API_URL + "/stats", {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await res.json();
			setData(data);
		};

		getStats();
	}, []);

	return (
		<>
			<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbPage>Dashboard</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>

			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
				<div className="flex items-center justify-between space-y-2 py-4">
					<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
				</div>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Register Users
							</CardTitle>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="h-4 w-4 text-muted-foreground"
							>
								<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
								<circle cx="9" cy="7" r="4" />
								<path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
							</svg>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{data.registeredUsers}</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Active Sessions
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{data.activeSessions}</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Agerage Active Users
							</CardTitle>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="h-4 w-4 text-muted-foreground"
							>
								<path d="M22 12h-4l-3 9L9 3l-3 9H2" />
							</svg>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{data.averageActiveUser}</div>
							<p className="text-xs text-muted-foreground">Last 7 days</p>
						</CardContent>
					</Card>
				</div>
				<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
			</div>
		</>
	);
}
