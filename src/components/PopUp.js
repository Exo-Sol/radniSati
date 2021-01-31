import React from "react";
import { useSpring, animated } from "react-spring";

const PopUp = ({ curJob }) => {
  const props = useSpring({
    opacity: 1,

    from: { opacity: 0.4 },
  });
  return (
    <animated.div className="popUp" style={props}>
      Spremljeno u {curJob.toUpperCase()}!
    </animated.div>
  );
};

export default PopUp;
