import React from "react";
import { useSpring, animated } from "react-spring";

const PopUp = () => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  return (
    <animated.div className="popUp" style={props}>
      Spremljeno!
    </animated.div>
  );
};

export default PopUp;
