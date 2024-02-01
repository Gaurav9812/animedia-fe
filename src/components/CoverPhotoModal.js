import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import {
  FileTypes,
  checkIfSizeIsCorrect,
  returnFileSize,
} from "../helpers/FileHelper";
import axios from "axios";
import {
  URL_GET_USER,
  URL_LOGIN,
  URL_PROFILE_UPLOAD_PHOTO,
} from "../helpers/UrlHelper";
import { useDispatch, useSelector } from "react-redux";
import store from "../utils/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../utils/userSlice";
import { resolveFields } from "../helpers/helper";

const CoverPhotoModal = ({ fieldToUpdate,closeModal }) => {
  const bearerToken = useSelector((store) => {
    return store.user.bearerToken;
  });
  
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [previewDiv, setPreviewDiv] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting,setSubmitting] = useState(false);

  const handleFileSave = async () => {
    
    if (file && !submitting) {
        setSubmitting(true);
      let formData = new FormData();
      formData.append("cover_photo", file);
      formData.append("field", fieldToUpdate);
      formData.append("fileName", file.name);
      try {
        let response = await axios({
          url: URL_PROFILE_UPLOAD_PHOTO,
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
          data: formData,
          method: "POST",
        });
        if (response.data.status != 200) {
          toast.error(response.data.message);
        }else{
          dispatch(updateUser({user:response.data.user}));
          setSubmitting(false);
          closeModal();
        }        
      } catch (error) {}

      return;
    } else {
      setErrorMessage("Please upload the file");
    }
  };
  const handleFile = (e) => {
    let file = e.target.files[0];

    if (file) {
      if (!FileTypes.includes(file.type)) {
        setErrorMessage(
          FileTypes.join(",") + "<i> only these formats are accepted</i>"
        );
        return;
      }
      let fileSizeRes = checkIfSizeIsCorrect(file.size);
      if (!fileSizeRes?.status) {
        setErrorMessage(fileSizeRes?.message);
        return;
      }

      setFile(file);
      setErrorMessage("");
      setPreviewDiv(true);
    }
  };

  return (
    <div className="fixed overflow-scroll flex justify-center items-center top-0 left-0 h-full w-full backdrop-blur-none z-10 backdrop-brightness-50">
      <div className="w-1/2 absolute bg-[var(--color-light-black)] border-2 rounded-3xl">
        <div className="h-1/6 bg-red text-center p-6 text-bold border-b-2 relative">
          Upload {resolveFields(fieldToUpdate)}
          <div className="absolute bg-[var(--color-dark-black)] top-2 right-5 cursor-pointer p-1">
            <IoCloseSharp onClick={closeModal} />
          </div>
        </div>
        <div className="p-10 justify-center flex flex-col items-center">
          {previewDiv && File && (
            <div className="p-4 flex flex-col items-center">
              <img className="w-25 h-28 mb-2" src={URL.createObjectURL(file)} />
              <p className="text-blue-400">
                {" "}
                File Name: {file.name}, File Size : {returnFileSize(file.size)}
              </p>
            </div>
          )}

          <label className=" cursor-pointer bg-[var(--color-dark-black)] p-4 rounded-lg  flex items-center">
            <FaCloudUploadAlt className="text-red-400 mr-2" />
            Upload File (jpg, png, avif)
            <input
              type="file"
              className="hidden"
              accept=".jpg,.jpeg,.png,.avif"
              onChange={handleFile}
            />
          </label>
          {errorMessage && <div className="text-red-600">{errorMessage}</div>}
        </div>
        <div className="h-1/6 bg-red text-center p-6 text-bold border-t-2 relative flex justify-end">
          <button
            className="bg-gray-500 text-white px-5 py-2 rounded-lg mx-4"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-blue-700 text-white px-5 py-2 rounded-lg"
            onClick={handleFileSave}
            disabled={submitting}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoverPhotoModal;
