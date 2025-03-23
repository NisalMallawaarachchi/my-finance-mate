import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-custom-purple shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-custom-purple">MyFinance</span>
            <span className="text-slate-700">Mate</span>
          </h1>
        </Link>

        {/* Search Bar */}
        <form className="bg-white p-2 rounded-lg flex items-center shadow-sm">
          <input
            type="text"
            placeholder="Search..."
            aria-label="Search"
            className="focus:outline-none bg-transparent w-32 sm:w-64 px-2 text-slate-700"
          />
          <FaSearch className="text-custom-navBar-purple ml-2" />
        </form>

        {/* Navigation Links */}
        <ul className="flex space-x-4 text-sm sm:text-base text-custom-navBar-purple items-center">
          <li className="hidden sm:inline hover:text-emerald-900 hover:underline cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-emerald-900 hover:underline cursor-pointer">
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/signin">
              <button className="bg-custom-purple-button text-white px-4 py-1 rounded-lg hover:bg-emerald-700 transition">
                Sign in
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
