import React, { useEffect, useReducer } from "react";
import { Box, Heading, Text, Button, Layer } from "grommet";
import db from "./db";
import { validate } from "./export_excel/validate";
import * as Notify from "./Notify";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/tabulator.min.css";
import { ReactTabulator, reactFormatter } from "react-tabulator";
import Spinner from "./Spinner.bs";
import { useFind } from "react-pouchdb";
import { Custom } from "./RecordManage/Actions";

const columns = [
  // {
  //   formatter: "responsiveCollapse",
  //   width: 30,
  //   minWidth: 30,
  //   align: "center",
  //   resizable: false,
  //   headerSort: false,
  // },
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
    case "EXPORT_VALIDATE_SUCCESS":
      return {
        ...state,
        exportState: { type: "VALIDATE_SUCCESS", payload: action.payload },
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

const ExportModal = ({ type, payload, close, onExport }) => {
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
              return (
                <li key={row.doc._id}>
                  {row.doc.phieuDieuTra && row.doc.phieuDieuTra.soHoSo}
                </li>
              );
            })}
          </ul>
          <Text >Vui lòng hoàn tất các bộ hồ sơ trước khi xuất dữ liệu</Text>
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
              onClick={onExport}
              primary
              color="brand"
            />
          </Box>
        </Box>
      );
    case "VALIDATE_SUCCESS":
      return (
        <Box pad="medium" gap="small" width="large" overflow="auto">
          <Heading level={3} margin="none">
            Xuất dữ liệu ra Excel
          </Heading>
          <Text>1. Kiểm tra dữ liệu</Text>
          <Text>2. Kiểm tra hoàn tất. Bấm "Xuất Excel" để tải dữ liệu về</Text>
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
                  <strong>Xuất Excel</strong>
                </Text>
              }
              onClick={onExport}
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

const mapDocToTable = doc => {
  const { phieuDieuTra = {}, bangCauHoi = {}, childOIDP = {} } = doc;

  const pdt = toStatus(phieuDieuTra.complete);
  const bch = toStatus(bangCauHoi.complete);
  const co = toStatus(childOIDP.complete);

  return {
    id: doc._id,
    hoVaTen: phieuDieuTra.hoVaTen,
    ngayKham: phieuDieuTra.ngayKham,
    nguoiKham: phieuDieuTra.nguoiKham,
    soHoSo: phieuDieuTra.soHoSo,
    phieuDieuTra: pdt,
    bangCauHoi: bch,
    childOIDP: co,
    done: pdt && bch && co,
  };
};

const RecordManage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInitExport = async () => {
    try {
      dispatch({ type: "EXPORT_LOADING" });
      const docs = await db.allDocs({ include_docs: true, descending: true });
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

      if (hasError.length !== 0) {
        dispatch({
          type: "EXPORT_VALIDATE_ERROR",
          payload: {
            hasError,
            data,
          },
        });
      } else {
        dispatch({
          type: "EXPORT_VALIDATE_SUCCESS",
          payload: {
            data,
          },
        });
      }
    } catch (error) {
      console.error(error);
      Notify.error(
        "Có lỗi xảy ra khi xuất dữ liệu",
        "Trong khi chờ khắc phục lỗi, vui lòng không xóa dữ liệu trình duyệt web"
      );
    }
  };

  const handleExport = async () => {
    try {
      const data = state.exportState.payload.data;
      const { createWorkbook } = await import("./export_excel/export_excel");
      createWorkbook(data);
    } catch (error) {
      console.error(error);
      Notify.error(
        "Có lỗi xảy ra khi tạo file Excel",
        "Lỗi này thường do xuất các bộ hồ sơ chưa hoàn tất. Vui lòng hoàn thành các bộ hồ sơ trước khi xuất"
      );
    }
  };

  const docs = useFind({
    selector: {
      _id: { $gte: null },
    },
    sort: [{ _id: "desc" }],
  }).map(mapDocToTable);

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
        <Button primary label="Download Excel" onClick={handleInitExport} />
      </Box>
      <ReactTabulator
        options={{
          height: 500,
          // responsiveLayout: "collapse",
          placeholder: "Chưa có dữ liệu",
          persistentSort: true,
          persistentFilter: true,
        }}
        data={docs}
        columns={columns}
        layout={"fitColumns"}
      />

      {showExportModal && (
        <Layer
          position="center"
          modal
          onClickOutside={closeExportModal}
          onEsc={closeExportModal}
          margin="large"
        >
          <ExportModal
            type={state.exportState.type}
            payload={state.exportState.payload}
            close={closeExportModal}
            onExport={handleExport}
          />
        </Layer>
      )}
    </Box>
  );
};

export default RecordManage;
