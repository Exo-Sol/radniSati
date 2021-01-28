import React, { useState } from "react";
import DateNav from "./components/DateNav";
import NameJob from "./components/addRenameJob/NameJob";

function App() {
  const [jobName, setJobName] = useState(null);
  const [curJob, setCurJob] = useState(null);
  const [addJob, setAddJob] = useState(false);

  //////////////////////////////////////////////////////////////////
  const catchName = (name) => {
    if (Array.isArray(jobName)) {
      setJobName([...jobName, name]);
    } else {
      let x = [];
      x.push(name);
      setJobName(x);
    }
    setCurJob(name);
    setAddJob(false);
  };

  //////////////////////////////////////////////////////////

  const addJobClick = () => {
    setAddJob(true);
  };

  const deleteJobClick = () => {
    if (jobName && jobName.length > 1) {
      let filteredAry = jobName.filter((e) => e !== curJob);
      setJobName(filteredAry);
      setCurJob(filteredAry[0]);
    } else {
      setJobName(null);
      setCurJob(null);
    }
  };
  ////////////////////////////////////////////////////////
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
  ///////////////////////////////////////////////////////////////////////////////////////
  const backName = () => {
    const curIndex = jobName.findIndex((ele) => ele === curJob);
    console.log(curIndex);

    if (curIndex - 1 < 0) {
      setCurJob(jobName[jobName.length - 1]);
    } else {
      setCurJob(jobName[curIndex - 1]);
    }
  };

  const fowardName = () => {
    const curIndex = jobName.findIndex((ele) => ele === curJob);

    if (curIndex + 1 > jobName.length - 1) {
      setCurJob(jobName[0]);
    } else {
      setCurJob(jobName[curIndex + 1]);
    }
  };
  //////////////////////////////////////////////////////////////////////////////////////
  const jobDisplay = (
    <div className="jobDispl">
      {jobName && jobName.length > 1 ? (
        <span className="material-icons jobArrow" onClick={backName}>
          arrow_back_ios
        </span>
      ) : (
        <span></span>
      )}

      <h4 id="jN">{curJob}</h4>
      {jobName && jobName.length > 1 ? (
        <span className="material-icons jobArrow" onClick={fowardName}>
          arrow_forward_ios
        </span>
      ) : (
        <span></span>
      )}
    </div>
  );
  ////////////////////////////////////////////////////////////////////////////
  return (
    <div className="App">
      {jobName ? (
        <div>
          <button id="addJob" onClick={addJobClick}>
            Dodaj posao
          </button>
          <button id="removeJob" onClick={deleteJobClick}>
            Izbrisi posao
          </button>
        </div>
      ) : (
        <div></div>
      )}
      {jobName ? jobDisplay : <NameJob catchName={catchName} />}
      {addJob ? <NameJob catchName={catchName} /> : <div></div>}

      <DateNav catchData={catchData} />
    </div>
  );
}

export default App;
