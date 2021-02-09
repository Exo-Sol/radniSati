import React, { useState, useEffect } from "react";
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
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    console.log("useeffect start");

    retriveArr.map((ele, ind) => {
      if (ele.job === curJob && ele.month === month) {
        setRelevantShifts((relevantShifts) => [...relevantShifts, ele]);
      }
    });
    //// SORTING///////////////////////////////
    // let sorted = relevantShifts.sort((a, b) => {
    //   let x = a.day < b.day ? -1 : 1;
    //   return x;
    // });
    // setRelevantShifts(sorted);
    // console.log(relevantShifts);
  }, [month]);

  useEffect(() => {
    setRelevantShifts(() => []);
    retriveArr.map((ele, ind) => {
      if (ele.job === curJob && ele.month === month) {
        setRelevantShifts((relevantShifts) => [...relevantShifts, ele]);
      }
    });
  }, [change]);

  //////////////////////////////////////////////////////////////////////////////////////////////
  const dropDown = () => {
    setToggleDropdown(!toggleDropdown);
  };

  const setClickedMonth = (e) => {
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
    </div>
  );
};

export default SecondPage;
