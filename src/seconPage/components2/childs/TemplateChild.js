import React from "react";

const TemplateChild = ({ data, tableName, last }) => {
  return (
    <div>
      <div>
        <div className="title">{tableName}</div>
        <ul className="lists">
          {data.map((ele, ind) => {
            return <li className="childLi">{ele}</li>;
          })}
          {last && <li className="childLi totalLi">{last}</li>}
        </ul>
      </div>
    </div>
  );
};

export default TemplateChild;
