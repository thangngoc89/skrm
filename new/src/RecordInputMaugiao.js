import React, { useState, useEffect } from "react";
import promiseRetry from "promise-retry";
import db from "./db";
import { Box, Select } from "grommet";
import * as Notify from "./Notify";
import PhieuDieuTra from "./exam_form/PDT_Maugiao";

const tabPhieuDieuTra = "phieuDieuTra";

const RecordInputMaugiao = ({ value }) => {
  const [isDirty, setDirty] = useState(false);
  const [doc, setDoc] = useState(value);

  const handleSave = (value, autosave = false) => {
    let tabValue = !autosave ? { ...value, complete: true } : value;
    let newDoc = {
      ...doc,
      [tabPhieuDieuTra]: tabValue,
    };
    return promiseRetry((retry, number) => {
      return db.put(newDoc).catch(response => {
        if (response.status === 409) {
          retry();
        } else {
          return response;
        }
      });
    })
      .then(response => {
        setDoc({
          ...doc,
          _rev: response.rev,
        });
      })
      .catch(err => {
        Notify.error("Có lỗi xảy ra khi lưu", "Vui lòng thử lại");
        console.log(err);
      });
  };

  return (
    <Box fill>
      <div
        id="footerAction"
        className="bg-accent-4 m-0 py-2 px-5 flex justify-between items-center flex-row-reverse"
      />
      <Box
        fill
        style={{ WebkitOverflowScrolling: "touch" }}
        pad="medium"
        overflow="auto"
      >
        <PhieuDieuTra
          initialValues={doc[tabPhieuDieuTra]}
          onSave={handleSave}
        />
      </Box>
    </Box>
  );
};

export default RecordInputMaugiao;
