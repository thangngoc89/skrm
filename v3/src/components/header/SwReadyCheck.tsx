import { h } from "preact";
import { useState, useEffect } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

export const SwReadyCheck: React.FC<{}> = () => {
  const [isReady, setReady] = useState(false);
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then(function () {
        setReady(true);
      });
    }
  }, []);
  // @ts-ignore
  return isReady ? <FaRegCheckCircle /> : null;
};
