import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SignOut from "./SignOut";
import useDarkMode from "../hooks/useDarkMode";
import { FaUser } from "react-icons/fa6";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [theme, setTheme] = useDarkMode();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="bg-slate-200 shadow-md sticky top-0 z-50 dark:bg-gray-700">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 ">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-600 dark:text-white">Mame </span>
            <span className="text-slate-900">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center ">
          <input
            type="text"
            placeholder="  Search"
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch />
        </form>
        <ul className="flex gap-4 items-center justify-center">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700  dark:text-white hover:text-slate-950 active:text-slate-950">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700  dark:text-white hover:text-slate-950  active:text-slate-950">
              About
            </li>
          </Link>
          {currentUser && (
            <li className="text-slate-700 hover:text-slate-950  dark:text-white active:text-slate-950">
              <Link to="/listings">Manage Listings</Link>
            </li>
          )}
        </ul>
        <ul className="flex gap-4 items-center justify-center">
          <button
            onClick={toggleTheme}
            className="text-xl p-2 rounded-full bg-gray-100 dark:bg-gray-800
                       hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            title="Toggle theme"
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
          <li className="text-slate-700 hover:text-slate-950 active:text-slate-950">
            {currentUser ? (
              <Link to="/profile">
                <img
                  src={currentUser.avatar}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </Link>
            ) : (
              <Link to="/sign-in" className="dark:text-white ">
                <FaUser size={25} />
              </Link>
            )}
          </li>
          <li className="text-slate-800 hover:text-slate-950 active:text-slate-950 ">
            {currentUser && <SignOut />}
          </li>
          {/* Theme Toggle */}
        </ul>
      </div>
    </header>
  );
};

export default Header;
