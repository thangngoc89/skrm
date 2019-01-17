import { Box, DataTable, Heading, Text, Button } from "grommet";
import React, { Component } from "react";
import db from "./db";
import { Checkmark, Clear, Alert } from "grommet-icons";
import { navigate } from "@reach/router";

const RenderFormStatus = ({ status }) => {
  switch (status) {
    case "COMPLETE":
      return <Checkmark color="status-ok" />;
    case "DRAFT":
      return <Alert color="status-warning" />;
    case "EMPTY":
      return <Clear color="dark-3" />;
    default:
      return status;
  }
};

const RenderEmptyText = ({ value, ...props }) => {
  if (value == "") {
    return <Text color="status-error">???</Text>;
  } else {
    return <Text {...props}>{value}</Text>;
  }
};
const toStatus = draft => {
  switch (typeof draft) {
    case "boolean":
      if (draft) {
        return "DRAFT";
      } else {
        return "COMPLETE";
      }
    default:
      return "EMPTY";
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
      const processedDoc = docs.rows.map(row => {
        const doc = row.doc;

        const { phieuDieuTra = {}, bangCauHoi = {} } = doc;

        return {
          id: row.id,
          hoVaTen: phieuDieuTra.hoVaTen,
          nguoiKham: phieuDieuTra.nguoiKham,
          soHoSo: phieuDieuTra.soHoSo,
          phieuDieuTra: toStatus(phieuDieuTra.draft),
          bangCauHoi: toStatus(bangCauHoi.draft),
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
          justify="end"
          gap="medium"
          margin={{ bottom: "small" }}
        >
          <Box direction="row" align="center" gap="xsmall">
            <Checkmark color="status-ok" />
            Hoàn tất
          </Box>

          <Box direction="row" align="center" gap="xsmall">
            <Alert color="status-warning" /> Nháp
          </Box>
          <Box direction="row" align="center" gap="xsmall">
            <Clear color="dark-3" /> Chưa điền
          </Box>
        </Box>
        <DataTable
          primaryKey="id"
          size="medium"
          columns={[
            {
              property: "soHoSo",
              header: "Số hồ sơ",
              render: datum => (
                <RenderEmptyText value={datum.soHoSo} weight="bold" />
              ),
            },
            {
              property: "nguoiKham",
              header: "Người khám",
              render: datum => (
                <RenderEmptyText value={datum.nguoiKham} weight="bold" />
              ),
            },
            {
              property: "hoVaTen",
              header: "Họ và tên",
              render: datum => <RenderEmptyText value={datum.hoVaTen} />,
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
            {
              render: datum => (
                <>
                  <Button
                    label="Sửa"
                    color="accent-1"
                    onClick={() => navigate("/record/" + datum.id)}
                  />
                </>
              ),
            },
          ]}
          data={this.state.data}
        />
      </Box>
    );
  }
}
