import { useEffect } from "react";
import "../assets/css/App.css";
import { useSelector } from "react-redux";
import useLogin from "../hooks/useLogin";


function App() {
  const user = useSelector((store)=>store.user.user);

  useLogin({user});
   
  

  return (
    <div className="App">
      <h1>asd</h1>
    </div>
  );
}

export default App;
