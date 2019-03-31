import React from "react";

export default function useLocalStorage(
  key,
  initialValue,
  options = { json: false }
) {
  const { json } = options;
  const [item, setValue] = React.useState(() => {
    let value;
    let fromLocalStorage = localStorage.getItem(key);
    if (fromLocalStorage && json) {
      try {
        fromLocalStorage = JSON.parse(fromLocalStorage);
      } catch (error) {
        fromLocalStorage = null;
      }
    }
    value = fromLocalStorage || initialValue;
    return value;
  });

  const setItem = newValue => {
    setValue(newValue);
    if (json) {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } else {
      window.localStorage.setItem(key, newValue);
    }
  };

  return [item, setItem];
}
