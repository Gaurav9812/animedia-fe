import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage, removeFromLocalStorage, tokenKey } from "../helpers/helper";
import { URL_LOGIN_TOKEN } from "../helpers/UrlHelper";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

const useLogin=({user})=>{

  const dispatch = useDispatch();
  const navigate=useNavigate();
  
    useEffect(()=>{
        let token = getFromLocalStorage(tokenKey);
        if(!user){
        if(token){
          axios.get(URL_LOGIN_TOKEN+token).then((response)=>{
              if(response.data.status == 200){
                dispatch(addUser({token:response.data.token,user:response.data.user}));
              } else if(response.data.status == 201){
                  removeFromLocalStorage(tokenKey);
                  navigate('/login');
              }
          }).catch((err)=>{
             console.log(err); 
            toast.error(err.response.data.message);
          });
        }else{
            navigate('/login');
        }
    }
    },[user]);
}

export default useLogin;