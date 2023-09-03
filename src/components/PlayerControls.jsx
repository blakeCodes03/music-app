import React from "react";

import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";

import { FiShuffle } from "react-icons/fi";
import { BsFillPlayFill } from "react-icons/bs";

function PlayerControls() {
  return (
    <div className="flex items-center justify-center gap-8">
      <div className="text-black text-[1rem] hidden md:flex">
        <FiShuffle />
      </div>
      <div className="  ml-36 flex md:ml-0  ">
      <div className="text-black text-[2rem]  ">
        <CgPlayTrackPrev />
      </div>
      <div className=" text-black text-[2.5rem]  justify-between">
        <BsFillPlayFill
          size={30}
          className="rounded-full bg-white text-black"
        />
      </div>
      {/* <div className="text-black text-[2rem]">
        {playerState ? (
          <BsFillPauseFill size={30} className="rounded-full bg-white text-black"/>
        ) : (
          <BsFillPlayFill size={30} className="rounded-full bg-white text-black"/>
        )}
      </div> */}
      <div className="text-black text-[2rem] flex justify-between">
        <CgPlayTrackNext />
      </div>
      </div>
      <div className="text-black text-[1rem] hidden md:flex">
        <FiRepeat />
      </div>
    </div>
  );
}

export default PlayerControls;
