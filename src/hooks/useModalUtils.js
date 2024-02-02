import { useState } from "react";


const useModalUtils = ()=>{
    const [showModal, setShowModal] = useState(false);

    const toggleModal = ()=>{
        setShowModal(!showModal);
    }

    return [showModal,toggleModal];
}

export default useModalUtils;