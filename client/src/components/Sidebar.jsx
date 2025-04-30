/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaMoneyBillWave,
  FaChartBar,
  FaSignOutAlt,
  FaPiggyBank,
  FaCog,
  FaBell,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// Removed from top level and moved inside the Sidebar component

const Sidebar = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState(location.pathname);
  const [collapsed, setCollapsed] = useState(false);
  const [userData] = useState({
    name: "John Doe",
    email: "john@example.com",
    avatar: "/images/user.png",
  });

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`h-screen bg-gradient-to-b from-purple-700 to-purple-900 p-5 flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-5 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg hover:bg-purple-100 transition-all"
      >
        {collapsed ? ">" : "<"}
      </button>

      {/* User Profile Section */}
      <div
        className={`flex flex-col items-center mb-8 transition-all ${
          collapsed ? "px-0" : "px-4"
        }`}
      >
        {!collapsed && (
          <h2 className="font-bold text-xl text-white mb-6">MyFinanceMate</h2>
        )}
        <img
          src={userData.avatar}
          alt="User"
          className={`rounded-full border-4 border-purple-300 shadow-lg transition-all ${
            collapsed ? "w-12 h-12" : "w-20 h-20"
          }`}
        />
        {!collapsed && (
          <div className="mt-4 text-center">
            <p className="font-semibold text-white">{userData.name}</p>
            <p className="text-xs text-purple-200">{userData.email}</p>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <div className="mt-6 w-full flex flex-col space-y-3">
        <NavLink
          to="/dashboard"
          activePath={activePath}
          icon={<FaChartBar />}
          label="Dashboard"
          collapsed={collapsed}
        />
        <NavLink
          to="/profile"
          activePath={activePath}
          icon={<FaUser />}
          label="Profile"
          collapsed={collapsed}
        />
        <NavLink
          to="/income"
          activePath={activePath}
          icon={<FaMoneyBillWave />}
          label="Income"
          collapsed={collapsed}
        />
        <NavLink
          to="/expense"
          activePath={activePath}
          icon={<FaHome />}
          label="Expense"
          collapsed={collapsed}
        />
        <NavLink
          to="/budget"
          activePath={activePath}
          icon={<FaPiggyBank />}
          label="Budget"
          collapsed={collapsed}
        />

        {/* Divider */}
        <div className="border-t border-purple-500 my-3"></div>

        <NavLink
          to="/notifications"
          activePath={activePath}
          icon={<FaBell />}
          label="Notifications"
          collapsed={collapsed}
          badge={3}
        />
        <NavLink
          to="/settings"
          activePath={activePath}
          icon={<FaCog />}
          label="Settings"
          collapsed={collapsed}
        />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`flex items-center space-x-4 p-3 rounded-md transition-all duration-300 text-white hover:bg-purple-600 w-full ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <span>
            <FaSignOutAlt />
          </span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Footer (only visible when expanded) */}
      {!collapsed && (
        <div className="mt-auto text-center text-xs text-purple-300 pt-4 border-t border-purple-500">
          <p>MyFinanceMate v1.0.0</p>
          <p className="mt-1">© 2023 All Rights Reserved</p>
        </div>
      )}
    </div>
  );
};

const NavLink = ({ to, icon, label, collapsed, badge }) => {
  const location = useLocation(); // Get current location
  const isActive = location.pathname === to; // Compare pathname

  return (
    <Link
      to={to}
      className={`flex items-center space-x-4 p-3 rounded-md transition-all duration-300 ease-in-out relative
          ${
            isActive
              ? "bg-purple-600 text-white font-semibold"
              : "text-purple-100 hover:bg-purple-800"
          }`}
      title={collapsed ? label : ""}
    >
      <span className={`${isActive ? "text-white" : "text-purple-300"}`}>
        {icon}
      </span>
      {!collapsed && <span>{label}</span>}
      {badge && !collapsed && (
        <span className="absolute right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </Link>
  );
};

// PropTypes validation
NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
  badge: PropTypes.number,
};

export { Sidebar, NavLink };
