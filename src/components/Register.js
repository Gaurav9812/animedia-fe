import {  Field, Form, Formik, useField } from "formik";
import React, { useEffect, } from "react";
import { startYear, years, days, months } from "../helpers/helper";
import { object, string, number } from "yup";
import axios from "axios";
import { URL_REGISTER } from "../helpers/UrlHelper";
import { toast } from "react-toastify";
import {  Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GOOGLE_ICON from "../assets/img/icons8-google-120.png";
import useGoogleLogin from "../hooks/useGoogelLogin";
import useLogin from "../hooks/useLogin";
const Register = () => {

  const user = useSelector((store)=>store.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const showGooglePrompt = useLogin({user});
   
  useGoogleLogin({user,dispatch,navigate,showGooglePrompt});
  
  // toast.configure();
  useEffect(()=>{
    if(user){
      navigate('/')
    }
  })
  return (
    <>
    <h1 className="text-3xl font-extrabold mb-5 font-sans">Start an Account.</h1>
    <p className="text-lg font-medium font-sans">In a world of Anime.</p>
    <p className="text-lg font-medium font-sans">Just a few minutes away from all the anime action you can catch here.</p>


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
              firstName: "",
              lastName: "",
              day: "",
              month: "",
              year: "",
              email: "",
              username: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={signupValidationSchema}
            validate={(values) => {
              const errors = {};
              let date = new Date(values.year, values.month - 1, values.day);
              if (date.getDate() != values.day) {
                console.log(date.getDate());
                errors.year = "date is not valid";
                errors.month = "date is not valid";
                errors.day = "date is not valid";
              }

              if (
                values.confirmPassword &&
                values.password != values.confirmPassword
              ) {
                errors.confirmPassword =
                  "Confirm passssword doesn't match password";
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              
              setSubmitting(false);
              return axios({
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                url: URL_REGISTER,
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
                      return navigate('/email-verification');
                  }
                })
                .catch((error) => {
                  toast.error(error.response.data.message, {});
                });
                
            }}
          >
            {({ errors, isSubmitting, touched }) => {
              return (
                <Form className="flex flex-col p-3">
                  <div className="flex justify-between my-2">
                    <MyTextField
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      label="First Name"
                    />

                    <MyTextField
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      label="Last Name"
                    />
                  </div>
                  <div className="flex justify-between my-3 mx-2">
                    <div className="w-full mr-2">
                      <Field
                        as="select"
                        placeholder="Day"
                        className={
                          touched.day && errors.day
                            ? "border-4 border-red-800 rounded-md p-2 w-full"
                            : "border-2 border-black rounded-md p-2 w-full"
                        }
                        name="day"
                      label="Day"
                      >
                        <option value="">Select a day</option>
                        {days.map((day, index) => {
                          return (
                            <option value={index + 1} key={index + 1}>
                              {index + 1}
                            </option>
                          );
                        })}
                      </Field>
                      <div className="error text-red-700">
                        {touched.day && errors.day}
                      </div>
                    </div>
                    <div className="w-full mx-2">
                      <Field
                        as="select"
                        placeholder="Month"
                        className={
                          touched.month && errors.month
                            ? "border-4 border-red-800 rounded-md p-2 w-full"
                            : "border-2 border-black rounded-md p-2 w-full"
                        }
                        name="month"
                      label="Month"
                      >
                        <option value="">Select a Month</option>
                        {Object.values(months).map((month, index) => {
                          return (
                            <option value={index + 1} key={index + 1}>
                              {month}
                            </option>
                          );
                        })}
                      </Field>
                      <div className="error text-red-700">
                        {touched.month && errors.month}
                      </div>
                    </div>
                    <div className="w-full ml-2">
                      <Field
                        as="select"
                        placeholder="Year"
                        className={
                          touched.year && errors.year
                            ? "border-4 border-red-800 rounded-md p-2 w-full"
                            : "border-2 border-black rounded-md p-2 w-full"
                        }
                        name="year"
                      label="Year"
                      >
                        <option value="">Select a Year</option>
                        {years.map((year, index) => {
                          return (
                            <option
                              value={startYear + (index + 1)}
                              key={startYear + (index + 1)}
                            >
                              {startYear + (index + 1)}
                            </option>
                          );
                        })}
                      </Field>
                      <div className="error text-red-700">
                        {touched.year && errors.year}
                      </div>
                    </div>
                  </div>

                  <MyTextField
                    type="email"
                    className="border-2 border-black p-2  my-3"
                    label="Email"
                    placeholder="Email"
                    name="email"

                  />
                  <MyTextField
                    type="text"
                    className="border-2 border-black p-2  my-3"
                    placeholder="Username"
                    name="username"
                    label="Username"
                  />
                  <MyTextField
                    type="password"
                    className="border-2 border-black p-2  my-3"
                    placeholder="Password"
                    name="password"
                    label="Password"
                  />
                  <MyTextField
                    type="password"
                    className="border-2 border-black p-2 my-3"
                    placeholder="Re-enter Password"
                    name="confirmPassword"
                    label="Confirm-Password"
                  />


                   <div>      
                  <button
                    type="submit"
                    className="  text-white rounded-lg bg-gray-900 px-6 py-2 mt-2"
                    disabled={isSubmitting}
                  >
                    Register
                  </button>
                  </div> 
                </Form>
              );
            }}
          </Formik>

          <p className="font-medium mt-10">
            By signing up uou agree to our 
            <span  className="text-teal-700 font-bold">
            terms and conditions 
            </span>
            &nbsp;
            and 
            &nbsp;
            <span  className="text-teal-700 font-bold">
             privacy policy
            </span>.
          </p>

          <p className="font-medium my-10">
            Already have an account? 
            <Link to="/login" className="text-teal-700 font-bold">
            Sign In
            </Link>
          </p>
        
    </>
  );
};

export default Register;

export const MyTextField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <div className="m-2">
      <div>
        <label 
        className={meta.touched && meta.error ? "error text-red-500 font-bold" : "font-bold"}>{label}</label>
      <input
        {...field}
        {...props}
        className={
          meta.touched && meta.error
            ? "border-2 border-red-700 rounded-md my-2 p-2 w-full"
            : " rounded-md my-2 p-2 w-full"
        }
      />
      {meta.touched && meta.error ? (
        <div className="error text-red-500">{meta.error}</div>
      ) : null}
      </div>
    </div>
  );
};

const signupValidationSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  day: number().lessThan(32).moreThan(0).required(),
  month: number().lessThan(13).moreThan(0).required(),
  year: number().moreThan(0).required(),
  username: string().min(10).max(50).required(),
  email: string().email().min(10).max(50).required(),
  password: string().min(10).max(50).required(),
  confirmPassword: string().min(10).max(50).required(),
});
