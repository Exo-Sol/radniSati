import React, { useState, useEffect } from "react";
import nuke from "../../Icons/nucle2.png";
import MessageModal from "../../components/MessageModal";

const NukeStorage = ({ onAddedTime }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(() => false);
  const [modalMessage, setModalMessage] = useState(
    "Warrning! \n ALL entries will be deleted. \n Proceed ?"
  );

  const removeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (modalConfirm) {
      localStorage.clear();
      onAddedTime(true);
      window.alert("Deleted !");
      setModalConfirm(false);
    }
  }, [modalConfirm]);

  const deleteAll = () => {
    setShowModal(true);
    // if (
    //   window.confirm(
    //     "Jeste li sigurni da zelite nepovratno izbrisati SVE podatke ?"
    //   )
    // ) {
    //   localStorage.clear();
    //   onAddedTime(true);
    //   window.alert("Izbrisano");
    // } else {
    //   // Do nothing!
    // }
  };

  return (
    <div>
      <img src={nuke} className="nuke" onClick={deleteAll} alt="deleteAll" />
      <MessageModal
        showModal={showModal}
        setModalConfirm={setModalConfirm}
        removeModal={removeModal}
      >
        {modalMessage}
      </MessageModal>
    </div>
  );
};

export default NukeStorage;
