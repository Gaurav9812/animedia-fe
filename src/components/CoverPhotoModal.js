

import { useState } from "react";
import UPLOADICON from "../assets/img/icons/upload.png";
import {FaCloudUploadAlt} from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FileTypes, checkIfSizeIsCorrect, returnFileSize } from "../helpers/FileHelper";
import axios from "axios";
import { URL_GET_USER, URL_LOGIN, URL_PROFILE_UPLOAD_PHOTO } from "../helpers/UrlHelper";
import { useSelector } from "react-redux";
import store from "../utils/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CoverPhotoModal = ({closeModal})=>{

    const bearerToken = useSelector((store)=>{return store.user.bearerToken})
    const navigate = useNavigate();
    const [file,setFile]=useState(null);
    const [previewDiv,setPreviewDiv] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");

    const handleFileSave = async ()=>{


        if(file){
let formData = new FormData();
formData.append('file',File);
formData.append('field','cover_photo');
formData.append('fileName',File.name);
        try{
            let response = await axios({
                url:URL_PROFILE_UPLOAD_PHOTO,
                headers:{
                    'Authorization':`Bearer ${bearerToken}`,
                    "Content-Type":'multipart/form-data'
                },
                data:formData,
                method:'POST',
                
            });
            if(response.data.status !=200){
                toast.error(response.data.message);
                // return navigate('/login');
            }
            console.log("sadsa");
        }catch(error )
        {

        }

        return ;

        }else{
            setErrorMessage("Please upload the file");
        }

    }
    const handleFile = (e)=>{

        let file = (e.target.files[0]);

        if(file){
            if(!FileTypes.includes(file.type)){
                    setErrorMessage(FileTypes.join(',')+'<i> only these formats are accepted</i>');
                    return;
            }
            let fileSizeRes = checkIfSizeIsCorrect(file.size);
            if(!fileSizeRes?.status){
                setErrorMessage(fileSizeRes?.message);
                return;
            }

            setFile(file);
            setErrorMessage("");
            setPreviewDiv(true);

        }
        
    }


    return (
        <div className="fixed overflow-scroll flex justify-center items-center top-0 left-0 h-full w-full backdrop-blur-none z-10 backdrop-brightness-50">
            <div className="w-1/2 bg-[var(--color-light-black)] border-2 rounded-3xl">
                <div className="h-1/6 bg-red text-center p-6 text-bold border-b-2 relative">
                        Upload Profile photo
                        <div className="absolute bg-[var(--color-dark-black)] top-2 right-5 cursor-pointer p-1">
                            <IoCloseSharp  onClick={closeModal} />
                        </div>
                        
                </div>
                <div className="p-10 justify-center flex flex-col items-center">
                    {(previewDiv && File) && 
                        <div className="p-4 flex flex-col items-center">
                            <img className="w-25 h-28 mb-2" src = {URL.createObjectURL(file)} />
                           <p className="text-blue-400"> File Name:  {file.name }, File Size : {returnFileSize(file.size)}
                           </p>
                        </div>
                    }
                    
                    <label className=" cursor-pointer bg-[var(--color-dark-black)] p-4 rounded-lg  flex items-center">
                        <FaCloudUploadAlt className="text-red-400 mr-2" />
                            Upload File (jpg, png, avif)
                        <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.avif" onChange={handleFile} />
                    </label>
                    {errorMessage && <div className="text-red-600" >{errorMessage}</div>}
                    
                </div>
                <div className="h-1/6 bg-red text-center p-6 text-bold border-t-2 relative flex justify-end">
                        <button className="bg-gray-500 text-white px-5 py-2 rounded-lg mx-4" onClick={closeModal}>Cancel</button>
                        <button className="bg-blue-700 text-white px-5 py-2 rounded-lg" onClick={handleFileSave}>Save</button>
                </div>
            </div>
        </div>
    )
}


export default CoverPhotoModal;