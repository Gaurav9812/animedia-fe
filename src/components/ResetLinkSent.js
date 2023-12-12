import { useLocation } from "react-router-dom";

const ResetLinkSent = ()=>{

    const location = useLocation();
    const email = location.state?.email;
   return  (
   <div className="flex flex-col items-center justify-center">
    <div className="flex justify-center">
        <img className="w-1/2" src="https://geektrust.sgp1.digitaloceanspaces.com/assets/svg/tick.svg" />
    </div>
    <h1 className="text-3xl font-bold mb-5 font-sans">
        An Email has been sent to {email} with steps to reset the password
    </h1>
    </div>)
    ;
}

export default ResetLinkSent;