import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Budget from "./pages/Budget";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Offers from "./components/Offer";

import SubOffers from "./components/SubOffers";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/offers/:category" element={<SubOffers />} />
      </Routes>
    </BrowserRouter>
  );
}
