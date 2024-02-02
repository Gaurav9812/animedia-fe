const Modal = ({children ,})=>{
    return (
        <div className="fixed overflow-scroll flex justify-center items-center top-0 left-0 h-full w-full backdrop-blur-none z-10 backdrop-brightness-50">
        <div className="w-1/2 absolute bg-[var(--color-light-black)] border-2 rounded-3xl">
            {children}
        </div>
        </div>
        );
}


export default Modal;