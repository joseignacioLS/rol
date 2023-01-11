import React from "react";
import Editor from "./components/Editor";
import Viewer from "./components/Viewer";
import "./Builder.scss";
import { DataContext } from "../core/Context/DataContext";

function Builder({ canEdit, setModalData, gameTag }) {
  const { gameData, listOfPages, path, dataDispatcher } = React.useContext(DataContext);

  React.useEffect(() => {
    dataDispatcher({
      type: "select",
      payload: gameTag,
    });
  }, []);

  React.useEffect(() => {
    document.querySelector(".viewer")?.scrollTo(0, 0);
  }, [...path]);

  return (
    <>
      <main>
        {canEdit && (
          <select
            className="nav"
            onChange={(e) => {
              dataDispatcher({
                type: "path",
                payload: e.currentTarget.value.split("/"),
              });
            }}
            value={path.join("/")}
          >
            {listOfPages?.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        )}
        <div className="builder">
          {canEdit && <Editor setModalData={setModalData} />}
          <Viewer />
        </div>
        {canEdit && (
          <button
            className="download"
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(gameData));
              console.log("copied");
            }}
          >
            C
          </button>
        )}
      </main>
    </>
  );
}

export default Builder;
