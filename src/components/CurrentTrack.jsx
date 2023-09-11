import React from "react";
import { useStateProvider } from "../utils/StateProvider";

function CurrentTrack() {
  const [{ currentPlaying }] = useStateProvider();

  return (
    <div >

      {currentPlaying &&  (
        <div className="flex items-center gap-4 max-w-[12rem] truncate p-2">
        <div className=" flex w-[50px] h-full md:hidden">
          <img
            className=" rounded-[25px] shadow-md"
            src={currentPlaying.image}
            alt={currentPlaying.name + ` image`}
          />
        </div>
        <div className="flex flex-col w-[13rem] font-bold truncate md:max-w-none ">
          <h4 className="text-black md:text-2xl">{currentPlaying.name}</h4>
          <h6 className="text-[#b3b3b3]">{currentPlaying.artists}</h6>
        </div>
      </div>
        )}
    </div>
    
  );
}

export default CurrentTrack;
