import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, matchPath, useNavigate } from "react-router-dom";
import { removeFromLocalStorage, tokenKey } from "../helpers/helper";
import { removeUser } from "../utils/userSlice";
import LOGO from "../assets/img/31530356_bird_2.svg"

import { HOME, MESSAGES, NOTIFICATIONS, VIDEOS } from "../utils/urlSlice";
import HomeIcon from "../assets/img/svgs/HomeIcon";
import MessageIcon from "../assets/img/svgs/MessageIcon";
import NotificationIcon from "../assets/img/svgs/NotificationIcon";
import VideoIcon from "../assets/img/svgs/VideoIcon";


const Header = () => {
  const user = useSelector((store)=>{return store.user.user});
  const url = useSelector((store)=>{return store.url.component });

  const dispatch = useDispatch();
  
  const handleLogout=() => {
    dispatch(removeUser());
    removeFromLocalStorage(tokenKey);

    }
  
  return (
    <div className="grid grid-cols-4 gap-3 mb-3">
      {/* Search */}
      <div className="flex  items-center col-span-1 ">
        
        <img
          className="w-10 mx-4 fill-black"
          src={LOGO}
        />
        
        <input placeholder="#Explore"  className="rounded-2xl p-2 bg-[var(--color-light-black)]" />
      </div>
      <div className="flex justify-center col-span-2">
          <Link to="/" className={url == HOME ? "mx-4 w-8 text-[var(--color-light-blue)]" : "mx-4 w-8 "}  ><HomeIcon/></Link>
          <Link to="/messages" className={url == MESSAGES ? "mx-4 w-8 text-[var(--color-light-blue)]" : "mx-4 w-8 "}  ><MessageIcon/></Link>
          <Link to="/notifications" className={url == NOTIFICATIONS ? "mx-4 w-8 text-[var(--color-light-blue)]" : "mx-4 w-8 "}  ><NotificationIcon/></Link>
          <Link to="/videos" className={url == VIDEOS ? "mx-4 w-8 text-[var(--color-light-blue)]" : "mx-4 w-8 "}  ><VideoIcon/></Link>
          
      </div>
      <div className="mr-2 flex justify-end col-span-1">
      {user ? ( <button className="text-lg text-white mx-8" onClick={handleLogout} >Logout</button>) : (
        <>
        <Link to="/login" className="text-lg text-white mx-8">
          Login
        </Link>
        <Link to="/register" className="text-lg text-white">
          Register
        </Link>
        <a href="/auth/google/callback" className="text-lg text-white mx-8">
          Google auth
        </a>
        </>
      )}
      
      </div>
    </div>
  );
};

export default Header;
