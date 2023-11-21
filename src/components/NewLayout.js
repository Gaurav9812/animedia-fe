import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "./Sidebar";

const NewLayout = () => {
    console.log("layout");
  
    return (
      <>
        {/* Same as */}
        {/* <Header /> */}
        <div className="flex">
        <div className="w-1/4 h-screen bg-red-950">
         <Sidebar />
         </div>

      <div className="w-3/4 p-8 bg-gray-100 overflow-scroll">
        <div className="w-1/2">
         <Outlet />
         </div>
         </div>
        </div>
        {/* <Footer /> */}
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

  export default NewLayout;