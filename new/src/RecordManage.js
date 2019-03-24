import React, { Component, useState, useEffect, useReducer } from "react";
import { Box, Heading, Text, Button, Layer } from "grommet";
import db from "./db";
import { navigate } from "@reach/router";
import { schema, validate } from "./export_excel/validate";
import * as Notify from "./Notify";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { ReactTabulator, reactFormatter } from "react-tabulator";

const Custom = ({ cell }) => {
  const id = cell._cell.value;
  const link = "/record/" + id;
  const [show, setShow] = React.useState(false);

  const close = () => setShow(false);
  const open = () => setShow(true);

  return (
    <>
      <a
        href={link}
        className="text-brand no-underline font-bold"
        onClick={event => {
          event.preventDefault();
          navigate("/record/" + id);
        }}
      >
        Sửa
      </a>
      <span className="mx-2"> - </span>
      <button className="text-status-critical font-bold" onClick={open}>
        Xóa
      </button>

      {show && (
        <Layer position="center" modal onClickOutside={close} onEsc={close}>
          <Box pad="medium" gap="small" width="medium">
            <Heading level={3} margin="none">
              Xác nhận xóa hồ sơ
            </Heading>
            <Text>
              Bạn có muốn xóa hồ sơ{" "}
              <strong>{cell._cell.row.data.soHoSo || "________"}</strong>?
              <br />- Họ và tên:{" "}
              <strong>{cell._cell.row.data.hoVaTen || "________"}</strong>
              <br />- Người khám:{" "}
              <strong>{cell._cell.row.data.nguoiKham || "________"}</strong>
            </Text>
            <Box
              as="footer"
              gap="small"
              direction="row"
              align="center"
              justify="end"
              pad={{ top: "medium", bottom: "small" }}
            >
              <Button label="Thoát" onClick={close} color="dark-3" />
              <Button
                label={
                  <Text color="white">
                    <strong>Xóa</strong>
                  </Text>
                }
                onClick={() =>
                  db
                    .get(id)
                    .then(function(doc) {
                      return db.remove(doc);
                    })
                    .then(() => {
                      Notify.success("Xóa hồ sơ thành công");
                      close();
                    })
                    .catch(error => {
                      console.error(error);
                      Notify.error(
                        "Xóa hồ sơ không thành công",
                        "Vui lòng thử lại sau"
                      );
                    })
                }
                primary
                color="status-critical"
              />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};
const columns = [
  {
    formatter: "responsiveCollapse",
    width: 30,
    minWidth: 30,
    align: "center",
    resizable: false,
    headerSort: false,
  },
  {
    title: "SHS",
    field: "soHoSo",
    align: "center",
    width: 80,
    // headerVertical: true,
    headerFilter: "input",
    resizable: false,
  },
  {
    title: "Họ và tên",
    field: "hoVaTen",
    headerFilter: "input",
    minWidth: 300,
  },
  {
    title: "Người khám",
    field: "nguoiKham",
    minWidth: 100,
    headerFilter: "input",
    responsive: 1,
  },
  {
    title: "Ngày khám",
    field: "ngayKham",
    minWidth: 100,
    headerFilter: "input",
    responsive: 1,
  },
  {
    title: "Phiếu điều tra",
    field: "phieuDieuTra",
    formatter: "tickCross",
    align: "center",
    width: 50,
    headerVertical: true,
    responsive: 2,
  },
  {
    title: "Bảng câu hỏi",
    field: "bangCauHoi",
    formatter: "tickCross",
    align: "center",
    width: 50,
    headerVertical: true,
    responsive: 2,
  },
  {
    title: "Child-OIDP",
    field: "childOIDP",
    formatter: "tickCross",
    align: "center",
    width: 50,
    headerVertical: true,
    responsive: 2,
  },
  {
    title: "Hoàn tất",
    field: "done",
    formatter: "tickCross",
    align: "center",
    width: 50,
    headerVertical: true,
    responsive: 2,
  },
  {
    field: "id",
    headerSort: false,
    minWidth: 100,
    formatter: reactFormatter(<Custom />),
  },
];

const toStatus = complete => {
  if (typeof complete === "boolean" && complete) {
    return true;
  } else {
    return false;
  }
};

const getDataForSave = async () => {
  // const getDataForSave = () => {
  //   db.allDocs({ include_docs: true }).then(docs => {
  //     const processedData = docs.rows.map(r => r.doc);
  //     const blob = new Blob([JSON.stringify(processedData)], {
  //       type: "application/json",
  //     });
  //     saveAs(blob, "data.hmong");
  //   });
  // };
  // db.allDocs({ include_docs: true })
  //   .then(docs => {
  //     const data = docs.rows.map(r => r.doc);
  //     return validate(data[1]);
  //   })
  //   .then(console.log)
  //   .catch(console.error);
  try {
    const docs = await db.allDocs({ include_docs: true });
    const data = docs.rows.map(r => r.doc);
    const result = await Promise.all(data.map(row => validate(row)));

    await db.bulkDocs(
      result.map(row => {
        const doc = row.doc;
        if (doc.phieuDieuTra) {
          doc.phieuDieuTra.complete = row.phieuDieuTra;
        }
        if (doc.bangCauHoi) {
          doc.bangCauHoi.complete = row.bangCauHoi;
        }
        if (doc.childOIDP) {
          doc.childOIDP.complete = row.childOIDP;
        }
        return doc;
      })
    );

    const { createWorkbook } = await import("./export_excel/export_excel");
    // createWorkbook(data);
  } catch (error) {
    console.error(error);
    Notify.error(
      "Có lỗi xảy ra khi xuất dữ liệu",
      "Trong khi chờ khắc phục lỗi, vui lòng không xóa dữ liệu trình duyệt web"
    );
  }
};

const initialState = { data: [], exportState: "INITIAL" };

function reducer(state, action) {
  switch (action.type) {
    case "update":
      return { data: action.payload };
    default:
      throw new Error();
  }
}
const RecordManage = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const changes = db
      .changes({
        since: "now",
        live: true,
      })
      .on("change", change => {
        if (change.deleted) {
          const currentDataSet = state.data;
          dispatch({
            type: "update",
            payload: currentDataSet.filter(r => r.id !== change.id),
          });
        }
      })
      // .on("complete", function(info) {
      //   // changes() was canceled
      // })
      .on("error", function(err) {
        console.log(err);
      });
    return changes.cancel;
  }, []);

  useEffect(() => {
    db.allDocs({ include_docs: true })
      .then(docs => {
        const processedDoc = docs.rows.map(row => {
          const doc = row.doc;

          const { phieuDieuTra = {}, bangCauHoi = {}, childOIDP = {} } = doc;

          const pdt = toStatus(phieuDieuTra.complete);
          const bch = toStatus(bangCauHoi.complete);
          const co = toStatus(childOIDP.complete);

          return {
            id: row.id,
            hoVaTen: phieuDieuTra.hoVaTen,
            ngayKham: phieuDieuTra.ngayKham,
            nguoiKham: phieuDieuTra.nguoiKham,
            soHoSo: phieuDieuTra.soHoSo,
            phieuDieuTra: pdt,
            bangCauHoi: bch,
            childOIDP: co,
            done: pdt && bch && co,
          };
        });

        dispatch({ type: "update", payload: processedDoc });
      })
      .catch(console.error);
  }, []);

  return (
    <Box pad="medium">
      <Box margin={{ vertical: "large" }}>
        <Heading level="1" align="left">
          Quản lí hồ sơ
        </Heading>
        <Text size="large" color="dark-1">
          Liệt kê, sửa và tạo hồ sơ
        </Text>
      </Box>

      <Box
        direction="row"
        align="center"
        justify="between"
        margin={{ bottom: "small" }}
      >
        <Button
          primary
          label="Download Excel"
          onClick={() => {
            getDataForSave();
          }}
        />
      </Box>
      <ReactTabulator
        options={{
          height: 500,
          responsiveLayout: "collapse",
          placeholder: "No data sets",
        }}
        data={state.data}
        columns={columns}
        tooltips={true}
        layout={"fitColumns"}
      />
    </Box>
  );
};
export default RecordManage;
