import { IoCloseSharp } from "react-icons/io5";
import Modal from "./Modal";
import { useState } from "react";

const CreatePostModal = ({closeModal}) => {
    const [submitting,setSubmitting] = useState(false);


    return (
        <Modal>
             <div className="h-1/6 bg-red text-center p-6 text-bold border-b-2 relative">
                Add Post
          <div className="absolute bg-[var(--color-dark-black)] top-2 right-5 cursor-pointer p-1">
            <IoCloseSharp onClick={closeModal} />
          </div>
        </div>
        <div className="p-10 justify-center flex flex-col items-center">
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
          >
            Save
          </button>
        </div>
        </Modal>
    );
}

export default CreatePostModal;