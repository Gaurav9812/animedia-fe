import { useSelector } from "react-redux";
import ThreeVerticalDot from "../assets/img/svgs/ThreeVerticalDot";
import { useEffect, useRef, useState } from "react";
import CoverPhotoModal from "./CoverPhotoModal";
import { getFIlePath } from "../helpers/FileHelper";
import { ref } from "yup";
import BioComponent from "./BioComponent";
import { Link } from "react-router-dom";

const LeftCard = () => {
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [updateField, setUpdateField] = useState(null);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (showDropdown &&  dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);

    return ()=>{
      document.removeEventListener('mousedown',handleOutsideClick);
    }
  }, [showDropdown]);

  const user = useSelector((store) => {
    return store.user.user;
  });
  if(!user){
    return;
  }

  const handleClick = () => {
    setShowDropdown(true);
  };
  const handleCoverPhotoOpen = (fieldToUpdate) => {
    setShowModal(true);
    setShowDropdown(false);
    setUpdateField(fieldToUpdate);
  };
  const handleCoverPhotoCLose = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-[var(--color-light-black)] rounded-3xl overflow-hidden flex flex-col items-center ">
      {showModal && <CoverPhotoModal fieldToUpdate={updateField} closeModal={handleCoverPhotoCLose} />}
      <div
        className="h-32 w-full relative flex justify-center items-center"
        ref={dropdownRef}
      >
        <img
          className="w-full h-full"
          src={
            user?.coverPhoto
              ? user.coverPhoto
              : "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg"
          }
        />
        <div className="absolute right-4 top-4 text-right flex flex-col justify-end items-end z-20">
          <div
            className=" w-6 bg-[var(--color-dark-black)] rounded-md p-1"
            onClick={handleClick}
          >
            <ThreeVerticalDot />
          </div>
          {showDropdown && (
            <div className=" bg-slate-700 text-sm p-2">
              <div
                className="hover:bg-black p-1"
                onClick={()=>handleCoverPhotoOpen('cover_photo')}
              >
                Update Cover Photo{" "}
              </div>
              <div className="hover:bg-black p-1"
              onClick={()=>handleCoverPhotoOpen('profile_photo')}
              >
                
                Update Profile Photo </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-around w-full">
        <div className="flex flex-col items-center">
          {" "}
          <span className="text-xl break-after-column text-[var(--font-color-primary)]">1000</span>
          <span className="font-thin text-sm text-[var(--font-color-secondary)]">
            Followers
          </span>{" "}
        </div>
        <div className="w-20 h-20 mx-2 rounded-3xl overflow-hidden -my-8 z-10 border-4 border-[var(--color-dark-black)]">
          {user?.profilePhoto ? (
            <img
              src={user?.profilePhoto}
              className="object-center object-cover"
            />
          ) : (
            <div className="text-5xl w-full h-full text-center flex items-center justify-center bg-slate-300 text-[#000000ee]">
             <p> {user?.name?.firstName.charAt(0)}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          {" "}
          <span className="text-xl break-after-column text-[var(--font-color-primary)]">1000</span>
          <span className="font-thin text-sm text-[var(--font-color-secondary)]">
            Following
          </span>{" "}
        </div>
      </div>
      <div className=" text-center p-2">
        
      <div className="text-lg text-[var(--font-color-primary)] ">{`${user.name.firstName} ${user.name.lastName}`}</div>
      <div className="font-thin text-sm text-[var(--font-color-secondary)]">{`@${user.username}`}</div>

      </div>
      <BioComponent />
      <div className="p-3 w-full">
      <button className="bg-[var(--color-dark-black)] w-full rounded-lg p-1">
      <Link to='/'>View Profile</Link>
      </button>
      </div>
      
    </div>
  );
};

export default LeftCard;
