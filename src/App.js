import React, { useState, useEffect } from "react";
import DateNav from "./components/DateNav";
import NameJob from "./components/addRenameJob/NameJob";
import { useSpring, animated } from "react-spring";

function App() {
  const [jobName, setJobName] = useState(null);
  const [curJob, setCurJob] = useState(null);
  const [addJob, setAddJob] = useState(false);

  //////////////////////initial animation
  const springProps = useSpring({ opacity: addJob ? 0 : 1 });

  //////////////////////////////////////////////////////////////////
  const catchName = (name) => {
    ///first check if name is enetered
    if (name.length > 0) {
      if (Array.isArray(jobName)) {
        setJobName([...jobName, name]);
      } else {
        let x = [];
        x.push(name);
        setJobName(x);
      }
      setCurJob(name);
      setAddJob(false);
    }
  };

  /////code for saving jobs from state in local storage

  useEffect(() => {
    if (jobName) {
      localStorage.setItem("jobs", jobName);
    }
  }, [jobName]);
  //////////////////////////////////////////////////////////

  const addJobClick = () => {
    setAddJob(true);
  };

  const deleteJobClick = () => {
    if (window.confirm(`Izbrisi ${curJob}?`)) {
      if (jobName && jobName.length > 1) {
        let filteredAry = jobName.filter((e) => e !== curJob);
        setJobName(filteredAry);
        setCurJob(filteredAry[0]);
      } else {
        setJobName(null);
        setCurJob(null);
      }
    }
  };
  ////////////////////////////////////////////////////////
  const catchData = (dateObj, workHours, startEndTime) => {
    const finalObj = {
      job: curJob,
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

      x.push(finalObj);
      let objForSaving = JSON.stringify(x);

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
      {jobName && jobName.length > 1 && (
        <span className="material-icons jobArrow" onClick={backName}>
          arrow_back_ios
        </span>
      )}

      <h4 id="jN">{curJob}</h4>
      {jobName && jobName.length > 1 && (
        <span className="material-icons jobArrow" onClick={fowardName}>
          arrow_forward_ios
        </span>
      )}
    </div>
  );
  ////////////////////////////////////////////////////////////////////////////
  return (
    <div className="App">
      {jobName && (
        <div>
          <button id="addJob" onClick={addJobClick}>
            Dodaj posao
          </button>
          <button id="removeJob" onClick={deleteJobClick}>
            Izbrisi posao
          </button>
        </div>
      )}
      {jobName ? jobDisplay : <NameJob catchName={catchName} />}
      {addJob && <NameJob catchName={catchName} />}

      {jobName && (
        <animated.div style={springProps}>
          <DateNav catchData={catchData} />
        </animated.div>
      )}
    </div>
  );
}

export default App;
