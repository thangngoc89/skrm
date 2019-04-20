import React from "react";
import RecordInputMaugiao from "./RecordInputMaugiao";
import ulid from "./ulid";
import { MAUGIAO } from "./db";

const RecordNewMaugiao = () => {
  const id = ulid();
  return (
    <RecordInputMaugiao
      key={id}
      value={{
        _id: id,
        kind: MAUGIAO,
      }}
    />
  );
};

export default RecordNewMaugiao;
