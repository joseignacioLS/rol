import React from "react";
import { DataContext } from "../../core/Context/DataContext";

function Viewer() {
  const { data, path, dataDispatcher } = React.useContext(DataContext);
  const processContent = (text) => {
    const [content, ...rest] = text.split("|");
    const style = {
      textAlign: rest[0] || "",
      fontSize: rest[1] ? rest[1] + "px" : "",
    };
    const result = content.split(" ").map((part, i) => {
      const splitted = part.split("@");
      if (splitted.length === 1 || splitted[1].length === 0) {
        return part + " ";
      }

      return (
        <>
          <span
            key={splitted[0]}
            onClick={() =>
              dataDispatcher({
                type: "path",
                payload: splitted[1].split("/"),
              })
            }
            className="link"
            data-link={splitted[1]}
          >
            {splitted[0].split("_").join(" ")}
          </span>
          <span key={"space_" + i}> </span>
        </>
      );
    });
    return [result, style];
  };

  const processPage = (page) => {
    if (!page?.raw) return undefined;
    return page?.raw.split(/\r|\n/g).reduce((acc, curr, i) => {
      const [key, ...rest] = curr.split(/ /);
      let status = "";
      const content = rest.join(" ");
      const [processedContent, style] = processContent(content);
      switch (key) {
        case "!":
          page.back = rest[0].split("/");
          return acc;
        case "#":
          return [
            ...acc,
            <h2 key={`h2${i}_${rest}`} style={style}>
              {processedContent}
            </h2>,
          ];
        case "##":
          return [
            ...acc,
            <h3 key={`h3{i}_${rest}`} style={style}>
              {processedContent}
            </h3>,
          ];
        case "###":
          return [
            ...acc,
            <h4 key={`h4${i}_${rest}`} style={style}>
              {processedContent}
            </h4>,
          ];

        case "-":
          return [
            ...acc,
            <li key={`li${i}_${rest}`} style={style}>
              {processedContent}
            </li>,
          ];
        case "$":
          const [src, ...options] = rest[0].split("|");
          return [
            ...acc,
            <>
              <img
                key={`img${i}`}
                style={{
                  display: "block",
                  margin: options[0] === "center" ? "auto" : "",
                  width: options[1] ? options[1] + "%" : "",
                }}
                src={src}
                width="200"
              />
            </>,
          ];
        case ">":
          return [
            ...acc,
            <p key={`p${i}_${curr}`} className="quote">
              {content}
            </p>,
          ];
        default:
          const [pContent, pStyle] = processContent(curr);
          return [
            ...acc,
            <p key={`p${i}_${pContent}`} className={status} style={pStyle}>
              {pContent}
            </p>,
          ];
      }
    }, []);
  };

  return (
    <div className="viewer">
      <h1>{path.join("/")}</h1>
      {processPage(data)}
      {path[0] !== "Home" && (
        <button
          className="link back"
          onClick={() => {
            dataDispatcher({
              type: "path",
              payload: data.back,
            });
          }}
        >
          Back
        </button>
      )}
    </div>
  );
}

export default Viewer;
