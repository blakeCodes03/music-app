import React from "react";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";

import { FiShuffle } from "react-icons/fi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

function PlayerControls() {
  const [{ playerState, currentPlaying }, dispatch] = useStateProvider();
  return (
    <div className="flex items-center justify-center gap-10">
      <div className="text-black text-[1rem] hidden md:flex">
        <FiShuffle />
      </div>
      <div className="  ml-36  flex md:ml-0 ">
        <div className="text-black mt-2 text-[2rem]  ">
          <CgPlayTrackPrev />
        </div>

        <div
        style={{ backgroundImage: `url(${currentPlaying?.image})` }}
         className="text-black text-[2.5rem] mx-2 flex items-center rounded-full p-2">
         <div className="bg-white rounded-full">

          {playerState ? (
            <BsFillPauseFill
              size={30}
              className="rounded-full text-black"
            />
          ) : (
            <BsFillPlayFill
              size={30}
              className="rounded-full  text-black"
            />
          )}
         </div>
        </div>
        <div className="text-black mt-2 text-[2rem] flex justify-between">
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
