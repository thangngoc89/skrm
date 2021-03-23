import { h } from "preact";
import { useState, useEffect } from "react";
import style from "./spinner.css";
import objStr from "obj-str";

export const Spinner: React.FC<{}> = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      className={objStr({
        [style.spinner]: true,
        [style.delay]: isMounted,
      })}
    ></div>
  );
};
