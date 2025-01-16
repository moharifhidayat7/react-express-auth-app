import { Link, useLocation } from "react-router";

export const Breadcrumb = () => {
	const paths = [
		{
			label: "Dashboard",
			path: "/app",
		},
	];
	const location = useLocation();

	return (
		<div className="text-sm text-gray-700 flex gap-x-2">
			{paths.map((path) => {
				if (location.pathname === path.path) {
					return <>{path.label}</>;
				}
				return (
					<>
						<Link to={path.path}>{path.label}</Link>
						<span>|</span>
					</>
				);
			})}
		</div>
	);
};
