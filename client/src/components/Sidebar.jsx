import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-purple-100 p-5 flex flex-col items-center">
            {/* User Profile Section */}
            <div className="flex flex-col ">
                
                <h2 className="font-bold text-lg mt-3">MyFinanceMate</h2><br></br>
                <img 
                    src="/images/user.png" 
                    alt="User"
                    className="w-20 h-20 rounded-full border-2 border-purple-400"
                />
            </div>

            {/* Navigation Links */}
            <div className="mt-6 w-full flex flex-col">
                <Link to="/dashboard" className="p-2 hover:bg-purple-200 rounded ">📊 Dashboard</Link>
                <Link to="#" className="p-2 hover:bg-purple-200 rounded">💰 Income</Link>
                <Link to="#" className="p-2 hover:bg-purple-200 rounded">🛒 Expense</Link>
                <Link to="#" className="p-2 hover:bg-purple-200 rounded">📋 Budget</Link>
                <Link to="#" className="p-2 hover:bg-purple-200 rounded ">🔓 Logout</Link>
            </div>
        </div>
    );
};

export default Sidebar;
