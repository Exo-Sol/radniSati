import React from "react";

const TemplateChild = ({ data, tableName, last, endTag, startTag, numTag }) => {
  const startEndStyle = () => {
    if (endTag) {
      return {
        color: "#ff8b42",
      };
    } else if (startTag) {
      return {
        color: "rgb(59, 226, 148)",
      };
    } else if (numTag) {
      return {
        color: "gray",
      };
    } else if (tableName === "Sati") {
      return {
        color: "yellow",
      };
    }
  };

  return (
    <div>
      <div>
        <div className="title">{tableName}</div>
        <ul className="lists">
          {data.map((ele, ind) => {
            return (
              <li key={ind} className="childLi" style={startEndStyle()}>
                {ele}
              </li>
            );
          })}
          {last && (
            <li key={9999} className=" childLi" id="totalLi">
              {last}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TemplateChild;
