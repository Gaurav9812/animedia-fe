import React, { createRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import App from "./components/App";
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
// import 'react-toastify/dist/'
import "react-toastify/dist/ReactToastify.css";
import { Provider, useSelector } from "react-redux";
import store from "./utils/store";
import NewLayout from "./components/NewLayout";
import useLogin from "./hooks/useLogin";
import EmailVerification from "./components/EmailVerification";
import VerifyEmail from "./components/VerifyEmail";
import ForgotPassword from "./components/ForgotPassword";
import ResetLinkSent from "./components/ResetLinkSent";
import ResetPassword from "./components/ResetPassword";
import Layout from "./components/Layout";
import Notifications from "./components/Notifications";
import Messages from "./components/Messages";
import Videos from "./components/Videos";

const root = ReactDOM.createRoot(document.getElementById("root"));



export const routes = [
  {
    path: "/register",
    element: <Register />,
    // nodeRef: createRef()
  },
  {
    path: "/login",
    element: <Login />,
    // nodeRef: createRef()
  },
  {
    path: "/email-verification",
    element: <EmailVerification />,
    // nodeRef: createRef()
  },
  {
    path: "/verify-email/:randhash",
    element: <VerifyEmail />,
    // nodeRef: createRef()
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    // nodeRef: createRef()
  },
  {
    path: "/reset-link-sent",
    element: <ResetLinkSent />,
    // nodeRef: createRef()
  },
  {
    path: "/reset-password/:hash",
    element: <ResetPassword />,
    // nodeRef: createRef()
  },
];

const RenderComp = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={AppRouter} />
    </Provider>
  );
};


const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/videos",
        element: <Videos />,
      },
      
    ],
  },
  {
    element: <NewLayout />,
    children: routes,
  },
]);


root.render(<RenderComp />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
