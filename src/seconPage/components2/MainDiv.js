import React from "react";
import DateChild from "../components2/childs/DateChild";
import TemplateChild from "../components2/childs/TemplateChild";

const MainDiv = ({ data }) => {
  // SORTING///////////////////////////////
  let sortedData = data.sort((a, b) => {
    let x = a.day < b.day ? -1 : 1;
    return x;
  });

  console.log(sortedData);

  const num = sortedData.map((ele, ind) => {
    return ind + 1;
  });

  const days = sortedData.map((ele, ind) => {
    return ele.day;
  });

  const month = sortedData.map((ele, ind) => {
    return ele.month;
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

  ///////////// check this later
  if (Array.isArray(workHours) && workHours.length > 0) {
    var ukupno = workHours.reduce((x, y) => parseInt(x) + parseInt(y));
  }

  console.log(days, month, dayOfWeek, startTimes, endTimes, workHours, num);
  return (
    <div className="mainDiv">
      <TemplateChild
        className="childDiv"
        data={num}
        numTag={true}
        tableName={"num"}
      />
      <DateChild className="childDiv" days={days} month={month} />
      <TemplateChild className="childDiv" data={dayOfWeek} tableName={"day"} />
      <TemplateChild
        className="childDiv"
        data={startTimes}
        tableName={"Start"}
        startTag={true}
      />
      <TemplateChild
        className="childDiv"
        data={endTimes}
        tableName={"End"}
        endTag={true}
      />
      <TemplateChild
        className="childDiv"
        data={workHours}
        tableName={"hours"}
        last={ukupno}
      />
    </div>
  );
};

export default MainDiv;
