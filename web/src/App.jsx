import React from "react";
import "./App.css";
import Builder from "./pages/Builder";
import { useSearchParams } from "react-router-dom";
import Modal from "./core/Modal";

function App() {
  const [searchParams] = useSearchParams();
  const canEdit =
    searchParams.get("editor") === "true" &&
    window.location.hostname === "localhost";
  const gameTag = searchParams.get("game");
  return (
    <>
      <Builder
        canEdit={canEdit}
        gameTag={gameTag}
      />
     
        <Modal/>
    </>
  );
}

export default App;
