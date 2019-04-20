import React from "react";
import { Box, Heading, Text, Button, Layer } from "grommet";
import db from "../db";
import { navigate } from "@reach/router";
import * as Notify from "../Notify";

export const Custom = ({ cell }) => {
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
                      Notify.success(
                        "Đã xóa hồ sơ " + cell._cell.row.data.soHoSo
                      );
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

export default Custom;
