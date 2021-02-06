import React, { useState, useEffect } from "react";
import "./styles2/styles.css";

const SecondPage = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  /////////////////////////////getting JObs
  /////////////////////////////////////////////////////////

  const currentJob = localStorage.getItem("currentJob");

  //////////////////////////////////////////////////////////////////
  const dateObj = new Date();
  const [month, setMonth] = useState(dateObj.getMonth() + 1);
  const retriveArr = JSON.parse(localStorage.getItem(dateObj.getFullYear()));
  //////////////////////////////////////////////////////////////////
  const monthsWorked = new Set();

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

  const newMonthArr = [];

  monthsWorked.forEach((ele) => newMonthArr.push(ele));

  const dropDown = () => {
    setToggleDropdown(!toggleDropdown);
  };

  const setClickedMonth = (e) => {
    setMonth(e.target.innerText);
  };

  return (
    <div>
      <ul>
        <li class="material-icons icons" onClick={dropDown}>
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
