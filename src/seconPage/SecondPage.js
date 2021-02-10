import React, { useState, useEffect } from "react";
import MainDiv from "./components2/MainDiv";
import "./styles2/styles.css";

const SecondPage = ({ change }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  /////////////////////////////getting JObs
  /////////////////////////////////////////////////////////

  const currentJob = localStorage.getItem("currentJob");

  //////////////////////////////////////////////////////////////////
  const dateObj = new Date();
  const [curJob, setCurJob] = useState(currentJob);
  const [month, setMonth] = useState(dateObj.getMonth() + 1);
  const [relevantShifts, setRelevantShifts] = useState([]);

  ///////////////////////////////////////////////////////////////////
  const retriveArr = JSON.parse(localStorage.getItem(dateObj.getFullYear()));
  console.log("second page");
  //////////////////////////////////////////////////////////////////
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

  monthsWorked.forEach((ele) => newMonthArr.push(ele));

  newMonthArr.sort();
  ///////////////////////////////udating relevant data when month change or user inputs something on first page/////////////////////////////////////////////////////////////////////

  useEffect(() => {
    console.log("useeffect start");

    if (Array.isArray(retriveArr)) {
      retriveArr.map((ele, ind) => {
        if (ele.job === curJob && ele.month === month) {
          setRelevantShifts((relevantShifts) => [...relevantShifts, ele]);
        }
      });
    } else if (retriveArr) {
      if (retriveArr.job === curJob && retriveArr.month === month) {
        console.log("hit");
        console.log(retriveArr);
        setRelevantShifts([retriveArr]);
      }
    }
  }, [month]);

  useEffect(() => {
    if (Array.isArray(retriveArr)) {
      setRelevantShifts(() => []);
      retriveArr.map((ele, ind) => {
        if (ele.job === curJob && ele.month === month) {
          setRelevantShifts((relevantShifts) => [...relevantShifts, ele]);
        }
      });
    } else if (retriveArr) {
      if (retriveArr.job === curJob && retriveArr.month === month) {
        console.log("hit");
        console.log(retriveArr);
        setRelevantShifts([retriveArr]);
      }
    }
  }, [change]);

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
    console.log("clicked month");
  };

  return (
    <div>
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
    </div>
  );
};

export default SecondPage;
