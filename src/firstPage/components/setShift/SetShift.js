import React, { useState, useEffect } from "react";
import HourList from "./HourList";
import formatDate from "./formatDate";
import "../../styles/mainStyle.css";
import PopUp from "../PopUp";

const SetShift = ({ catchData, curJob, catchD }) => {
  const [clickCount, setClickCount] = useState(0);

  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  const [selectedDay, setSelectedDay] = useState(formatDate());
  ///////////////////////////////////////////////////////////////
  const [workHours, setWorkHours] = useState(undefined);
  //////////////////////////////////////////////////////////////
  const [selectedTimes, setSelectedTimes] = useState({
    startTime: null,
    endTime: null,
  });
  //////////////////////////////////////////////////////////////
  const [popUpState, setPopUpState] = useState(false);

  ////////////////////////ANIMATION///////////////////////////////////////

  ///////////////////////////////////////////////////////////////

  // settin the displayed date <_> clicking day back or foward is hooked with useEffect to change state
  //witch is date displayed visualy

  useEffect(() => {
    setSelectedDay(formatDate(clickCount));
  }, [clickCount]);

  const dayFoward = () => {
    setClickCount((count) => count + 1);
  };

  const dayBack = () => {
    setClickCount((count) => count - 1);
  };

  /////////////JSX variables/////////////////////////////////

  const backArrow = (
    <span className="material-icons timeArrow" onClick={dayBack}>
      arrow_back_ios
    </span>
  );

  const fwdArrow = (
    <span className="material-icons timeArrow" onClick={dayFoward}>
      arrow_forward_ios
    </span>
  );
  /////////////////////////////////////////////////////////
  const clickHour = (e) => {
    if (!selectedTimes.startTime) {
      setSelectedTimes({ ...selectedTimes, startTime: e.target.textContent });
    } else if (!selectedTimes.endTime) {
      // make unable to select end time lower than start time
      if (parseInt(e.target.textContent) > parseInt(selectedTimes.startTime)) {
        setSelectedTimes({ ...selectedTimes, endTime: e.target.textContent });
      }
    }
  };

  /////////////////////////////////////////////////////////////////////
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (selectedTimes.endTime !== null) {
        let derivedWorkHours = selectedTimes.endTime - selectedTimes.startTime;
        setWorkHours(derivedWorkHours);
      }
    }
    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [selectedTimes.endTime]);

  ////////////////////////////////////////////////////////////////////

  const hoursChange = (e) => {
    setWorkHours(e.target.value);
  };

  //////////////////////////////////
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      workHours > 24 ||
      workHours < 0 ||
      workHours === "" ||
      workHours === undefined
    ) {
      alert("Netocno uneseni sati");
    } else if (workHours !== 0) {
      catchData(selectedDay, workHours, selectedTimes);

      setSelectedTimes({
        startTime: null,
        endTime: null,
      });
      /////////////////////////
      setPopUpState(true);
      setTimeout(() => {
        setPopUpState(false);
      }, 800);
    }
  };
  /////////////////////////////////////////////
  const clickDelete = () => {
    setWorkHours("");
    setSelectedTimes({
      startTime: null,
      endTime: null,
    });
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <div className="popUpWrapper">
        {popUpState ? <PopUp curJob={curJob} /> : <div></div>}
      </div>
      <div className="dateNav">
        {backArrow}

        <span id="animateDate">{`${selectedDay.dayName}, ${selectedDay.day}/${selectedDay.month}`}</span>
        {fwdArrow}
      </div>
      <div className="flexWrapNav">
        <input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          className="inputField"
          name="workHours"
          placeholder="shitf duration"
          value={workHours}
          onChange={hoursChange}
          style={{ display: "block" }}
          autoFocus={true}
          onKeyDown={(evt) =>
            ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()
          }
        />
        <br />
        <div className="flexWrapButtons">
          <input
            type="submit"
            onClick={onSubmit}
            value="Save"
            id="save"
            className="buttons"
          />

          <button id="delete" onClick={clickDelete} className="buttons">
            Del
          </button>
        </div>
        <div className="hourPad">
          <HourList
            clickHour={clickHour}
            selectedTimes={selectedTimes}
            catchD={catchD}
          />
        </div>
      </div>
    </>
  );
};

export default SetShift;
