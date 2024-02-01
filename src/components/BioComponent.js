import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHAR_LIMT_IN_BIO } from "../helpers/helper";
import axios from "axios";
import { URL_PROFILE_UPLOAD_PHOTO, URL_UPDATE_BIO } from "../helpers/UrlHelper";
import { toast } from "react-toastify";
import { updateUser } from "../utils/userSlice";
import { FaPencilAlt } from "react-icons/fa";

const BioComponent = () => {
  const bio = useSelector((store) => {
    return store.user.user?.bio;
  });
  const bearerToken = useSelector((store) => {
    return store.user.bearerToken;
  });

  const dispatch = useDispatch();
  
  const [updatedBio,setUpdatedBio]=useState(bio);
  const [updateBio, setUpdateBio] = useState(false);
  const [submitting,setSubmitting] = useState(false);

  const handleSubmitBio=async () =>{
        if(bio!=updatedBio && !submitting ){
            setSubmitting(true);
            let formData = new FormData();
            formData.append('bio',updatedBio);
            try {
                let response = await axios({
                  url: URL_UPDATE_BIO,
                  headers: {
                    Authorization: `Bearer ${bearerToken}`,
                  },
                  data: {bio:updatedBio},
                  method: "POST",
                });
                if (response.data.status != 200) {
                  toast.error(response.data.message);
                }else{
                  dispatch(updateUser({user:response.data.user}));
                  toast.success(response.data.message);
                  setSubmitting(false);
                  setUpdateBio(false);
                }        
              } catch (error) {}
        }
  }
  const handleUpdatedBio=(e)=>{
    if(e.target.value.length<=CHAR_LIMT_IN_BIO){
        setUpdatedBio(e.target.value)
    }
    
  }
  const updateBioTrue = () => {
    setUpdateBio(true);
  };
  const updateBioFalse = () => {
    setUpdateBio(false);
  };
  return (
    <div className="flex justify-center text-lg w-full">
      {updateBio ? (
        <div className="flex flex-col items-end w-full p-2 text-sm ">
          <textarea
            type="text"
            value={updatedBio}
            onChange={handleUpdatedBio}
            className="p-1 resize-none w-full bg-[var(--color-dark-black)] border-2 border-[var(--font-color-primary)] h-20 rounded-lg"
          />
          <p>{(CHAR_LIMT_IN_BIO - updatedBio?.length) } characters remaining</p>
          <div className=" mt-1">
            <button
              onClick={updateBioFalse}
              className="p-2 mr-1  bg-[var(--font-color-secondary)] text-[var(--color-dark-black)] rounded-lg "
            >
              Cancel
            </button>
            <button onClick={handleSubmitBio} className={"p-2  text-[var(--font-color-secondary)] rounded-lg "+ (bio == updatedBio ? "cursor-none opacity-35 bg-slate-500":"bg-[var(--color-dark-black)]") }>
              Save
            </button>
          </div>
        </div>
      ) : !bio ? (
        <button  onClick={updateBioTrue} className="p-2  text-sm bg-[var(--color-dark-black)] text-[var(--font-color-secondary)] rounded-lg ">
          Add Bio
        </button>
      ) : (
        <div className="flex">
          <p> {bio} </p>
          <div
          onClick={updateBioTrue} 
            className="p-1 w-7 cursor-pointer text-sm text-[var(--font-color-primary)] rounded-lg hover:bg-[var(--color-light-black)] "
          >
          <FaPencilAlt  />  
          </div>
          
        </div>
      )}
    </div>
  );
};

export default BioComponent;
