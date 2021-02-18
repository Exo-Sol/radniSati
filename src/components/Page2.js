import React from "react";
import logo from "../Icons/logo.png";

const Page2 = () => {
  return (
    <div className="logoDiv">
      <div>
        <img className="logo" src={logo} alt="" />
      </div>

      <div className="info">
        <h4>"Radni sati" app Version 1.0.0</h4>
        <h4>by Exo</h4>
      </div>
    </div>
  );
};

export default Page2;
