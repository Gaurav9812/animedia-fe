import { useEffect } from "react";
import "../assets/css/App.css";
import { useDispatch, useSelector } from "react-redux";
import useLogin from "../hooks/useLogin";
import { HOME, NOTIFICATIONS, currUrl } from "../utils/urlSlice";


function Notifications() {
  

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(currUrl({component:NOTIFICATIONS}))
  },[])
   return (
    <div className="App">
      <h1>Notifications</h1>
    </div>
  );
}

export default Notifications;
