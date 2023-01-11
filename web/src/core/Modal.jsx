import React from "react";
import "./Modal.scss";

const Modal = ({ modalData, setModalData }) => {
  const [inputValue, setInputValue] = React.useState("");
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
  );
};

export default Modal;
