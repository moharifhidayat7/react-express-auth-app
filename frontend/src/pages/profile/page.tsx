import { useAuth } from "@/context/AuthContext";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ProfileForm } from "@/components/profile-form";

export default function ProfilePage() {
	const { auth } = useAuth();

	return (
		<>
			<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbPage>Settings</BreadcrumbPage>
							</BreadcrumbItem>
							<BreadcrumbItem>
								<BreadcrumbPage>Profile</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>

			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
				<div className="flex items-center justify-between space-y-2 py-4">
					<h2 className="text-3xl font-bold tracking-tight">Profile</h2>
				</div>
				<div className="grid grid-cols-2 rounded-xl d:min-h-min">
					<ProfileForm />
				</div>
			</div>
		</>
	);
}
