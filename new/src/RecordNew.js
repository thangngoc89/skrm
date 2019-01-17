import React, { Component } from "react";
import RecordInput from "./RecordInput";
import ulid from "./ulid";

const RecordNew = () => {
  const id = ulid();
  return (
    <RecordInput
      key={id}
      value={{
        _id: id,
      }}
    />
  );
};

export default RecordNew;
