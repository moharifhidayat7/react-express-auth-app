import ROUTES from "@/routes"
import { Link } from "react-router"
export const Header = () => {
  return (
    <div className="p-4">
      <div>
        <Link to={ROUTES.dashboard}>
          <h1 className="font-lexend font-bold">Finance Tracker</h1>
        </Link>
      </div>
    </div>
  )
}
