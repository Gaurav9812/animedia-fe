import { useSelector } from "react-redux";

import LeftCard from "./LeftCard";
import Skills from "./Skills";

const LeftSidebar = () => {
  const user = useSelector((store) => {
    return store.user.user;
  });

  return (
    <div className="mx-4 ">
      <LeftCard />
      <Skills />
    </div>
  );
};

export default LeftSidebar;
