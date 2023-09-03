import React from "react";
import { Link } from "react-router-dom";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import {
  AiOutlineFileText,
  AiOutlineFile,
  AiOutlineHome,
  AiOutlineVideoCamera,
  AiFillBackward,
  AiFillForward,
} from "react-icons/ai";
import { FiGrid, FiRepeat, FiShuffle, FiSearch } from "react-icons/fi";
import { BiChevronDownCircle, BiUser } from "react-icons/bi";

function SmallScreenNav() {
    const [{ currentPage }, dispatch] = useStateProvider();
    function changeCurrentScreen (selectedScreen) {
          dispatch({ type: reducerCases.SET_CURRENT_PAGE, currentPage: selectedScreen });
          
        };
  return (
    <div className="flex justify-between  gradient-bg text-black p-2">
      <Link to="/">
        <div onClick={() => {changeCurrentScreen(1)}} className= {` flex flex-col ${currentPage === 1 ? "text-[#18d860]" : "text-[#838383] " }`} >
          <AiOutlineHome size={30} />
          <h2>Home</h2>
        </div>
      </Link>
      <Link to="/search">
        <div onClick={() => {changeCurrentScreen(2)}} className= {` flex flex-col ${currentPage === 2 ? "text-[#18d860]" : "text-[#838383] " }`}>
          <FiSearch  size={30} />
          <h2>Search</h2>
        </div>
      </Link>
      <Link to="/library">
        <div onClick={() => {changeCurrentScreen(3)}} className= {` flex flex-col ${currentPage === 3 ? "text-[#18d860]" : "text-[#838383] " }`}>
          <FiGrid  size={30} />
          <h2>Library</h2>
        </div>
      </Link>
    </div>
  );
}

export default SmallScreenNav;
