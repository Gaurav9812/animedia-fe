import { useSelector } from "react-redux";

import LeftCard from "./LeftCard";

const LeftSidebar = () => {
  const user = useSelector((store) => {
    return store.user.user;
  });

  return (
    <div className="mx-4 ">
      <LeftCard />
    </div>
  );
};

export default LeftSidebar;
