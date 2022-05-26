import React, { useState, useEffect } from "react";

// this is the bottom component

const DisplayInfo = ({ curJob, displaySwitch }) => {
  const [message, setMessage] = useState("Select start time..");

  useEffect(() => {
    if (displaySwitch) {
      if (displaySwitch.startTime && !displaySwitch.endTime) {
        setMessage(`Start Time : ${displaySwitch.startTime}h, select end..`);
      } else if (displaySwitch.endTime) {
        setMessage(
          `Start : ${displaySwitch.startTime}h, End : ${displaySwitch.endTime}h`
        );
      }
    } else setMessage("Select start time..");
  }, [displaySwitch]);

  const dateObj = new Date();
  const retriveArr = JSON.parse(localStorage.getItem(dateObj.getFullYear()));

  const month = dateObj.getMonth() + 1;

  let totalH = 0;
  if (retriveArr && Array.isArray(retriveArr)) {
    retriveArr.map((ele, ind) => {
      if (ele.month === parseInt(month) && ele.job === curJob) {
        totalH += parseInt(ele.workHours);
      }
    });
  } else if (retriveArr) {
    totalH += parseInt(retriveArr.workHours);
  }

  let stringTotalH = totalH.toString();
  let lastChar = +stringTotalH.slice(-1);

  return displaySwitch && !displaySwitch.startTime ? (
    <div className="displInfoMain">{`${totalH} ${
      lastChar === 1 ? "hour" : "hours"
    } in ${month}. month (${curJob}) `}</div>
  ) : (
    <div className="displInfoMain">{message}</div>
  );
};

export default DisplayInfo;
