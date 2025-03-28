import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiHome, 
  FiUser, 
  FiDollarSign, 
  FiPieChart, 
  FiLogOut,
  FiChevronLeft,
  FiSettings,
  FiBarChart2,
  FiCreditCard
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
    navigate("/login");
  };

  const menuItems = [
    {
      path: '/dashboard',
      icon: <FiHome />,
      label: 'Dashboard',
      submenu: null
    },
    {
      path: '/profile',
      icon: <FiUser />,
      label: 'Profile',
      submenu: null
    },
    {
      path: '/transactions',
      icon: <FiDollarSign />,
      label: 'Transactions',
      submenu: [
        { path: '/income', label: 'Income' },
        { path: '/expenses', label: 'Expenses' },
        { path: '/transfers', label: 'Transfers' }
      ]
    },
    {
      path: '/budgets',
      icon: <FiPieChart />,
      label: 'Budgets',
      submenu: [
        { path: '/monthly-budgets', label: 'Monthly' },
        { path: '/category-budgets', label: 'By Category' }
      ]
    },
    {
      path: '/reports',
      icon: <FiBarChart2 />,
      label: 'Reports',
      submenu: null
    },
    {
      path: '/accounts',
      icon: <FiCreditCard />,
      label: 'Accounts',
      submenu: null
    },
    {
      path: '/settings',
      icon: <FiSettings />,
      label: 'Settings',
      submenu: null
    }
  ];

  return (
    <motion.div 
      className={`flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen 
        ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 ease-in-out`}
      initial={{ width: 256 }}
      animate={{ width: isCollapsed ? 80 : 256 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed && (
          <motion.h1 
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
            initial={{ opacity: 1 }}
            animate={{ opacity: isCollapsed ? 0 : 1 }}
          >
            FinanceMate
          </motion.h1>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          <FiChevronLeft className={`transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* User Profile */}
      <div className="flex flex-col items-center p-4 border-b border-gray-700">
        <div className="relative mb-3">
          <img 
            src="/images/user.png" 
            alt="User"
            className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
        </div>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isCollapsed ? 0 : 1 }}
            className="text-center"
          >
            <p className="font-medium">John Doe</p>
            <p className="text-xs text-gray-400">Premium Member</p>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        {menuItems.map((item) => (
          <div key={item.path} className="mb-1">
            <Link
              to={item.path}
              className={`flex items-center p-3 rounded-lg transition-colors
                ${location.pathname === item.path ? 'bg-purple-600/20 text-purple-400' : 'hover:bg-gray-700/50'}
                ${isCollapsed ? 'justify-center' : ''}`}
              onClick={() => item.submenu && setActiveSubmenu(activeSubmenu === item.path ? null : item.path)}
            >
              <span className="text-lg">{item.icon}</span>
              {!isCollapsed && (
                <>
                  <motion.span 
                    className="ml-3"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isCollapsed ? 0 : 1 }}
                  >
                    {item.label}
                  </motion.span>
                  {item.submenu && (
                    <motion.span 
                      className="ml-auto"
                      animate={{ rotate: activeSubmenu === item.path ? -90 : 0 }}
                    >
                      <FiChevronLeft size={16} />
                    </motion.span>
                  )}
                </>
              )}
            </Link>

            {/* Submenu */}
            {item.submenu && !isCollapsed && (
              <AnimatePresence>
                {activeSubmenu === item.path && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden pl-10"
                  >
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`block py-2 px-3 text-sm rounded-lg transition-colors
                          ${location.pathname === subItem.path ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-700/50 transition-colors
            ${isCollapsed ? 'justify-center' : ''}`}
        >
          <FiLogOut className="text-lg" />
          {!isCollapsed && (
            <motion.span 
              className="ml-3"
              initial={{ opacity: 1 }}
              animate={{ opacity: isCollapsed ? 0 : 1 }}
            >
              Logout
            </motion.span>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;