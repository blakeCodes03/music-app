import React from "react";
import { Link } from "react-router-dom";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import {
  
  AiOutlineHome,
  
} from "react-icons/ai";
import { FiGrid, FiRepeat, FiShuffle } from "react-icons/fi";
import { BiChevronDownCircle, BiUser } from "react-icons/bi";
import logo from "../assets/Logo.png";

function Sidebar() {
    const [{ currentPage, currentPlaying }, dispatch] = useStateProvider();
    function changeCurrentScreen (selectedScreen) {
          dispatch({ type: reducerCases.SET_CURRENT_PAGE, currentPage: selectedScreen });
          
        };
    
  return (
    <aside className="hidden relative md:block min-h-screen z-10 bg-white w-[230px] pl-5">
      <div className="flex">
        <Link to="/">
          <img
            src={logo}
            alt="disify logo"
            className=" justify-center w-[150px]"
          />
        </Link>
      </div>
      <div className=" w-full mt-10 ">
        <Link to="/">
          <div onClick={() => {changeCurrentScreen(1)}} className= {` flex items-center mb-4  ${currentPage === 1 ? "text-[#1d4ed8]" : "text-[#838383] " }`}>
            <AiOutlineHome
              size={20}
              className=" mr-2 font-bold"
            />
            <h1 className="font-bold">Home</h1>
          </div>
        </Link>
        <Link to="/search">
          <div onClick={() => {changeCurrentScreen(2)}} className= {` flex items-center mb-4  ${currentPage === 2 ? "text-[#1d4ed8]" : "text-[#838383] " }`}>
            <BiUser size={20} className=" mr-3 font-bold" />
            <h1 className="font-bold">Search</h1>
          </div>
        </Link>
        <Link to="/library">
          <div onClick={() => {changeCurrentScreen(3)}} className= {` flex items-center mb-4  ${currentPage === 3 ? "text-[#1d4ed8]" : "text-[#838383] " }`}>
            <FiGrid size={20} className=" mr-3 font-bold" />
            <h1 className="font-bold">Library</h1>
          </div>
        </Link>
      </div>
      {currentPlaying &&  
      
      <div className=" absolute bottom-0 w-full h-[13rem] px-4 left-0">
        <img src={currentPlaying.image}/>
      </div>
      }
    </aside>
  );
}

export default Sidebar;
