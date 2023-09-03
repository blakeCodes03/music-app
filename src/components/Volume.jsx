import React from "react";

function Volume() {
  return (
    <div className="hidden  md:flex  content-center pr-4 ">
      <input
        type="range"
        
        min={0}
        max={100}
        className="w-[10rem] rounded-lg h-4 text-black"
      />
    </div>
  );
}

export default Volume;
