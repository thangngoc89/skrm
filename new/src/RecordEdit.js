import React from "react";
import { useGet } from "react-pouchdb";
import { Box } from "grommet";
import RecordInput from "./RecordInput";

const RecordEdit = ({ recordId }) => {
  const doc = useGet({ id: recordId });

  if (!doc) {
    return "Không tìm thấy hồ sơ với id " + recordId;
  } else {
    return <RecordInput value={doc} />;
  }
};

export default RecordEdit;
