import React, { useContext } from "react";
import "./Modal.scss";
import { ModalContext } from "./Context/ModalContext";

const Modal = () => {
  const [inputValue, setInputValue] = React.useState("");
  const { modalData, setModalData } = useContext(ModalContext);
  const handleEnd = (isAgree) => {
    if (!isAgree) {
      setModalData({
        isShown: false,
      });
    }
    if (modalData.type === "input" && inputValue.length < 1) {
      return;
    }
    isAgree && modalData.outcome(inputValue);
    setModalData({
      isShown: false,
    });
  };

  return (
    <>
      {modalData.isShown && (
        <div className="modal">
          <p>{modalData.text}</p>
          {modalData.type === "input" && (
            <input
              type="text"
              value={inputValue}
              onInput={(e) => {
                setInputValue(e.currentTarget.value);
              }}
            ></input>
          )}
          <div>
            <button onClick={() => handleEnd(true)}>Ok</button>
            <button onClick={() => handleEnd()}>X</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
