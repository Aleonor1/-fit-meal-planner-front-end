import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useCookies } from "react-cookie";

const NavigationBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {};

  const [cookies] = useCookies(["accessToken"]);
  const accessToken = cookies.accessToken;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent flex items-center justify-between px-6 py-4">
      <div className="flex items-center ml-auto">
        {" "}
        {/* Added ml-auto class */}
        <button
          type="submit"
          className="block hover:bg-gray-400 mr-2 w-28 bg-gray-500 text-white-800 mt-4 py-2 rounded-2xl font-bold mb-2 mx-2"
        >
          <Link to="/" className="block w-full h-full">
            Home
          </Link>
        </button>
        <button
          type="submit"
          className="block hover:bg-gray-400 mr-2 w-28 bg-gray-500 text-white-800 mt-4 py-2 rounded-2xl font-bold mb-2 mx-2"
        >
          <Link to="/recipes" className="block w-full h-full">
            Recipes
          </Link>
        </button>
        {!accessToken ? (
          <div className="flex items-center ml-6">
            <button
              type="submit"
              className="block hover:bg-gray-400  w-28 bg-gray-500 text-white-800 mt-4 py-2 rounded-2xl font-bold mb-2 mx-2"
            >
              <Link to="/login" className="block w-full h-full">
                Log in
              </Link>
            </button>

            <button className="text-white text-lg w-28 ml-4 bg-purple-600 hover:bg-purple-700 mt-4 py-2 rounded-2xl font-bold mb-2 mx-2">
              <Link to="/register" className="block w-full h-full">
                Register
              </Link>
            </button>
          </div>
        ) : (
          <div className="relative ml-6">
            <button
              className="text-white text-lg hover:text-gray-300 flex items-center focus:outline-none"
              onMouseEnter={handleMenuToggle}
              onMouseLeave={handleMenuClose}
            >
              <FiUser className="mr-1" />
              Profile
            </button>
            {isMenuOpen && (
              <div
                className="absolute top-12 right-0 bg-white text-gray-800 py-2 px-4 rounded-md shadow-lg"
                onMouseEnter={handleMenuToggle}
                onMouseLeave={handleMenuToggle}
              >
                <ul>
                  <li>
                    <Link
                      to="/profile"
                      className="block py-1 hover:bg-gray-200"
                      onClick={(e) => e.stopPropagation()} //TO FIX
                    >
                      View Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block py-1 hover:bg-gray-200 w-full text-left"
                    >
                      <FiLogOut className="mr-1" />
                      Log out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
