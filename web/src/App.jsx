import React from "react";
import "./App.css";
import Builder from "./pages/Builder";
import { useSearchParams } from "react-router-dom";
import Modal from "./core/Modal";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalData, setModalData] = React.useState({
    isShown: false,
    text: "",
    action: "",
    outcome: () => {},
  });
  const canEdit =
    searchParams.get("editor") === "true" &&
    window.location.hostname === "localhost";
  const gameTag = searchParams.get("game");
  return (
    <>
      <Builder
        setModalData={setModalData}
        canEdit={canEdit}
        gameTag={gameTag}
      />
      {modalData.isShown && (
        <Modal modalData={modalData} setModalData={setModalData} />
      )}
    </>
  );
}

export default App;
