import React from "react";
import { DataContext } from "../../core/Context/DataContext";
import P from "./TextComponents/P";
import Image from "./TextComponents/Image";

function Viewer() {
  const { data, path, dataDispatcher } = React.useContext(DataContext);
  const processContent = (content, options) => {
    const style = options
      ? {
          textAlign: options[0] || "left",
          fontSize: options[1] ? options[1] + "px" : "inherit",
        }
      : {};
    const result = content.split(" ").map((part, i) => {
      const splitted = part.split("@");
      if (splitted.length === 1 || splitted[1].length === 0) {
        return part + " ";
      }

      return (
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
          {splitted[0].split("_").join(" ") + " "}
        </span>
      );
    });
    return [result, style];
  };

  const processPage = (page) => {
    if (!page?.raw) return undefined;
    return page?.raw.split(/\r|\n/g).reduce((acc, curr, i) => {
      const regexKey = /^(!|#{1,3}|\$|\>|\-) /;
      let key = curr.match(regexKey);

      const regexOptions = /\|.+$/;
      let options = curr.match(regexOptions);

      let content = curr;
      if (options) {
        content = content.replace(options[0], "");
        options = options[0].split("|").slice(1);
      }
      if (key) {
        content = content.split("").slice(key.length).join("");
        key = key[0].trim();
      }
      console.log(key)

      const [processedContent, style] = processContent(content, options);
      switch (key) {
        case "!":
          page.back = content.split("/");
          return acc;
        case "#":
          return [
            ...acc,
            <h2 key={`h2${i}_${content}`} style={style}>
              {processedContent}
            </h2>,
          ];
        case "##":
          return [
            ...acc,
            <h3 key={`h3{i}_${content}`} style={style}>
              {processedContent}
            </h3>,
          ];
        case "###":
          return [
            ...acc,
            <h4 key={`h4${i}_${content}`} style={style}>
              {processedContent}
            </h4>,
          ];

        case "-":
          return [
            ...acc,
            <li key={`li${i}_${content}`} style={style}>
              {processedContent}
            </li>,
          ];
        case "$":
          const imageStyle = {
            margin: options[0] === "center" ? "auto" : "",
            width: options[1] ? options[1] + "%" : "200px",
          };
          return [
            ...acc,
            <Image key={`img${i}`} src={content} style={imageStyle} />,
          ];
        case ">":
          return [
            ...acc,
            <P key={`p${i}_${curr}`} content={processedContent} cssClass="quote" />,
          ];
        default:
          return [
            ...acc,
            <P key={`p${i}_${processedContent}`} content={processedContent} style={style} />,
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
