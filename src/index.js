import React, { createRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import App from "./components/App";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/'
import "react-toastify/dist/ReactToastify.css";
import { Provider, useSelector } from "react-redux";
import store from "./utils/store";
import NewLayout from "./components/NewLayout";
import useLogin from "./hooks/useLogin";

const root = ReactDOM.createRoot(document.getElementById("root"));
const Layout = () => {


  const user = useSelector((store)=>store.user.user);
  useLogin({user});
   
  
  return (
    <>
      {/* Same as */}
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};


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
