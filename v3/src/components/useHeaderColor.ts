import { useEffect } from "react";

export type Color = "purple" | "yellow" | "green" | "pink" | "default";

const colorToHex = (color: Color) => {
  switch (color) {
    case "default":
    case "purple":
      return "#673ab7";
    case "yellow":
      return "#ffca58";
    case "green":
      return "#33D399";
    case "pink":
      return "#EC4799";
  }
};

export const useHeaderColor = (color: Color) => {
  useEffect(() => {
    const header = document.getElementById("header");
    if (header) {
      header.style.backgroundColor = colorToHex(color);
    }

    return () => {
      if (header) {
        header.style.backgroundColor = colorToHex("purple");
      }
    };
  }, []);
};
