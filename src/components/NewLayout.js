import { Outlet, useLocation, useOutlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "./Sidebar";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { routes } from "../index";
import useLogin from "../hooks/useLogin";
import { useSelector } from "react-redux";

const NewLayout = () => {
  
  const location = useLocation();

  const user = useSelector((store)=>store.user.user);
   
  const { nodeRef } =
  routes.find((route) => route.path === location.pathname) ?? {}
  
  return (
      <>
        {/* Same as */}
        {/* <Header /> */}
        <div className="flex">
        <div className="w-1/4 h-screen bg-red-950">
         <Sidebar />
         </div>

      <div className="w-3/4 p-8 h-screen bg-gray-100 overflow-scroll">
        <div className="w-1/2 relative">
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef}
            timeout={300}
            classNames="page"
            unmountOnExit
            
          >
            {(state) => (
              <div ref={nodeRef} className="page">
                    <Outlet />
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
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