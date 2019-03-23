import { Box, Heading, Text, Button } from "grommet";
import React, { Component } from "react";
import db from "./db";
import { navigate } from "@reach/router";

import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { ReactTabulator, reactFormatter } from "react-tabulator";

const Custom = ({ cell }) => {
  const id = cell._cell.value;
  const link = "/record/" + id;

  return (
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
    field: "id",
    headerSort: false,
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

const getDataForSave = () => {
  // const getDataForSave = () => {
  //   db.allDocs({ include_docs: true }).then(docs => {
  //     const processedData = docs.rows.map(r => r.doc);
  //     const blob = new Blob([JSON.stringify(processedData)], {
  //       type: "application/json",
  //     });
  //     saveAs(blob, "data.hmong");
  //   });
  // };

  import("./export_excel/export_excel")
    .then(({ createWorkbook }) => {
      db.allDocs({ include_docs: true }).then(docs => {
        const data = docs.rows.map(r => r.doc);
        createWorkbook(data);
      });
    })
    .catch(error => console.error(error));
};

export default class RecordList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    db.allDocs({ include_docs: true }).then(docs => {
      const processedDoc = docs.rows.map(row => {
        const doc = row.doc;

        const { phieuDieuTra = {}, bangCauHoi = {}, childOIDP = {} } = doc;

        return {
          id: row.id,
          hoVaTen: phieuDieuTra.hoVaTen,
          ngayKham: phieuDieuTra.ngayKham,
          nguoiKham: phieuDieuTra.nguoiKham,
          soHoSo: phieuDieuTra.soHoSo,
          phieuDieuTra: toStatus(phieuDieuTra.complete),
          bangCauHoi: toStatus(bangCauHoi.complete),
          childOIDP: toStatus(childOIDP.complete),
        };
      });

      this.setState({ data: processedDoc });
    });
  }

  render() {
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
            responsiveLayout: "collapse",
            placeholder: "No data sets",
          }}
          data={this.state.data}
          columns={columns}
          tooltips={true}
          layout={"fitColumns"}
        />
      </Box>
    );
  }
}
