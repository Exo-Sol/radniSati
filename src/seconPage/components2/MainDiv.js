import React, { useEffect } from "react";
import DateChild from "../components2/childs/DateChild";
import TemplateChild from "../components2/childs/TemplateChild";
import { useHistory } from "react-router-dom";

const MainDiv = ({ data, calc, displaySwipe }) => {
  // if (data.length >= 1) {
  //   displaySwipe();
  // }
  // to indicate user has swiped to second page (so swiping icon can no longer appear)
  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => {
      console.log(location.pathname);
      if (location.pathname === "/second" || data.length > 0) {
        displaySwipe();
      }
    });
  }, [history]);

  console.log(data.length);
  // SORTING///////////////////////////////
  let sortedData = data.sort((a, b) => {
    let x = a.day < b.day ? -1 : 1;
    return x;
  });

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
        calc={calc}
      />
    </div>
  );
};

export default MainDiv;
