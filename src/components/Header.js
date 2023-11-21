import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromLocalStorage, tokenKey } from "../helpers/helper";
import { removeUser } from "../utils/userSlice";

const Header = () => {
  const user = useSelector((store)=>{return store.user.user});
  const dispatch = useDispatch();

  const handleLogout=() => {
    dispatch(removeUser());
    removeFromLocalStorage(tokenKey);
  
    }

  return (
    <div className="p-5 bg-purple-900 flex justify-between">
      <div className="flex items-center">
        <img
          className="w-10 mx-5"
          src="https://p1.hiclipart.com/preview/179/234/505/books-icon-ebooks-icon-g-icon-goodreads-icon-round-icon-social-media-icon-yellow-circle-orange-logo-png-clipart.jpg "
        />
        <span className="text-lg text-white">G-boook</span>
      </div>
      {!user && (
      <div className="flex mr-24">
        
        <Link to="/login" className="text-lg text-white mx-8">
          Login
        </Link>
        <Link to="/register" className="text-lg text-white">
          Register
        </Link>
        <a href="/auth/google/callback" className="text-lg text-white mx-8">
          Google auth
        </a>
      </div>
      )}
      {
        user && (
          <button className="text-lg text-white mx-8" onClick={handleLogout} >Logout</button>
        )
      }
    </div>
  );
};

export default Header;
