import { useEffect } from "react";
import "../assets/css/App.css";
import { useDispatch, useSelector } from "react-redux";
import useLogin from "../hooks/useLogin";
import { HOME, currUrl } from "../utils/urlSlice";
import CreatePost from "./CreatePost";


function App() {
  const user = useSelector((store)=>store.user.user);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(currUrl({component:HOME}))
  },[])
  


  return (
    <div className="App">
        <CreatePost />
    </div>
  );
}

export default App;
