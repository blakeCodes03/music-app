import React from "react";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";

import { FiShuffle } from "react-icons/fi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

function PlayerControls({handleNextSong,handlePreviousSong}) {
  const [{ playerState, currentPlaying, trackUrl }, dispatch] = useStateProvider();

  const togglePlayPause = () => {    
    dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: !playerState });
    playerState ? trackUrl.pause() : trackUrl.play()  // using songurl (the same Audio instance from search.jsx to play/pause songs)
    console.log(currentPlaying);
  };
  return (
    <div className="flex items-center justify-center gap-10">
      <div className="text-black text-[1rem] hidden md:flex cursor-pointer">
        <FiShuffle />
      </div>
      <div className="  ml-36  flex md:ml-0 ">
        <div className="text-black mt-2 text-[2rem]  cursor-pointer ">
          <CgPlayTrackPrev 
            onClick={handlePreviousSong}
          />
        </div>

        <div
        style={{ backgroundImage: `url(${currentPlaying?.image})` }}
         className="text-black text-[2.5rem] mx-2 flex items-center rounded-full p-2">
         <div  className="bg-white rounded-full cursor-pointer" onClick={togglePlayPause}>

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
        <div className="text-black mt-2 text-[2rem] flex justify-between cursor-pointer">
          <CgPlayTrackNext 
            onClick={handleNextSong}
          />
        </div>
      </div>
      <div className="text-black text-[1rem] hidden md:flex cursor-pointer">
        <FiRepeat />
      </div>
    </div>
  );
}

export default PlayerControls;
