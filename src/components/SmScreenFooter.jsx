import React from "react";
import CurrentTrack from "./CurrentTrack";
import PlayerControls from "./PlayerControls";

function SmScreenFooter({handleNextSong,handlePreviousSong}) {
  return (
    <footer className="h-full bg-white relative md:hidden">
      <div >
        <div>
          <CurrentTrack />
        </div>
        <div className="absolute right-0 top-5 md:grid">
          <PlayerControls 
            handleNextSong={handleNextSong}
            handlePreviousSong={handlePreviousSong}
          />          
        </div>
      </div>
     </footer>
  );
}

export default SmScreenFooter;
