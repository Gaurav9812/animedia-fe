import { IoCloseSharp } from "react-icons/io5";
import Modal from "./Modal";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FileTypes, checkIfSizeIsCorrect, returnFileSize } from "../helpers/FileHelper";
import { toast } from "react-toastify";
import { updateUser } from "../utils/userSlice";
import axios from "axios";
import { URL_ADD_POST } from "../helpers/UrlHelper";

const CreatePostModal = ({ closeModal }) => {
  const [submitting, setSubmitting] = useState(false);
  const [content,setContent] = useState("");
  const bearerToken = useSelector((store) => {
    return store.user.bearerToken;
  });
  
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [previewDiv, setPreviewDiv] = useState(false);

  const handleContentChange=(e)=>{
    if(!submitting){
      setContent(e.target.value);
    }
    
  }

  const handleFile = (e) => {
    if(submitting){
        e.preventDefault();
        return;
    }
    let file = e.target.files[0];

    if (file) {
      if (!FileTypes.includes(file.type)) {
        toast.error(FileTypes.join(",") + "<i> only these formats are accepted</i>")
        return;
      }
      let fileSizeRes = checkIfSizeIsCorrect(file.size);
      if (!fileSizeRes?.status) {
        toast.error(fileSizeRes?.message);
        return;
      }

      setFile(file);
      setPreviewDiv(true);
    }
  };

  const handlePostSave = async () => {
    
    if (file && !submitting) {
        setSubmitting(true);
      let formData = new FormData();
      formData.append("post", file);
      formData.append("content", content);
      try {
        let response = await axios({
          url: URL_ADD_POST,
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
      toast.error("Please upload the file");
    }
  };

  return (
    <Modal>
      <div className="h-1/6 bg-red text-center p-6 text-bold border-b-2 relative">
        Add Post
        <div className="absolute bg-[var(--color-dark-black)] top-2 right-5 cursor-pointer p-1">
          <IoCloseSharp onClick={closeModal} />
        </div>
      </div>
      <div className="p-5 justify-center flex flex-col items-center">
        <textarea
          className="w-full bg-[var(--color-dark-black)] rounded-xl resize-none p-2 text-xl"
          placeholder="whats in your mind"
          value={content}
          disabled={submitting}
          onChange={handleContentChange}
        />
         {previewDiv && File && (
            <div className="p-4 flex flex-col items-center">
              <img className="w-25 h-28 mb-2" src={URL.createObjectURL(file)} />
              <p className="text-blue-400">
                {" "}
                File Name: {file.name}, File Size : {returnFileSize(file.size)}
              </p>
            </div>
          )}

        <label className="mt-2 cursor-pointer bg-[var(--color-dark-black)] p-4 rounded-lg  flex items-center">
          <FaCloudUploadAlt className="text-red-400 mr-2" />
          Upload File (jpg, png, avif)
          <input
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png,.avif"
            disabled={submitting}
            onChange={handleFile}
          />
        </label>
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
          disabled={submitting}
          onClick={handlePostSave}
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default CreatePostModal;
