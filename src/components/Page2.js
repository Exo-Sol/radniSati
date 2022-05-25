import React from "react";
import logo from "../Icons/logo.png";

const Page2 = () => {
  const styleBack = { backgroundColor: "black" };

  return (
    <div className="logoDiv">
      <div style={styleBack}>
        <img className="logo" src={logo} alt="" />
      </div>

      <div className="info">
        <h4 style={styleBack}>"Radni sati" app Version 1.0.0</h4>
        <h4 style={styleBack}>by Exo</h4>
      </div>
    </div>
  );
};

export default Page2;
