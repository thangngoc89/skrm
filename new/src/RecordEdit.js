import React from "react";
import { useDB } from "react-pouchdb";
import RecordInput from "./RecordInput";
import RecordInputMaugiao from "./RecordInputMaugiao";
import { TIEUHOC, MAUGIAO } from "./db";

let doc;

const useGet = recordId => {
  const db = useDB();

  if (!doc || doc._id !== recordId) {
    let promise = db
      .get(recordId)
      .then(result => {
        doc = result;
      })
      .catch(console.error);

    throw promise;
  } else {
    return doc;
  }
};

const RecordEdit = ({ recordId }) => {
  const doc = useGet(recordId);

  if (!doc) {
    return "Không tìm thấy hồ sơ với id " + recordId;
  } else {
    if (!doc.kind || doc.kind === TIEUHOC) {
      return <RecordInput key={recordId} value={doc} />;
    } else if (doc.kind === MAUGIAO) {
      return <RecordInputMaugiao key={recordId} value={doc} />;
    } else {
      return "Không tìm thấy hồ sơ với id " + recordId;
    }
  }
};

export default RecordEdit;
