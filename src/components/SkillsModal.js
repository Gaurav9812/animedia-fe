import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { skills } from "../helpers/helper";
import axios from "axios";
import { URL_ADD_UPDATE_SKILLS } from "../helpers/UrlHelper";
import { toast } from "react-toastify";
import { updateUser } from "../utils/userSlice";
/**
 * @param {Array} currentSkills
 */
const SkillsModal = ({ currentSkills, closeModal }) => {
  const bearerToken = useSelector((store) => {
    return store.user.bearerToken;
  });

  const [updatededSkills, setUpdatedSkills] = useState(currentSkills);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);

  const submitSkills = async () => {
    try {
      setSubmitting(true);
      let response = await axios({
        url: URL_ADD_UPDATE_SKILLS,
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        data: { skills: updatededSkills },
        method: "POST",
      });
      if (response.data.status != 200) {
        toast.error(response.data.message);
      }else{
        dispatch(updateUser({user:response.data.user}));
        toast.success(response.data.message);
        setSubmitting(false);
        closeModal()
        
      }        
    } catch (err) {}
  };

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };
  /**
   *
   *
   */
  const handleSkillUpdate = (skill) => {
    let toRemove = updatededSkills.indexOf(skill);
    if (toRemove == -1) {
      setUpdatedSkills([...updatededSkills, skill]);
    } else {
      setUpdatedSkills(
        updatededSkills.filter((updateSkill, index, arr) => {
          return toRemove != index;
        })
      );
    }
  };

  return (
    <div className="fixed overflow-scroll flex justify-center  top-0 h-full left-0 w-full backdrop-blur-none z-30 backdrop-brightness-50">
      <div className="w-2/4 absolute  bg-[var(--color-light-black)] border-2 rounded-3xl top-10">
        <div className="h-1/6 bg-red text-center p-6 text-bold border-b-2 relative">
          Add/Update Skills
          <div className="absolute bg-[var(--color-dark-black)] top-2 right-5 cursor-pointer p-1">
            <IoCloseSharp onClick={closeModal} />
          </div>
        </div>
        <div>
          <div className=" p-3">
            <input
              type="search"
              value={searchText}
              onChange={handleSearchText}
              className="w-full p-1 bg-[var(--color-dark-black)] px-4"
              placeholder="search"
            />
          </div>
          <div className="mb-1 flex justify-center flex-wrap ">
            {skills.map((skill, index, arr) => {
              if (skill.toLowerCase().includes(searchText.toLowerCase())) {
                return (
                  <button
                    key={index}
                    className={
                      "hover:bg-[var(--color-light-blue)] text-sm cursor-pointer  rounded-lg py-1 px-2 m-1 " +
                      (updatededSkills.indexOf(skill) == -1
                        ? "bg-[var(--color-dark-black)]"
                        : "bg-[var(--font-color-primary)]")
                    }
                    onClick={() => handleSkillUpdate(skill)}
                  >
                    {skill}
                  </button>
                );
              }
            })}
          </div>
        </div>
        <div className="h-1/6 bg-red text-center p-3 text-bold border-t-2 relative flex justify-end">
          <button
            className="bg-gray-500 text-white px-5 py-2 rounded-lg mx-4"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-blue-700 text-white px-5 py-2 rounded-lg"
            disabled={submitting}
            onClick={submitSkills}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsModal;
