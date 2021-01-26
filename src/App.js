import React from "react";
import DateNav from "./components/DateNav";

function App() {
  const catchData = (dateObj, workHours, startEndTime) => {
    const finalObj = {
      month: dateObj.month,
      day: dateObj.day,
      dayName: dateObj.dayName,
      workHours: workHours,
      startTime: startEndTime.startTime,
      endTime: startEndTime.endTime,
    };

    const retrivedObj = JSON.parse(localStorage.getItem(dateObj.year));

    if (Array.isArray(retrivedObj)) {
      retrivedObj.push(finalObj);
      let objForSaving = JSON.stringify(retrivedObj);
      localStorage.setItem(dateObj.year, objForSaving);
    } else if (dateObj.year in localStorage) {
      console.log(retrivedObj);
      let x = new Array();
      console.log(typeof x);

      x.push(retrivedObj);
      console.log(x); // odi ibacuje prvi key value samo
      x.push(finalObj);
      let objForSaving = JSON.stringify(x);
      console.log(objForSaving);
      localStorage.setItem(dateObj.year, objForSaving);
    } else {
      let x = [];
      let storageArr = JSON.stringify(finalObj);
      console.log(storageArr);
      localStorage.setItem(dateObj.year, storageArr);
    }
  };

  return (
    <div className="App">
      <DateNav catchData={catchData} />
    </div>
  );
}

export default App;
