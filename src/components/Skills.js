import { useDispatch, useSelector } from "react-redux";
import store from "../utils/store";
import { useState } from "react";
import SkillsModal from "./SkillsModal";
import { FaPen, FaPencilAlt } from "react-icons/fa";

const Skills = () => {
  const skills = useSelector((store) => {
    return store.user.user?.skills;
  });
  const bearerToken = useSelector((store) => {
    return store.user.bearerToken;
  });
  const dispatch = useDispatch();

  const [showSkillsModal,setShowSkillsModal] = useState(false);

  const toggleModal = ()=>{
    setShowSkillsModal(!showSkillsModal);
  }
  return (
    <div className="my-2">
    {showSkillsModal && <SkillsModal currentSkills={skills} closeModal={toggleModal} />}
      <p className="flex items-center text-lg mb-2 font-bold "> Skills<FaPencilAlt onClick={toggleModal} className="text-[var(--font-color-primary)] text-sm ml-2"  />  </p>
      {skills instanceof Array && skills.length == 0 ? (
        <button onClick={toggleModal} className="bg-[var(--color-light-black)] rounded-lg p-2 ">Add Skills</button>
      ) : (
        <div className="grid grid-cols-3">
           {skills?.map((item,index,array)=>{
                return <button className="p-1 m-1  font-semibold rounded-xl bg-[var(--color-light-black)] hover:bg-[var(--color-light-blue)]" key={index}>{item}</button>;
           })}
           </div>
      )}
    </div>
  );
};

export default Skills;
