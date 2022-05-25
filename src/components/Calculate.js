import React, { useState, useEffect } from "react";

const Calculate = ({ back, cur, totHours, change }) => {
  const [pay, setPay] = useState();
  const [retrivedPay, setRetrivedPay] = useState(localStorage.getItem(cur));

  useEffect(() => {
    setRetrivedPay(localStorage.getItem(cur));
    return () => back();
  }, [cur, change]);

  const payMent = (e) => {
    setPay(e.target.value);
  };

  const goBack = () => {
    back();
  };

  const savePay = () => {
    localStorage.setItem(cur, pay);
    setRetrivedPay(pay);
  };

  const changeSallary = () => {
    localStorage.removeItem(cur);
    setPay(false);
    setRetrivedPay(false);
  };

  return (
    <>
      <div className="calculate">
        <div className="calcSheet">
          Job : <p style={{ color: "#ff8b42", display: "inline" }}> {cur}</p>
        </div>
        {retrivedPay ? (
          <>
            <div className="calcSheet" id="earnd">
              Money earned :{" "}
              <p style={{ color: "#1EE6BE", display: "inline" }}>
                {parseInt(retrivedPay) * totHours}
              </p>
            </div>
            <div className="calcSheet">
              Hours worked :{" "}
              <p style={{ color: "#FF5A82", display: "inline" }}>{totHours}</p>{" "}
            </div>
            <div className="calcSheet">
              Salary per hour :{" "}
              <p style={{ color: "#F5CD00", display: "inline" }}>
                {retrivedPay}
              </p>{" "}
            </div>
            <br></br>
            <div className="calcButtonWrap">
              <button onClick={goBack} className="calcButton">
                {" "}
                Back
              </button>
              <button onClick={changeSallary} className="calcButton">
                Change salary per hour "{cur}"
              </button>{" "}
            </div>
          </>
        ) : (
          <>
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              className="inputField"
              name="Placa po satu"
              placeholder="hour salary"
              value={pay}
              onChange={payMent}
              style={{ display: "block" }}
              onKeyDown={(evt) =>
                ["e", "E", "+", "-", "."].includes(evt.key) &&
                evt.preventDefault()
              }
            />
            <div className="bContainer">
              <button onClick={savePay} className="calcButton2">
                Save
              </button>
              <button onClick={goBack} className="calcButton2">
                {" "}
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Calculate;
