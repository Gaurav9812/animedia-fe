import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="p-5 bg-purple-900 flex justify-between">
      <div className="flex items-center">
        <img
          className="w-10 mx-5"
          src="https://p1.hiclipart.com/preview/179/234/505/books-icon-ebooks-icon-g-icon-goodreads-icon-round-icon-social-media-icon-yellow-circle-orange-logo-png-clipart.jpg "
        />
        <span className="text-lg text-white">G-boook</span>
      </div>
      <div className="flex mr-24">
        <Link to="/login" className="text-lg text-white mx-8">
          Login
        </Link>
        <Link to="/register" className="text-lg text-white">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Header;
