import React from "react";
import { createPortal } from "react-dom";

const MessageModal = ({
  showModal,
  removeModal,
  setModalConfirm,
  children,
}) => {
  if (!showModal) {
    return null;
  }

  console.log(children.slice(-1)[0]);

  return createPortal(
    <div>
      <div className="modalOverlay"> </div>
      <div className="modal">
        <div className="modalText">{children}</div>
        <div className="modalButtons">
          <button
            onClick={() => {
              removeModal();
              children.slice(-1)[0] === "?" && setModalConfirm(true);
            }}
            className="okModal"
          >
            Ok
          </button>
          {children.slice(-1)[0] === "?" ? (
            <button className="okModal" onClick={() => removeModal()}>
              cancel
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default MessageModal;
