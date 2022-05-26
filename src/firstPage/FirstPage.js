import React, { useState, useEffect } from "react";
import SetShift from "./components/setShift/SetShift";
import NameJob from "./components/addRenameJob/NameJob";
import DisplayInfo from "./components/DisplayInfo";
import { useSpring, animated } from "react-spring";
import MessageModal from "../components/MessageModal";
import { answers } from "../components/modalTexts";
import swipe from "../Icons/swipe.png";

function FirstPage({ onAddedTime, deleteAll, swipeInd }) {
  console.log(answers);
  const [jobName, setJobName] = useState(null);
  //selected job
  const [curJob, setCurJob] = useState(null);
  const [addJob, setAddJob] = useState(false);
  /// to force update on hours in a month
  const [chageOfH, setChangeOfH] = useState(false);
  // to change displayInfo
  const [displaySwitch, setDisplaySwitch] = useState(false);
  /////////////////////Saving current job in local storage when changed for display on page 2
  const [showJobArrow, setShowJobArrow] = useState(false);

  ///////////////modal with portals/////////////////////////////////////
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalConfirm, setModalConfirm] = useState(() => false);

  const removeModal = () => {
    setShowModal(false);
  };
  ////////////////////////////////////////////////////

  useEffect(() => {
    localStorage.setItem("currentJob", curJob);
    /// indicate change for second page

    onAddedTime();
  }, [curJob]);

  useEffect(() => {
    setJobName(null);
    setCurJob(null);
  }, [deleteAll]);

  ///Retrivin Jobs from local storage on initial render
  useEffect(() => {
    const savedJobs = window.localStorage.getItem("jobs");

    if (savedJobs) {
      if (savedJobs.includes(",")) {
        const array = savedJobs.split(",");
        setJobName(array);
        setCurJob(array[0]);
      } else {
        let x = [];
        x.push(savedJobs);
        setJobName(x);
        setCurJob(savedJobs);
      }
    }
  }, []);

  //////////////////////initial animation
  const springProps = useSpring({ opacity: addJob ? 0 : 1 });

  //////////////////////////////////////////////////////////////////
  const catchName = (name) => {
    ///first check if name is enetered
    /// check that there is no duplicates in name
    if (name.length > 0) {
      if (Array.isArray(jobName) && !jobName.includes(name)) {
        setJobName([...jobName, name]);
      } else if (!Array.isArray(jobName)) {
        let x = [];
        x.push(name);
        setJobName(x);
      } else {
        /// show alert pointing why you cant enetr name
        /// either you didnt type anything or name already exists
        if (jobName.includes(name)) {
          setModalMessage(answers[0]);
          setShowModal(true);
        }
      }
      setCurJob(name);
      setAddJob(false);
    } else {
      setAddJob(false);
    }
  };

  /////saving jobs from state in local storage

  useEffect(() => {
    if (jobName) {
      localStorage.setItem("jobs", jobName);
    } else {
      localStorage.removeItem("jobs");
    }
  }, [jobName]);
  //////////////////////////////////////////////////////////

  const addJobClick = () => {
    setAddJob(true);
  };
  ///////////////////////Delete Job//////////////////////////////////////
  const deleteJobClick = () => {
    setModalMessage(`${answers[1]} ${curJob} ?`);
    setShowModal(true);
  };

  useEffect(() => {
    if (modalConfirm) {
      if (jobName && jobName.length > 1) {
        let filteredAry = jobName.filter((e) => e !== curJob);
        setJobName(filteredAry);
        setCurJob(filteredAry[0]);
      } else {
        setJobName(null);
        setCurJob(null);
      }
    }
    setModalConfirm(false);
  }, [modalConfirm]);
  //////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////
  const catchData = (dateObj, workHours, startEndTime) => {
    // two entry formats 1."start time" and "end time" are set 2. only shift lenght is enetered, without start and end time
    const finalObj = startEndTime.startTime
      ? {
          job: curJob,
          month: dateObj.month,
          day: dateObj.day,
          dayName: dateObj.dayName,
          workHours: workHours,
          startTime: startEndTime.startTime,
          endTime: startEndTime.endTime,
        }
      : {
          job: curJob,
          month: dateObj.month,
          day: dateObj.day,
          dayName: dateObj.dayName,
          workHours: workHours,
          startTime: "#",
          endTime: "#",
        };

    const retrivedObj = JSON.parse(localStorage.getItem(dateObj.year));

    if (Array.isArray(retrivedObj)) {
      retrivedObj.push(finalObj);
      let objForSaving = JSON.stringify(retrivedObj);
      localStorage.setItem(dateObj.year, objForSaving);
    } else if (dateObj.year in localStorage) {
      let x = [];

      x.push(retrivedObj);

      x.push(finalObj);
      let objForSaving = JSON.stringify(x);

      localStorage.setItem(dateObj.year, objForSaving);
    } else {
      let storageArr = JSON.stringify(finalObj);

      localStorage.setItem(dateObj.year, storageArr);
    }
    setChangeOfH(!chageOfH);
    /// indicate change for second page
    onAddedTime();
  };
  ///////////////////////////////////////////////////////////////////////////////////////
  const backName = () => {
    const curIndex = jobName.findIndex((ele) => ele === curJob);

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
      {jobName && jobName.length > 1 && showJobArrow === true && (
        <span className="material-icons jobArrow" onClick={backName}>
          arrow_back_ios
        </span>
      )}

      <h4 id="jN" onClick={() => setShowJobArrow(!showJobArrow)}>
        {curJob}
      </h4>

      {jobName && jobName.length > 1 && showJobArrow === true && (
        <span className="material-icons jobArrow" onClick={fowardName}>
          arrow_forward_ios
        </span>
      )}
    </div>
  );
  ////////////////////////////////////////////////////////////////////////////
  const catchDropdown = (prop) => {
    if (!prop) setDisplaySwitch(true);
    else setDisplaySwitch(false);
  };

  const startEndTime = (x) => {
    setDisplaySwitch(x);
  };

  ///////////////////////////////////////////////////////////////////////////
  return (
    <div className="FirstPage">
      {jobName && showJobArrow && (
        <div>
          <button id="addJob" onClick={addJobClick}>
            Add Job
          </button>
          <button id="removeJob" onClick={deleteJobClick}>
            Del Job
          </button>
        </div>
      )}
      {jobName ? (
        jobDisplay
      ) : (
        <NameJob catchName={catchName} noBackButton={true} />
      )}
      {addJob && <NameJob catchName={catchName} />}

      {jobName && (
        <animated.div style={springProps}>
          <SetShift
            catchData={catchData}
            curJob={curJob}
            catchD={catchDropdown}
            setModalMessage={setModalMessage}
            setShowModal={setShowModal}
            startEndTime={startEndTime}
          />
        </animated.div>
      )}
      <MessageModal
        showModal={showModal}
        removeModal={removeModal}
        setModalConfirm={setModalConfirm}
      >
        {modalMessage}
      </MessageModal>
      {jobName && !displaySwitch ? (
        <DisplayInfo curJob={curJob} change={chageOfH} />
      ) : (
        displaySwitch && (
          <DisplayInfo
            curJob={curJob}
            change={chageOfH}
            displaySwitch={displaySwitch}
          />
        )
      )}
      {swipeInd && <img src={swipe} alt="swipe" id="swipeIcon" />}
    </div>
  );
}

export default FirstPage;
