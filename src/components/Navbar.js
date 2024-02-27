import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-between">
        <li className="mr-6">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
        </li>
        <li className="dropdown relative">
          <a href="#create" className="text-white hover:text-gray-300">
            Create
          </a>
          <div className="dropdown-content absolute hidden bg-gray-800 text-white">
            <Link
              to="/create-user"
              className="block py-2 px-4 hover:bg-gray-700"
            >
              User
            </Link>
            <Link
              to="/create-tutorial"
              className="block py-2 px-4 hover:bg-gray-700"
            >
              Tutorial
            </Link>
            <Link
              to="/create-course"
              className="block py-2 px-4 hover:bg-gray-700"
            >
              Course
            </Link>
            <Link
              to="/create-category"
              className="block py-2 px-4 hover:bg-gray-700"
            >
              Category
            </Link>
            <Link
              to="/create-activity"
              className="block py-2 px-4 hover:bg-gray-700"
            >
              Activity
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
