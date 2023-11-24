import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { toast } from "react-toastify";
import { URL_LOGIN_GOOGLE } from "../helpers/UrlHelper";

const handleCredentialResponse=(data)=>{
    axios.post(URL_LOGIN_GOOGLE,JSON.stringify(data),{
     method:'POST',
     headers: {
       "Content-Type": "application/json",
     },
    }).then((response)=>{
     if(response.status==200){
       toast.success(response.data.message);
       
     }
    }).catch((err)=>{
     toast.error(err.response.data.message);
       console.log(err);
    });
}

const useGoogleLogin=async ({user,dispatch,navigate,showGooglePrompt:showPrompt})=>{
  console.log("use google login before"+showPrompt);

    useEffect(()=>{
  console.log("use google login inside");

      if(user){
        navigate('/');
      }else if(showPrompt){
        /* global google */
    google.accounts.id.initialize({
      client_id: "53548944878-8usn0t4ru2s7q851tqkmlhadure2ebv9.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
  
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
     google.accounts.id.prompt();
      }
    },[showPrompt]);
  
    const handleCredentialResponse=(data)=>{
      axios.post(URL_LOGIN_GOOGLE,JSON.stringify(data),{
       method:'POST',
       headers: {
         "Content-Type": "application/json",
       },
      }).then((response)=>{
       if(response.status==200){
         toast.success(response.data.message);
          dispatch(addUser({token:response.data.token,user:response.data.user}));
          return navigate('/');
       }
      }).catch((err)=>{
       toast.error(err.response.data.message);
         console.log(err);
      });
  }   
}

export default useGoogleLogin;