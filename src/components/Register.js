import { ErrorMessage, Field, Form, Formik, useField } from "formik";
import React, { useState } from "react";
import { startYear, years, days, months, BACKEND_URL } from "../helpers/helper";
import { object, string, number } from "yup";
import axios from "axios";
import { URL_REGISTER } from "../helpers/UrlHelper";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex h-5/6 justify-center items-center">
      <div className="w-1/3 border-4 border-indigo-950">
        <div className="p-5 bg-purple-800 flex justify-center items-center">
          <p className="text-white text-3xl font-bold ">
            Create a new Account?
          </p>
        </div>
        <div>
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
              console.log(values);
              setSubmitting(false);
              axios({
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
                    toast.success(response.data.message, {});
                    <Navigate to="/login" />;
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
                    />

                    <MyTextField
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                    />
                  </div>
                  <div className="flex justify-between my-3">
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
                  />
                  <MyTextField
                    type="password"
                    className="border-2 border-black p-2  my-3"
                    placeholder="Password"
                    name="password"
                  />
                  <MyTextField
                    type="password"
                    className="border-2 border-black p-2 my-3"
                    placeholder="Re-enter Password"
                    name="confirmPassword"
                  />

                  <button
                    type="submit"
                    className="bg-purple-800  text-white p-2"
                    disabled={isSubmitting}
                  >
                    Register
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

export default Register;

const MyTextField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <div className="my-2">
      <input
        {...field}
        {...props}
        className={
          meta.touched && meta.error
            ? "border-4 border-red-800 rounded-md p-2 w-full"
            : "border-2 border-black rounded-md p-2 w-full"
        }
      />
      {meta.touched && meta.error ? (
        <div className="error text-red-700">{meta.error}</div>
      ) : null}
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
