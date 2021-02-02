import React, { useState } from "react";

const DisplayThisMonthHours = ({ curJob }) => {
  const dateObj = new Date();
  const retriveArr = JSON.parse(localStorage.getItem(dateObj.getFullYear()));

  const month = dateObj.getMonth() + 1;

  let totalH = 0;
  if (retriveArr && Array.isArray(retriveArr)) {
    retriveArr.map((ele, ind) => {
      if (ele.month === month && ele.job === curJob) {
        totalH += ele.workHours;
      }
    });
  } else if (retriveArr) {
    totalH += retriveArr.workHours;
  }

  let stringTotalH = totalH.toString();
  let lastChar = +stringTotalH.slice(-1);

  return (
    <div className="displInfoMain">{`${totalH} ${
      lastChar === 1 ? "sat" : "sati"
    } u ${month} mj. (${curJob}) `}</div>
  );
};

export default DisplayThisMonthHours;
