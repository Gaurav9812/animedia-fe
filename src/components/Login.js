import React from "react";
import { MyTextField } from "./Register";
import { Formik } from "formik";
import axios from "axios";
import { URL_LOGIN } from "../helpers/UrlHelper";
import { toast } from "react-toastify";
import { Form, useNavigate } from "react-router-dom";
import { object, string } from "yup";


const Login = () => {
  const navigate = useNavigate();
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