import React, { useEffect } from "react";
import { MyTextField } from "./Register";
import { Formik } from "formik";
import axios from "axios";
import { URL_LOGIN, URL_LOGIN_GOOGLE } from "../helpers/UrlHelper";
import { toast } from "react-toastify";
import { Form, Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import GOOGLE_ICON from '../assets/img/icons8-google-120.png';
import useGoogleLogin from "../hooks/useGoogelLogin";
import useLogin from "../hooks/useLogin";



const Login = () => {
  console.log("sda");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(store => store.user.user);
  
  const showGooglePrompt = useLogin({user});
  console.log(showGooglePrompt); 
  useGoogleLogin({user,dispatch,navigate,showGooglePrompt});
  
  return (
    <>        <h1 className="text-3xl font-extrabold mb-5 font-sans">Welcome back to world of Anime.</h1>
        <p className="text-lg font-medium font-sans">Discover the all anime action in one Site.</p>

        <div className="my-5 flex flex-wrap"> 
        <div id="buttonDiv">s</div>
        <button className="px-8  border-2 rounded-lg flex items-center mx-6 bg-[#f5f9ff]"> <img src={GOOGLE_ICON} className="w-5 mr-2" /> <span>Google</span> </button>
        </div>
        <div className="flex items-center">
        <span>OR </span>
        <div className="flex-grow border-t border-gray-400 ml-2"></div>
      </div>
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
                  
                  if (response.data.status == 200) {
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
                      dispatch(addUser({token:response.data.token,user:response.data.user}));

                      return navigate('/');
                    }
                  else if(response.data.status == 200){
                  toast.warning(response.data.message, {});
                  }
                })
                .catch((error) => {
                  console.log(error);
                  toast.error(error.response.data.message, {});
                });

                
                
            }}
          >
            {({ errors, isSubmitting, touched,isValidating ,submitForm}) => {
            
              return (
                <Form className="flex flex-col my-4" onSubmit={submitForm}>
                  
                  <MyTextField
                    type="text"
                    className="border-2 border-black p-2  my-3"
                    placeholder="Enter email address or username"
                    name="username"
                    label="Username or Email Address"
                  />
                  <MyTextField
                    type="password"
                    className="border-2 border-black p-2  my-3"
                    placeholder="Enter password"
                    name="password"
                    label="Password"
                  />

                  <Link to="/forgot-password" className="font-bold text-teal-700 mb-5">
                    Forgot Password?
                  </Link>
                  
                  <div>
                  <button
                    type="submit"
                    className="  text-white rounded-lg bg-gray-900 px-6 py-2"
                    disabled={isSubmitting}
                  >
                    Login
                  </button>
                  </div>
                </Form>
              );
            }}
          </Formik>

          <p className="font-medium my-10">
            Don't Have an account? 
            <Link to="/register" className="text-teal-700 font-bold">
            Sign up
            </Link>
          </p>
          </>

    );
};

export default Login;

const loginValidationSchema = object({  
  username: string().min(10).max(50).required(),
  password: string().min(10).max(50).required(),
});