import React, { useEffect } from "react";
import { MyTextField } from "./Register";
import { Formik } from "formik";
import axios from "axios";
import { URL_LOGIN, URL_LOGIN_GOOGLE } from "../helpers/UrlHelper";
import { toast } from "react-toastify";
import { Form, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

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

const Login = () => {
  const user = useSelector(store => store.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(user){
      navigate('/')
    }else{
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
  });

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

  return (
    <div className="flex h-5/6 justify-center items-center">
      <div className="w-1/3 border-4 border-indigo-950">
        <div className="p-5 bg-purple-800 flex justify-center items-center">
          <p className="text-white text-3xl font-bold ">
            Login
          </p>
        </div>
        <div>
          <Formik
            initialValues={{   
              username: "",
              password: "",
            }}
            validationSchema={loginValidationSchema}
            validate={(values) => {
              const errors = {};
              
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
             
              setSubmitting(true);
              return axios({
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                url: URL_LOGIN,
                data: JSON.stringify(values),
              })
                .then((response) => {
                
                  console.log(response);
                  
                  if (response.status == 200) {
                    toast.success(response.data.message, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      });
                  }
                  dispatch(addUser({token:response.data.token,user:response.data.user}));

                  return navigate('/');
                })
                .catch((error) => {
                  console.log(error);
                  toast.error(error.response.data.message, {});
                });

                
                
            }}
          >
            {({ errors, isSubmitting, touched,isValidating ,submitForm}) => {
            
              return (
                <Form className="flex flex-col p-3" onSubmit={submitForm}>
                  
                  <MyTextField
                    type="text"
                    className="border-2 border-black p-2  my-3"
                    placeholder="Username"
                    name="username"
                  />
                  <MyTextField
                    type="password"
                    className="border-2 border-black p-2  my-3"
                    placeholder="Password"
                    name="password"
                  />
                  
                  <button
                    type="submit"
                    className="bg-purple-800  text-white p-2"
                    disabled={isSubmitting}
                    
                  >
                    Login
                  </button>
                 <div id="buttonDiv">s</div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
    );
};

export default Login;

const loginValidationSchema = object({  
  username: string().min(10).max(50).required(),
  password: string().min(10).max(50).required(),
});