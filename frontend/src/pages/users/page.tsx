import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
	Breadcrumb,
	BreadcrumbLink,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import UsersTable from "@/components/users-table/component";
import ROUTES from "@/routes";

export default function UsersPage() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const getUsers = async () => {
			await fetch(import.meta.env.VITE_API_URL + "/users", {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			}).then(async (res) => {
				const users = await res.json();
				setData(users);
			});
		};
		getUsers();
	}, []);

	return (
		<>
			<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink asChild>
									<Link to={ROUTES.dashboard}>Dashboard</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbItem>
								<BreadcrumbPage>Users</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>

			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
				<div className="flex items-center justify-between space-y-2 py-4">
					<h2 className="text-3xl font-bold tracking-tight">Users</h2>
				</div>
				<div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
					<UsersTable data={data} />
				</div>
			</div>
		</>
	);
}
