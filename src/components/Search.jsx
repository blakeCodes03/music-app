import React from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import SmallScreenNav from "./SmallScreenNav";

function Search() {
  return (
    <div className=" max-h-screen max-w-full overflow-hidden grid grid-rows-[80vh,10vh,10vh] md:grid-rows-[85vh,15vh] relative">
      <div className="gradient-bg grid  md:grid-cols-[5vw,95vw] h-full w-full">
        <Sidebar />
        <div className="w-full h-full overflow-auto">
          <div className="max-w-md mx-auto flex mt-10 p-4">
            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                id="search"
                placeholder="Search something.."
              />
            </div>
            <div>
              <button
                type="submit"
                className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full z-10 lg:ml-[230px]">
        <Footer />
      </div>
      <div className="block md:hidden">
        <SmallScreenNav />
      </div>
    </div>
  );
}

export default Search;
