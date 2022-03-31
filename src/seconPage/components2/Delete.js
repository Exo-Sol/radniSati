import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

const Delete = ({ relevantShifts, onAddedTime }) => {
  const [clickedDel, setClickedDel] = useState(false);
  const [deleteInput, setDeleteInput] = useState(undefined);
  const [forSaving, setForSaving] = useState([]);
  const dateObj = new Date();

  useEffect(() => {
    if (forSaving && forSaving.length > 0) {
      let objForSaving = JSON.stringify(forSaving);
      localStorage.removeItem(dateObj.getFullYear());
      localStorage.setItem(dateObj.getFullYear(), objForSaving);
      onAddedTime();
      setDeleteInput(undefined);
    } else if (forSaving === undefined) {
      localStorage.removeItem(dateObj.getFullYear());
      onAddedTime();
    }
  }, [forSaving]);

  const firstClickDel = () => {
    setForSaving([]);
    console.log(relevantShifts.length);
    console.log(parseInt(deleteInput));
    if (parseInt(deleteInput) <= relevantShifts.length) {
      // delete that data, update page
      delSelectedData(relevantShifts[parseInt(deleteInput) - 1]);

      console.log("tu smo maci");
    }
    setClickedDel(!clickedDel);
  };

  const numInput = (e) => {
    setDeleteInput(e.target.value);
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////
  const contentProps = useSpring({
    opacity: clickedDel ? 1 : 0,
    marginLeft: clickedDel ? 0 : -300,
  });
  ///////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////

  const delSelectedData = (data) => {
    console.log(data);
    const dateObj = new Date();
    const retriveArr = JSON.parse(localStorage.getItem(dateObj.getFullYear()));
    console.log(retriveArr);
    if (Array.isArray(retriveArr) && retriveArr.length > 1) {
      retriveArr.map((ele, ind) => {
        if (JSON.stringify(ele) !== JSON.stringify(data)) {
          console.log("hit that");
          setForSaving((forSaving) => [...forSaving, ele]);
        }
      });
    } else {
      console.log("a moramo bit ovdi");
      setForSaving(undefined);

      setDeleteInput(undefined);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="deleteDiv">
      <span
        className="material-icons icons"
        id="deleteIcon"
        onClick={firstClickDel}
      >
        delete
      </span>
      {clickedDel && (
        <animated.input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          className="inputField"
          id="delPlaceholder"
          name="workHours"
          placeholder="num?"
          value={deleteInput}
          onChange={numInput}
          style={contentProps}
          autoFocus={true}
          onKeyDown={(evt) =>
            ["e", "E", "+", "-", "0"].includes(evt.key) && evt.preventDefault()
          }
        />
      )}
    </div>
  );
};

export default Delete;
