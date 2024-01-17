import { useEffect } from "react";
import "../assets/css/App.css";
import { useDispatch, useSelector } from "react-redux";
import useLogin from "../hooks/useLogin";
import {  MESSAGES, currUrl } from "../utils/urlSlice";


function Messages() {
  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(currUrl({component:MESSAGES}))
  },[])
  
  return (
    <div className="App">
      <h1>Messages</h1>
    </div>
  );
}

export default Messages;
