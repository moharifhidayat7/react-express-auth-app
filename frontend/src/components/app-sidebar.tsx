import { useEffect } from "react";
import { LayoutDashboard, Users } from "lucide-react";
import ROUTES from "@/routes";
import { NavLink, useLocation, useSearchParams } from "react-router";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarFooter,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import { authClient } from "@/lib/auth-client";

const items = [
	{
		title: "Dashboard",
		url: ROUTES.dashboard,
		icon: LayoutDashboard,
	},
	{
		title: "Users",
		url: ROUTES.users,
		icon: Users,
	},
];

export function AppSidebar() {
	const searchParams = useSearchParams();
	const location = useLocation();
	const { data: session } = authClient.useSession();

	useEffect(() => {
		console.log(location);
		console.log(searchParams);
		console.log(session);
	}, [location]);

	return (
		<Sidebar collapsible="icon">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										isActive={location.pathname === item.url}
									>
										<NavLink to={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</NavLink>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
