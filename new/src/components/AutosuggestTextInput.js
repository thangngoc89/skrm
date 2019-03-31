import React from "react";
import useLocalStorage from "./useLocalStorage";
import { TextInput } from "grommet";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export default function AutosuggestTextInput({
  name,
  value,
  onChange,
  onBlur,
  ...props
}) {
  const [suggestions, setSuggestions] = useLocalStorage("sug__" + name, [], {
    json: true,
  });

  return (
    <TextInput
      name={name}
      suggestions={suggestions.filter(a => a !== value)}
      onChange={onChange}
      onSelect={event => {
        event.target.value = event.suggestion;
        onChange(event);
      }}
      onBlur={event => {
        if (value !== "") {
          setSuggestions(
            [value, ...suggestions].filter(onlyUnique).slice(0, 5)
          );
        }
        onBlur(event);
      }}
      value={value}
      {...props}
    />
  );
}
