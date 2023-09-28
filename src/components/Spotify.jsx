import React from "react";
import Sidebar from "./Sidebar";
import Body from "./Body";
import Footer from "./Footer";
import SmallScreenNav from "./SmallScreenNav";
import SmScreenFooter from "./SmScreenFooter";

function Spotify() {
  return (
    <div className=" max-h-screen max-w-full overflow-hidden grid grid-rows-[80vh,10vh,10vh] md:grid-rows-[85vh,15vh] relative">
      <div className="gradient-bg grid md:grid-cols-[5vw,95vw] ">
        <Sidebar />
        <div className="w-full h-full overflow-auto">
          <Body />
        </div>
      </div>
      <div className="">
        <div className=" z-10 h-full w-full bg-white md:ml-[190px]  md:p-4">
          <Footer />
          <SmScreenFooter />
        </div>
        <div className="h-full w-full block md:hidden">
          <SmallScreenNav />
        </div>
      </div>
    </div>
  );
}

export default Spotify;
