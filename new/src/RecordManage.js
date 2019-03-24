import React, { useEffect, useReducer } from "react";
import { Box, Heading, Text, Button, Layer } from "grommet";
import db from "./db";
import { navigate } from "@reach/router";
import { schema, validate } from "./export_excel/validate";
import * as Notify from "./Notify";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { ReactTabulator, reactFormatter } from "react-tabulator";
import Spinner from "./Spinner";

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

const initialState = { data: [], exportState: { type: "HIDDEN" } };

function reducer(state, action) {
  switch (action.type) {
    case "DATA_UPDATE":
      return { ...state, data: action.payload };
    case "DATA_ROW_DELETE":
      return {
        ...state,
        data: state.data.filter(r => r.id !== action.payload),
      };
    case "EXPORT_LOADING":
      return { ...state, exportState: { type: "LOADING" } };
    case "EXPORT_VALIDATE_ERROR":
      return {
        ...state,
        exportState: { type: "VALIDATE_ERROR", payload: action.payload },
      };
    case "EXPORT_HIDDEN":
      return {
        ...state,
        exportState: { type: "HIDDEN" },
      };
    default:
      throw new Error();
  }
}

const ExportModal = ({ type, payload, close, onExportAnyway }) => {
  switch (type) {
    case "LOADING":
      return (
        <Box pad="medium" gap="small" width="large" overflow="auto">
          <Heading level={3} margin="none">
            Xuất dữ liệu ra Excel
          </Heading>
          <Text>1. Kiểm tra dữ liệu</Text>
          <Spinner />
        </Box>
      );
    case "VALIDATE_ERROR":
      return (
        <Box pad="medium" gap="small" width="large" overflow="auto">
          <Heading level={3} margin="none">
            Xuất dữ liệu ra Excel
          </Heading>
          <Text>1. Kiểm tra dữ liệu</Text>
          <Text>2. Những hồ sơ sau đây chưa được hoàn thành:</Text>
          <ul>
            {payload.hasError.map(row => {
              return <li key={row.doc._id}>{row.doc.phieuDieuTra.soHoSo}</li>;
            })}
          </ul>
          <Text>Vui lòng hoàn tất các bộ hồ sơ trước khi xuất dữ liệu</Text>
          <Box
            as="footer"
            gap="small"
            direction="row"
            align="center"
            justify="end"
            pad={{ top: "medium", bottom: "large" }}
          >
            <Button label="Thoát" onClick={close} color="dark-3" />
            <Button
              label={
                <Text color="white">
                  <strong>Export anyway</strong>
                </Text>
              }
              onClick={onExportAnyway}
              primary
              color="brand"
            />
          </Box>
        </Box>
      );
    case "HIDDEN":
    default:
      return null;
  }
};
const RecordManage = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleExport = async () => {
    try {
      dispatch({ type: "EXPORT_LOADING" });
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
      const hasError = result.filter(r => {
        return !(r.phieuDieuTra && r.bangCauHoi && r.childOIDP);
      });

      dispatch({
        type: "EXPORT_VALIDATE_ERROR",
        payload: {
          hasError,
          data,
        },
      });
    } catch (error) {
      console.error(error);
      Notify.error(
        "Có lỗi xảy ra khi xuất dữ liệu",
        "Trong khi chờ khắc phục lỗi, vui lòng không xóa dữ liệu trình duyệt web"
      );
    }
  };

  const handleExportAnyway = async () => {
    try {
      const data = state.exportState.payload.data;
      const { createWorkbook } = await import("./export_excel/export_excel");
      createWorkbook(data);
    } catch (error) {
      console.error(error);
      Notify.error(
        "Có lỗi xảy ra khi tạo file Excel",
        "Lỗi này thường do bạn xuất các bộ hồ sơ chưa hoàn tất. Vui lòng hoàn thành các bộ hồ sơ trước khi xuất"
      );
    }
  };

  useEffect(() => {
    let canceled = false;
    const changes = db
      .changes({
        since: "now",
        live: true,
      })
      .on("change", change => {
        if (change.deleted) {
          dispatch({
            type: "DATA_ROW_DELETE",
            payload: change.id,
          });
        }
      })
      .on("complete", function(info) {
        canceled = true;
      })
      .on("error", function(err) {
        console.log(err);
      });
    return () => {
      if (!canceled) {
        canceled = true;
        changes.cancel();
      }
    };
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

        dispatch({ type: "DATA_UPDATE", payload: processedDoc });
      })
      .catch(console.error);
  }, []);

  const showExportModal = state.exportState.type !== "HIDDEN";
  const closeExportModal = () => dispatch({ type: "EXPORT_HIDDEN" });
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
        <Button primary label="Download Excel" onClick={handleExport} />
      </Box>
      <ReactTabulator
        options={{
          height: 500,
          responsiveLayout: "collapse",
          placeholder: "Chưa có dữ liệu",
          tooltip: true,
        }}
        data={state.data}
        columns={columns}
        layout={"fitColumns"}
      />

      {showExportModal && (
        <Layer
          position="center"
          modal
          // onClickOutside={closeExportModal}
          // onEsc={closeExportModal}
          margin="large"
        >
          <ExportModal
            type={state.exportState.type}
            payload={state.exportState.payload}
            close={closeExportModal}
            onExportAnyway={handleExportAnyway}
          />
        </Layer>
      )}
    </Box>
  );
};

export default RecordManage;
