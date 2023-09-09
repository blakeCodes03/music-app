import React from "react";
import { Link } from "react-router-dom";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import { AiOutlineHome } from "react-icons/ai";
import { FiGrid, FiSearch } from "react-icons/fi";

function SmallScreenNav() {
  const [{ currentPage }, dispatch] = useStateProvider();
  function changeCurrentScreen(selectedScreen) {
    dispatch({
      type: reducerCases.SET_CURRENT_PAGE,
      currentPage: selectedScreen,
    });
  }
  return (
    <div className="flex justify-between h-full w-full gradient-bg text-black pt-5 px-2">
      <Link to="/">
        <div
          onClick={() => {
            changeCurrentScreen(1);
          }}
          className={` flex flex-col ${
            currentPage === 1 ? "text-[#1d4ed8]" : "text-[#838383] "
          }`}
        >
          <AiOutlineHome className="ml-1" size={30} />
          <h2 className=" font-extrabold">Home</h2>
        </div>
      </Link>
      <Link to="/search">
        <div
          onClick={() => {
            changeCurrentScreen(2);
          }}
          className={` flex flex-col ${
            currentPage === 2 ? "text-[#1d4ed8]" : "text-[#838383] "
          }`}
        >
          <FiSearch className="ml-1" size={30} />
          <h2 className=" font-extrabold">Search</h2>
        </div>
      </Link>
      <Link to="/library">
        <div
          onClick={() => {
            changeCurrentScreen(3);
          }}
          className={` flex flex-col ${
            currentPage === 3 ? "text-[#1d4ed8]" : "text-[#838383] "
          }`}
        >
          <FiGrid className="ml-1" size={30} />
          <h2 className=" font-extrabold">Library</h2>
        </div>
      </Link>
    </div>
  );
}

export default SmallScreenNav;
