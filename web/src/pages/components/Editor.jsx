import React from "react";
import { DataContext } from "../../core/Context/DataContext";

function Editor({ setModalData }) {
  const { data, dataDispatcher, path } = React.useContext(DataContext);
  return (
    <div className="editor">
      <div className="editor__head">
        <h1>{path.join("/")}</h1>
        <button
          onClick={() =>
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
            })
          }
        >
          Add Sibling
        </button>
        {path[0] !== "Home" && (
          <button
            onClick={() =>
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
                  //updateData([path[0], value], "", {});
                  //changePage(path[0] + "/" + value);
                },
              })
            }
          >
            Add Subpage
          </button>
        )}
        {path[0] !== "Home" && (
          <button
            onClick={() =>
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
                  //changePage("Home");
                  //deletePage(currentPage[0], currentPage[1]);
                },
              })
            }
          >
            Delete
          </button>
        )}
      </div>
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
