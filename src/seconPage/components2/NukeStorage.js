import React from "react";
import nuke from "../../Icons/nucle2.png";

const NukeStorage = ({ onAddedTime }) => {
  const deleteAll = () => {
    if (
      window.confirm(
        "Jeste li sigurni da zelite nepovratno izbrisati SVE podatke?"
      )
    ) {
      localStorage.clear();
      onAddedTime(true);
      window.alert("Izbrisano");
    } else {
      // Do nothing!
    }
  };

  return (
    <div>
      <img src={nuke} className="nuke" onClick={deleteAll} alt="nukeAll" />
    </div>
  );
};

export default NukeStorage;
