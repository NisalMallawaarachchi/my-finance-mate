import { BrowserRouter, Route, Routes, useLocation, } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import OfferDescription from "./components/OfferDescription";
import Offers from "./components/Offers";
import Sidebar from "./components/Sidebar";
import SubOffers from "./components/SubOffers";
import Budget from "./pages/Budget";
import Dashboard from "./pages/Dashboard";
import Expense from "./pages/Expense";


export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation(); // Get the current route

  return (
    <div className="flex">

      {(location.pathname === "/dashboard" ||
        location.pathname === "/budget" ||
        location.pathname === "/expense" ||
        location.pathname === "/offers" ||
        location.pathname === "/offers/:category" ||
        location.pathname === "/offers/:category/:subOffer"
      ) && <Sidebar />}


      <div className="flex-1">


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
  );
}
