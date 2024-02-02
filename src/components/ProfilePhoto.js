const ProfilePhoto =({profilePhoto,name})=>{

    return (
        <>
        {profilePhoto ? (
            <img
              src={profilePhoto}
              className="object-center object-cover"
            />
          ) : (
            <div className="text-5xl w-full h-full text-center flex items-center justify-center bg-slate-300 text-[#000000ee]">
             <p> {name?.firstName.charAt(0)}</p>
            </div>
          )}
          </>
    )
}

export default ProfilePhoto;