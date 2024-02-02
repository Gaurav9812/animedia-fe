import { IoMdPhotos } from "react-icons/io";
import { BiSolidVideos } from "react-icons/bi";
import { FaPollH } from "react-icons/fa";
import { GrSchedules } from "react-icons/gr";
import ProfilePhoto from "./ProfilePhoto";
import { useSelector } from "react-redux";
import { useState } from "react";
import useModalUtils from "../hooks/useModalUtils";
import CreatePostModal from "./CreatePostModal";


const CreatePost = ()=>{
    const user = useSelector((store)=>store.user.user)
    const [modalStatus,toggleModal ] = useModalUtils();

    return (
        <div className="p-5 rounded-lg bg-[var(--color-light-black)]">
            {modalStatus && <CreatePostModal closeModal={toggleModal} /> }
            <div className="flex">
                <div className="w-14 mr-4 rounded-lg overflow-hidden ">
                    <ProfilePhoto {...user} />
                </div>
                <div className="flex w-11/12 flex-col">
                <input onClick={toggleModal} type="text" className="p-2 rounded-xl w-100 bg-[var(--color-dark-black)] w-100" placeholder="Whats on your mind?" />
                <div className="mt-3 flex justify-between">
                    <div onClick={toggleModal} className="flex items-center bg-[var(--color-dark-black)] px-5 py-2 rounded-3xl " ><IoMdPhotos className="text-green-400 mr-2" /> <span>Photo</span> </div>
                    <div className="flex items-center bg-[var(--color-dark-black)] px-5 py-2 rounded-3xl "><BiSolidVideos className="text-blue-400 mr-2"/> Videos </div>
                    <div className="flex items-center bg-[var(--color-dark-black)] px-5 py-2 rounded-3xl "><FaPollH className="text-red-400 mr-2" /> Poll </div>
                    <div className="flex items-center bg-[var(--color-dark-black)] px-5 py-2 rounded-3xl "><GrSchedules className="text-yellow-400 mr-2" /> Schedule </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;