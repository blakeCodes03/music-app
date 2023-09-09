import React from "react";

function Volume() {
  return (
    <div className="hidden  text-black md:flex  content-center ml-24">
    <div className="w-[300px]">
    <input
      type="range"
      className="w-full slider h-1 text-black gradient-bg appearance-none rounded-full"
      defaultValue="10"
    />
    <div className=" flex items-center justify-between">
    <p className="text-gray-400 text-xs">02:10</p>
    <p className="text-gray-400 text-xs">03:56</p>
  </div>
  </div>
    </div>
  );
}

export default Volume;
