import React from "react";
import { Bars } from "react-loader-spinner";

function Loader() {
  return (
    <div className=" flex justify-center items-center">
      <div className="  mt-10">
        <Bars
          height="80"
          width="80"
          color="#1d4ed8"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
}

export default Loader;
