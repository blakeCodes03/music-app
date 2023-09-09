import React from "react";
import CurrentTrack from "./CurrentTrack";

import PlayerControls from "./PlayerControls";
import Volume from "./Volume";
  

function Footer() {

  return (
    <footer className=" hidden h-full bg-white  md:grid grid-cols-[1fr] md:grid-cols-[0.3fr,0.8fr,1.8fr] items-center justify-center px-4  ">
    <CurrentTrack/>
    <Volume/>
    <PlayerControls/>
    
    </footer>
    
  );
}

export default Footer;
