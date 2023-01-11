import React, { useContext } from "react";
import { DataContext } from "../../core/Context/DataContext";
import { ModalContext } from "../../core/Context/ModalContext";
import EditorHeader from "./EditorHeader";

function Editor() {
  const { data, dataDispatcher, path } = useContext(DataContext);
  const { setModalData } = useContext(ModalContext);
  return (
    <div className="editor">
      <EditorHeader/>
      {data && (
        <textarea
          className="input"
          onInput={(e) => {
            dataDispatcher({
              type: "update",
              payload: {
                title: path[0],
                raw: e.currentTarget.value,
                subPages: data.subPages,
              },
            });
          }}
          value={data.raw ? data.raw : ""}
        ></textarea>
      )}
    </div>
  );
}

export default Editor;
