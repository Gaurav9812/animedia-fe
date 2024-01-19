import { useSelector } from "react-redux";
import ThreeVerticalDot from "../assets/img/svgs/ThreeVerticalDot";
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
