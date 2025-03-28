import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-emerald-100 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-emerald-500">MyFinance</span>
            <span className="text-slate-700">Mate</span>
          </h1>
        </Link>

        {/* Search Bar */}
        <form className="bg-white p-2 rounded-lg flex items-center shadow-sm">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search..."
            aria-label="Search"
            className="focus:outline-none bg-transparent w-32 sm:w-64 px-2 text-slate-700"
          />
          <FaSearch className="text-emerald-600 ml-2" />
        </form>

        {/* Navigation Links */}
        <ul className="flex space-x-4 text-sm sm:text-base text-emerald-700 items-center">
          <li className="hidden sm:inline hover:text-emerald-900 hover:underline cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-emerald-900 hover:underline cursor-pointer">
            <Link to="/about">About</Link>
          </li>

          {currentUser ? (
            <Link to="/profile">
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar || "/default-avatar.png"}
                alt="profile"
              />
            </Link>
          ) : (
            <li>
              <Link to="/signin">
                <button className="bg-emerald-500 text-white px-4 py-1 rounded-lg hover:bg-emerald-700 transition">
                  Sign in
                </button>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
