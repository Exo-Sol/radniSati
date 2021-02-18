import React, { useState, useEffect } from "react";
import MainDiv from "./components2/MainDiv";
import Delete from "./components2/Delete";
import NukeStorage from "./components2/NukeStorage";
import "./styles2/styles.css";

const SecondPage = ({ change, onAddedTime }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  /////////////////////////////getting JObs
  /////////////////////////////////////////////////////////

  const currentJob = localStorage.getItem("currentJob");
  //////////////////////////////
  /////////Need to set cur job so it changes before usefeect for getting relevan array

  //////////////////////////////////////////////////////////////////
  const dateObj = new Date();
  const [curJob, setCurJob] = useState(currentJob);
  const [linkEffect, setLinkEffect] = useState(false);
  const [month, setMonth] = useState(dateObj.getMonth() + 1);
  const [relevantShifts, setRelevantShifts] = useState([]);

  ///////////////////////////////////////////////////////////////////
  const retriveArr = JSON.parse(localStorage.getItem(dateObj.getFullYear()));

  //////////////////////////////////////////////////////////////////
  useEffect(() => {
    setCurJob(() => currentJob);
    setRelevantShifts(() => []);
    console.log("masta");
    setLinkEffect(!linkEffect);
  }, [change]);
  ////////////////////////////////////////////////////////////
  const monthsWorked = new Set();

  //////////////// populate dropdown with avaliable months /////////////////////////////////////////
  if (retriveArr) {
    if (Array.isArray(retriveArr)) {
      retriveArr.map((ele, ind) => {
        if (ele.job === currentJob) {
          monthsWorked.add(ele.month);
        }
      });
    } else {
      monthsWorked.add(retriveArr.month);
    }
  }
  /////////////////////////////
  const newMonthArr = [];

  monthsWorked.forEach((ele) => newMonthArr.push(parseInt(ele)));

  console.log(monthsWorked);

  newMonthArr.sort((a, b) => a - b);

  console.log(newMonthArr);
  ///////////////////////////////udating relevant data when month change or user inputs something on first page/////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (Array.isArray(retriveArr)) {
      retriveArr.map((ele, ind) => {
        if (ele.job === curJob && ele.month === month) {
          setRelevantShifts((relevantShifts) => [...relevantShifts, ele]);
        }
      });
    } else if (retriveArr) {
      if (retriveArr.job === curJob && retriveArr.month === month) {
        setRelevantShifts([retriveArr]);
      }
    }
  }, [month]);

  useEffect(() => {
    if (Array.isArray(retriveArr)) {
      retriveArr.map((ele, ind) => {
        if (ele.job === curJob && ele.month === month) {
          setRelevantShifts((relevantShifts) => [...relevantShifts, ele]);
          console.log(curJob);
        }
      });
    } else if (retriveArr) {
      if (retriveArr.job === curJob && retriveArr.month === month) {
        setRelevantShifts([retriveArr]);
        console.log(curJob);
      }
    } else {
      setRelevantShifts([]);
    }
    console.log("kokikoki");
  }, [linkEffect]);

  //////////////////////////////////////////////////////////////////////////////////////////////
  const dropDown = () => {
    setToggleDropdown(!toggleDropdown);
  };

  const setClickedMonth = (e) => {
    e.preventDefault(); // maybe
    setMonth(parseInt(e.target.innerText));
    if (month !== parseInt(e.target.innerText)) {
      setRelevantShifts([]);
    }
    setToggleDropdown(false);
  };

  return (
    <div>
      <div className="curJob">{curJob}</div>
      <ul className="monthWhole">
        <li className="material-icons icons" onClick={dropDown}>
          arrow_drop_down_circle <p id="dropMonths">Mjesec {month}</p>
        </li>
        {toggleDropdown &&
          newMonthArr.map((ele, ind) => (
            <li key={ind} className="monthList" onClick={setClickedMonth}>
              {ele}
            </li>
          ))}
      </ul>
      {!toggleDropdown && <MainDiv data={relevantShifts} />}
      <Delete relevantShifts={relevantShifts} onAddedTime={onAddedTime} />
      <NukeStorage onAddedTime={onAddedTime} />
    </div>
  );
};

export default SecondPage;
