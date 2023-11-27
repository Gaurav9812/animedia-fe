import axios from "axios";
import { Formik } from "formik";
import { URL_FORGOT_PASSWORD } from "../helpers/UrlHelper";
import { toast } from "react-toastify";
import { Form, redirect, useNavigate } from "react-router-dom";
import { MyTextField } from "./Register";
import { object, string } from "yup";

const ForgotPassword = ()=>{
    const navigate= useNavigate();
    return ( <>      
      <h1 className="text-3xl font-extrabold mb-5 font-sans">Forgot Password.</h1>
    <p className="text-lg font-medium font-sans">Please enter the Email Id associated with your account and we’ll send verification code to reset your password.
.</p>

   
      <Formik
        initialValues={{   
          email: "",
        }}
        validationSchema={forgotPasswordValidationSchema}
        validate={(values) => {
          const errors = {};
          
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
         
          setSubmitting(true);
          console.log("sad21");
           axios({
            method: 'post',
            headers: {
              "Content-Type": "application/json",
            },
            url: URL_FORGOT_PASSWORD,
            data: JSON.stringify(values),
          })
            .then((response) => {
                if(response.data.status == 200){
                    toast.success(response.data.message);
                    console.log("1sad");
                     navigate('/reset-link-sent')
                }else if(response.data.status == 201){
                    toast.warn(response.data.message);
                }else if(response.data.status == 500){
                    toast.error(response.data.message);
                }
            })
            .catch((error) => {
              console.log(error);
              toast.error(error.response.data.message, {});
            })
            
        }}
      >
        {({ errors, isSubmitting, touched,isValidating ,submitForm}) => {
        
          return (
            <Form className="flex flex-col my-4" onSubmit={submitForm} >
              
              <MyTextField
                type="text"
                className="border-2 border-black p-2  my-3"
                placeholder="Enter email address or username"
                name="email"
                label="Username or Email Address"
              />

              <div>
              <button
                type="submit"
                className="  text-white rounded-lg bg-gray-900 px-6 py-2"
                disabled={isSubmitting}
              >
                Send Password Reset Link
              </button>
              </div>
            </Form>
          );
        }}
      </Formik>

      </>
    );
}

export default ForgotPassword;


const forgotPasswordValidationSchema = object({  
    email: string().email().min(10).max(50).required(),
  });