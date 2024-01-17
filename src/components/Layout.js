import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import useLogin from "../hooks/useLogin";

const Layout = () => {


    const user = useSelector((store)=>store.user.user);
    
    useLogin({user});
     
    return (
      <div className="p-5">
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
      </div>
    );
  };

  export default Layout;