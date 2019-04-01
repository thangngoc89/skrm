import React, { useEffect, useState } from "react";
import { useDB } from "react-pouchdb";
import RecordInput from "./RecordInput";

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
    return <RecordInput key={recordId} value={doc} />;
  }
};

export default RecordEdit;
