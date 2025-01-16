import { useAuth } from "@/context/AuthContext";
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router";
import ROUTES from "@/routes";

export default function LandingPage() {
	const { auth } = useAuth();

	return (
		<div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
			<div className="w-full px-4 py-6 flex items-center justify-between">
				<div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
					Arif Hidayat's App
				</div>
				<NavigationMenu>
					<NavigationMenuList className="flex gap-4">
						<NavigationMenuLink asChild>
							<Link
								to="#"
								className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
							>
								Home
							</Link>
						</NavigationMenuLink>
						<NavigationMenuLink asChild>
							<Link
								to="#"
								className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
							>
								Features
							</Link>
						</NavigationMenuLink>
						<NavigationMenuLink asChild>
							<Link
								to="#"
								className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
							>
								Pricing
							</Link>
						</NavigationMenuLink>
						<NavigationMenuLink asChild>
							<Link
								to="#"
								className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
							>
								Contact
							</Link>
						</NavigationMenuLink>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
			<div className="flex-1">
				<section className="w-full py-12 md:py-24 lg:py-32">
					<div className="container mx-auto px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
									Welcome to MyApp
								</h1>
								<p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
									This application was developed as part of a job application
									for INCIT.
								</p>
							</div>
							<div className="space-x-4">
								{auth ? (
									<>
										<Link
											to="#"
											className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
										>
											Go To Dashboard
										</Link>
										<Link
											to="#"
											className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
										>
											Logout
										</Link>
									</>
								) : (
									<>
										<Link
											to={ROUTES.login}
											className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
										>
											Login
										</Link>
										<Link
											to={ROUTES.signup}
											className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
										>
											Sign Up
										</Link>
									</>
								)}
							</div>
						</div>
					</div>
				</section>
			</div>
			<div className="w-full h-20 flex items-center justify-center border-t text-gray-600 dark:border-gray-800 dark:text-gray-300">
				<p>&copy; 2025 MyApp. Created by Mohamad Arif Hidayat.</p>
			</div>
		</div>
	);
}
