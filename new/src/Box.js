import React from "react";

export default function({ direction = "column", children }) {
  const className = ["flex flex-1"];
  switch (direction) {
    case "row":
      className.push("flex-row");
      break;
    case "column":
      className.push("flex-col");
      break;
    case "row-responsive":
      className.push("flex-col md:flex-row");
      break;
  }
  return <div className={className.join(" ")}>{children} </div>;
}
