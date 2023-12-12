import axios from "axios";
import { Formik } from "formik";
import { BACKEND_URL, URL_FORGOT_PASSWORD, URL_RESET_PASSWORD } from "../helpers/UrlHelper";
import { toast } from "react-toastify";
import { Form, redirect, useNavigate, useParams } from "react-router-dom";
import { MyTextField } from "./Register";
import { object, string } from "yup";

const ResetPassword = ()=>{
    const params = useParams();
    const navigate= useNavigate();

    const randHash = params?.hash;
   
    return ( <>      
      <h1 className="text-3xl font-extrabold mb-5 font-sans">New Password!</h1>
    <p className="text-lg font-medium font-sans">You can create your new password.</p>

   
      <Formik
        initialValues={{   
          password: "",
          confirmPassword: "",
        }}
        validationSchema={passwordResetValidationSchema}
        validate={(values) => {
            const errors = {};

            if (
              values.confirmPassword &&
              values.password != values.confirmPassword
            ) {
              errors.confirmPassword =
                "Confirm passssword doesn't match password";
            }

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
            url: URL_RESET_PASSWORD+randHash,
            data: JSON.stringify(values),
          })
            .then((response) => {
                if(response.data.status == 200){
                    toast.success(response.data.message);
                     navigate('/login');
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
                    type="password"
                    className="border-2 border-black p-2  my-3"
                    placeholder="Password"
                    name="password"
                    label="Enter new password"
                  />

                  <MyTextField
                    type="password"
                    className="border-2 border-black p-2 my-3"
                    placeholder="Re-enter Password"
                    name="confirmPassword"
                    label="Re-enter new password"
                  />
              <div>
              <button
                type="submit"
                className="  text-white rounded-lg bg-gray-900 px-6 py-2"
                disabled={isSubmitting}
              >
                Confirm Password
              </button>
              </div>
            </Form>
          );
        }}
      </Formik>

      </>
    );
}

export default ResetPassword;


const passwordResetValidationSchema = object({  
    password: string().min(10).max(50).required(),
    confirmPassword: string().min(10).max(50).required(),
  });