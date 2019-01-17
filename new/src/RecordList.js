import { Box, DataTable } from "grommet";
import React, { Component } from "react";
import db from "./db";
import { Checkmark, Flag } from "grommet-icons";

const RenderFormStatus = ({ status }) => {
  switch (status) {
    case "COMPLETE":
      return <Checkmark color="status-ok" />;
    case "DRAFT":
      return <Flag color="status-warning" />;
    default:
      return status;
  }
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
      console.log(docs);
      const processedDoc = docs.rows.map(row => {
        const doc = row.doc;

        const { phieuDieuTra = {}, bangCauHoi = {} } = doc;

        return {
          id: row.id,
          hoVaTen: phieuDieuTra.hoVaTen,
          soHoSo: phieuDieuTra.soHoSo,
          phieuDieuTra: phieuDieuTra.draft ? "DRAFT" : "COMPLETE",
          bangCauHoi: bangCauHoi.draft ? "DRAFT" : "COMPLETE",
        };
      });

      this.setState({ data: processedDoc });
    });
  }
  render() {
    return (
      <Box align="center" pad="medium">
        <DataTable
          primaryKey="id"
          size="medium"
          columns={[
            {
              primary: true,
              property: "soHoSo",
              header: "Số hồ sơ",
            },
            {
              property: "hoVaTen",
              header: "Họ và tên",
            },
            {
              property: "phieuDieuTra",
              header: "Phiếu điều tra",
              align: "center",
              render: datum => <RenderFormStatus status={datum.phieuDieuTra} />,
            },
            {
              property: "bangCauHoi",
              header: "Bảng câu hỏi",
              align: "center",
              render: datum => <RenderFormStatus status={datum.bangCauHoi} />,
            },
          ]}
          data={this.state.data}
        />
      </Box>
    );
  }
}
