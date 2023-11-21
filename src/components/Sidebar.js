import { render } from "@testing-library/react";
import { SIDE_BAR_IMG } from "../helpers/helper";

const Sidebar=()=>{

    return (<>
      <img src={SIDE_BAR_IMG} className="w-full h-full" /> 
      </>);
}

export default Sidebar;