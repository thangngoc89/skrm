import React from "react";
import RecordInput from "./RecordInput";
import ulid from "./ulid";
import { TIEUHOC } from "./db";

const RecordNew = () => {
  const id = ulid();
  return (
    <RecordInput
      key={id}
      value={{
        _id: id,
        kind: TIEUHOC,
      }}
    />
  );
};

export default RecordNew;
