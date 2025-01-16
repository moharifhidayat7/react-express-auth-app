import { Outlet } from "react-router";

export default function Layout() {
	return (
		<div className="light flex h-screen w-full items-center justify-center px-4">
			<Outlet />
		</div>
	);
}
