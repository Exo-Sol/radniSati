import React, { useState } from "react";
import { useSpring, animated, useTransition } from "react-spring";
import "../../styles/mainStyle.css";

const HList = ({ clickHour, selectedTimes, catchD }) => {
  // create an array of jobe time stamps, for now
  const arr = [];
  ////////////////////////
  const [displaySelector, changeDisplySelector] = useState(false);

  /////////////////////////////ANIMATION///////////////////////////////////////
  const props = useSpring({
    config: { duration: 1250 },
    opacity: 1,
    from: { opacity: 0 },
  });

  const transitions = useTransition(displaySelector, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  ///////////////////////////////////////////////////////////////

  const startStyle = {
    backgroundColor: "#5de6da",
    color: "black",
    border: "none",
  };

  const endStyle = {
    backgroundColor: "#ee3968",
    color: "black",
    border: "none",
  };

  const resetSyle = {
    border: "gray 1px solid",
    color: "black",
    backgroundColor: "azure",
  };

  for (let i = 6; i <= 24; i++) {
    if (i === parseInt(selectedTimes.startTime)) {
      arr.push(
        <h1
          onClick={clickHour}
          className="numberList"
          style={startStyle}
          key={i}
        >
          {i}
        </h1>
      );
    } else if (i === parseInt(selectedTimes.endTime)) {
      arr.push(
        <h1 onClick={clickHour} className="numberList" style={endStyle} key={i}>
          {i}
        </h1>
      );
    } else {
      arr.push(
        <h1
          onClick={clickHour}
          className="numberList"
          style={resetSyle}
          key={i}
        >
          {i}
        </h1>
      );
    }
  }

  const hClick = (e) => {
    changeDisplySelector(e);
    catchD(e);
  };

  return displaySelector ? (
    transitions.map(
      ({ item, key, props }) =>
        item && (
          <animated.div className="hourSelect" key={key} style={props}>
            {arr}
            <span
              className="material-icons numberList hButton"
              onClick={() => hClick(false)}
              style={resetSyle}
            >
              eject
            </span>
          </animated.div>
        )
    )
  ) : (
    <span
      className="material-icons numberList hButton"
      onClick={() => hClick(true)}
      style={resetSyle}
    >
      query_builder
    </span>
  );
};

export default HList;
