import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="w-64 h-screen bg-purple-100 p-5 flex flex-col items-center">
            {/* User Profile Section */}
            <div className="flex flex-col ">
                <h2 className="font-bold text-lg mt-3">MyFinanceMate</h2>
                <br />
                <img 
                    src="/images/user.png" 
                    alt="User"
                    className="w-20 h-20 rounded-full border-2 border-purple-400"
                />
            </div>

            {/* Navigation Links */}
            <div className="mt-6 w-full flex flex-col">
                <NavLink to="/dashboard" location={location}>📊 Dashboard</NavLink>
                <NavLink to="/profile" location={location}>👤 User Profile</NavLink>
                <NavLink to="/income" location={location}>💰 Income</NavLink>
                <NavLink to="/expense" location={location}>🛒 Expense</NavLink>
                <NavLink to="/budget" location={location}>📋 Budget</NavLink>
                <NavLink to="#" location={location}>🔓 Logout</NavLink>
            </div>
        </div>
    );
};

// Custom NavLink Component to handle active styling
const NavLink = ({ to, location, children }) => {
    const isActive = location.pathname === to;

    return (
        <Link 
            to={to} 
            className={`p-2 rounded  ${isActive ? "bg-purple-400 text-black" : "hover:bg-purple-200"}`}
        >
            {children}
        </Link>
    );
};

export default Sidebar;
