import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../helpers/UrlHelper";
import {toast}  from "react-toastify";

const VerifyEmail = () => {

    const params = useParams();
    const navigate=useNavigate();
    const randHash = params?.randhash;
   let url= (new URL(`${BACKEND_URL}/api/user/verify-email/${randHash}`));
    // url.searchParams.set('hash',randHash)
    
        axios({
            method:"GET",
            url:url
         }).then((response)=>{
                if(response.status ==200){
                       toast.success(response.data.message);
                       navigate('/login');     
                }
         }).catch((err)=>{
            toast.error(err.response.data.message, {});
         })
    
    return (
        <h1>Wait ... While we are processing. </h1>
    );
}

export default VerifyEmail;