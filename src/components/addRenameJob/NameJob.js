import React, { useState } from "react";

const NameJob = ({ catchName }) => {
  const [jobName, setJobName] = useState("");

  const inputName = (e) => {
    setJobName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    catchName(jobName);
  };

  return (
    <div className="jobName">
      <form action="" onSubmit={onSubmit}>
        <h3>Unesi naziv posla</h3>
        <div className="miniFlex">
          <input
            type="text"
            placeholder="Tu"
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
