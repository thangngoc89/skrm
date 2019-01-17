import React from "react";
import { useGet } from "react-pouchdb";
import { Box } from "grommet";
import RecordInput from "./RecordInput";

const RecordEdit = ({ recordId }) => {
  const doc = useGet({ id: recordId });

  return (
    <Box>
      {!doc ? (
        "Không tìm thấy hồ sơ với id " + recordId
      ) : (
        <RecordInput value={doc} />
      )}
    </Box>
  );
};

export default RecordEdit;
