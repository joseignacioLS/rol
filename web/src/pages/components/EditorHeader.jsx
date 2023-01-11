import React from "react";
import { useContext } from "react";
import { DataContext } from "../../core/Context/DataContext";
import { ModalContext } from "../../core/Context/ModalContext";

const EditorHeader = () => {
  const { path, dataDispatcher } = useContext(DataContext);
  const { setModalData } = useContext(ModalContext);

  const createSibling = () => {
    setModalData({
      isShown: true,
      type: "input",
      text: "Nombre del página",
      outcome: (value) => {
        dataDispatcher({
          type: "createSibling",
          payload: value,
        });
        dataDispatcher({
          type: "path",
          payload: [...path.slice(0, path.length - 1), value],
        });
      },
    });
  };

  const createChild = () => {
    setModalData({
      isShown: true,
      type: "input",
      text: "Nombre del página",
      outcome: (value) => {
        dataDispatcher({
          type: "createChild",
          payload: value,
        });
        dataDispatcher({
          type: "path",
          payload: [...path, value],
        });
      },
    });
  };

  const deletePage = () => {
    setModalData({
      isShown: true,
      type: "text",
      text: "Confirma borrar la pagina",
      outcome: () => {
        dataDispatcher({
          type: "delete",
          payload: {
            main: path[0],
            sub: path[1],
          },
        });
        dataDispatcher({
          type: "path",
          payload: ["Home", ""],
        });
      },
    });
  };

  return (
    <div className="editor__head">
      <h1>{path.join("/")}</h1>
      <button onClick={createSibling}>Add Sibling</button>
      {path[0] !== "Home" && <button onClick={createChild}>Add Subpage</button>}
      {path[0] !== "Home" && <button onClick={deletePage}>Delete</button>}
    </div>
  );
};

export default EditorHeader;
