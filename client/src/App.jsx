import { BrowserRouter, Routes, Route, useLocation, } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Income from "./pages/Income";


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
      {/* Show Sidebar only on the Dashboard page */}
      {location.pathname === "/dashboard" && <Sidebar />}

      <div className="flex-1">
        

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/income" element={<Income />} />

        </Routes>
      </div>
    </div>
  );
}
