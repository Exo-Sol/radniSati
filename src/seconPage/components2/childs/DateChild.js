import React from "react";

const DateChild = ({ month, days }) => {
  return (
    <div>
      <div className="title">setDate</div>
      <ul className="lists">
        {month.map((ele, ind) => {
          return <li key={ind} className="childLi">{`${days[ind]}.${ele}`}</li>;
        })}
      </ul>
    </div>
  );
};

export default DateChild;
