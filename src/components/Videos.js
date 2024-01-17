import { useEffect } from "react";
import "../assets/css/App.css";
import { useDispatch, useSelector } from "react-redux";
import useLogin from "../hooks/useLogin";
import { HOME, VIDEOS, currUrl } from "../utils/urlSlice";


function Videos() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(currUrl({component:VIDEOS}))
  },[])
  
  return (
    <div className="App">
      <h1>Videos</h1>
    </div>
  );
}

export default Videos;
