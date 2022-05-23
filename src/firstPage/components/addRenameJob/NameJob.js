import React, { useState } from "react";

const NameJob = ({ catchName, noBackButton }) => {
  const [jobName, setJobName] = useState("");

  const inputName = (e) => {
    setJobName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    catchName(jobName);
  };

  const cancel = () => {
    catchName("");
  };

  return (
    <div className="jobName">
      <form action="" onSubmit={onSubmit} className="formWrap">
        <h3>Enter job name</h3>

        <div className="miniFlex">
          {noBackButton ? (
            <></>
          ) : (
            <button onClick={cancel} id="cancelJobEntry">
              x
            </button>
          )}
          <input
            type="text"
            placeholder=" ..."
            value={jobName}
            onChange={inputName}
            id="placeHolder"
            name="unosPosla"
          />
          <input type="submit" onClick={onSubmit} value="+" id="saveJob" />
        </div>
      </form>
    </div>
  );
};

export default NameJob;
