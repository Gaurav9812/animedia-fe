import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import App from "./components/App";
import { createBrowserRouter, RouterProvider, Outlet, Navigate, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/'
import 'react-toastify/dist/ReactToastify.css';
import { Provider, useDispatch } from "react-redux";
import store from "./utils/store";
import { getFromLocalStorage, tokenKey } from "./helpers/helper";
import axios from "axios";
import { URL_LOGIN_TOKEN } from "./helpers/UrlHelper";
import { addUser } from "./utils/userSlice";


const root = ReactDOM.createRoot(document.getElementById("root"));
const Layout = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  useEffect(()=>{
    let token = getFromLocalStorage(tokenKey);
    if(token){
      axios.get(URL_LOGIN_TOKEN+token).then((response)=>{
          if(response.data.status == 200){
            dispatch(addUser({token:response.data.token,user:response.data.user}));
            return navigate('/');
          } else if(response.data.status == 201){

          }
      }).catch((err)=>{
         console.log(err); 
        toast.error(err.response.data.message);
      });
    }
  },[]);
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
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

const RenderComp=()=>{
  return (
  <Provider store={store}>
  <RouterProvider router={AppRouter} />
  </Provider>
  );
}

root.render(<RenderComp />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
