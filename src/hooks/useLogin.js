import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getFromLocalStorage, removeFromLocalStorage, tokenKey } from "../helpers/helper";
import { URL_LOGIN_TOKEN } from "../helpers/UrlHelper";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const useLogin=({user})=>{
  const [showGooglePrompt,setShowGooglePrompt] = useState(false);


  const dispatch = useDispatch();
  const navigate=useNavigate();
  const location = useLocation();

  console.log("use login before");
    useEffect(()=>{
  console.log("use login inside");
        const fetchData =async ()=>{
        let token = getFromLocalStorage(tokenKey);
        if(!user){
        if(token){
          try {
         const response = await axios.get(URL_LOGIN_TOKEN+token)
          // .then((response)=>{
              if(response.data.status == 200){
                dispatch(addUser({token:response.data.token,user:response.data.user}));
                console.log("vas");
                navigate('/');
              } else if(response.data.status == 201){
                  removeFromLocalStorage(tokenKey);
              }
          // }).catch((err)=>{
          // });
        }catch(err){
          console.log(err); 
          removeFromLocalStorage(tokenKey);
          toast.error(err.response.data.message);
        }
        }else{
          console.log("sda1");
        }
        setShowGooglePrompt(true);
        if(location.pathname == '/'){
          navigate('/login');
        }
      }else{
        navigate('/');
      }
    }
    fetchData();
    },[user]);
    return showGooglePrompt;
}

export default useLogin;