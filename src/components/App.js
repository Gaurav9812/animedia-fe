import { useEffect } from "react";
import "../assets/css/App.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate=useNavigate();
  const user = useSelector((store)=>store.user.user);
  
   useEffect(()=>{
    if(!user){
      return navigate('/login');
    }
  })
  

  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
