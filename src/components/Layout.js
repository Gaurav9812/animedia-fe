import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import useLogin from "../hooks/useLogin";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

const Layout = () => {
  const user = useSelector((store) => store.user.user);

  useLogin({ user });

  return (
    <div className="p-5">
      {/* Same as */}
      <Header />
      <div className="grid grid-cols-4 gap-8 text-white">
        <div className="col-span-1">
          <LeftSidebar />
        </div>
        <div className="col-span-2 flex justify-center">
          <div className="w-4/5">
            <Outlet />
          </div>
        </div>
        <div className="col-span-1">
          <RightSidebar />
        </div>
      </div>
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
