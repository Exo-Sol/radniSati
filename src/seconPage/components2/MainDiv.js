import React from "react";
import DateChild from "../components2/childs/DateChild";

const MainDiv = ({ data }) => {
  // SORTING///////////////////////////////
  let sortedData = data.sort((a, b) => {
    let x = a.day < b.day ? -1 : 1;
    return x;
  });

  console.log(sortedData);

  const num = sortedData.length;

  const days = sortedData.map((ele, ind) => {
    return ele.day;
  });

  const dayOfWeek = sortedData.map((ele, ind) => {
    return ele.dayName;
  });

  const startTimes = sortedData.map((ele, ind) => {
    return ele.startTime;
  });

  const endTimes = sortedData.map((ele, ind) => {
    return ele.endTime;
  });
  const workHours = sortedData.map((ele, ind) => {
    return ele.workHours;
  });

  console.log(days, dayOfWeek, startTimes, endTimes, workHours, num);
  return (
    <div className="mainDiv">
      <div className="childDiv">Num</div>
      <DateChild className="childDiv" />
      <div className="childDiv">dOfw</div>
      <div className="childDiv">start</div>
      <div className="childDiv">end</div>
      <div className="childDiv">hours</div>
    </div>
  );
};

export default MainDiv;
