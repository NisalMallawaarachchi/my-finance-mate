import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OfferDescription from "./components/OfferDescription";
import Offers from "./components/Offers";
import Sidebar from "./components/Sidebar";
import SubOffers from "./components/SubOffers";
import About from "./pages/About";
import Budget from "./pages/Budget";
import Dashboard from "./pages/Dashboard";
import Expense from "./pages/Expense";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation(); // Get the current route

  // Show Sidebar on specific routes (including dynamic routes under /offers)
  const showSidebar = 
    location.pathname === "/dashboard" ||
    location.pathname === "/budget" ||
    location.pathname === "/expense" ||
    location.pathname.startsWith("/offers"); // Matches /offers, /offers/:category, /offers/:category/:subOffer

  // Hide Footer on signin and signup pages
  const showFooter = 
    location.pathname !== "/signin" && 
    location.pathname !== "/signup";

  return (
    <div className="app">
      {/* ToastContainer to render toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="flex">
        {showSidebar && <Sidebar />}

        <div className="flex-1 min-h-screen"> {/* Ensure full viewport height */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/offers/:category" element={<SubOffers />} />
            <Route path="/offers/:category/:subOffer" element={<OfferDescription />} />
          </Routes>

          
        </div>
      </div>
    </div>
  );
}