import React from "react";
import { Box, Button, Heading } from "grommet";
import { navigate } from "@reach/router";
import { Database, AddCircle } from "grommet-icons";

export default function Homepage() {
  return (
    <Box pad="medium">
      <Box margin={{ vertical: "large" }}>
        <Heading level={1} textAlign="center">
          Fang - Quản lí dữ liệu SKRM
        </Heading>
      </Box>

      <Heading level={3}>Chọn chức năng</Heading>
      <Box gap="large" direction="row" margin={{ vertical: "medium" }}>
        <Button
          className="h-16 w-full text-lg font-bold flex justify-center content-center"
          primary
          color="accent-1"
          href="/new"
          label="Thêm hồ sơ"
          icon={<AddCircle />}
          onClick={event => {
            event.preventDefault();
            navigate("/new");
          }}
        />
        <Button
        primary
        color="accent-1"
          className="h-16 w-full text-lg font-bold flex justify-center content-center"
          href="/manage"
          label="Quản lí hồ sơ"
          icon={<Database />}
          size="large"
          onClick={event => {
            event.preventDefault();
            navigate("/manage");
          }}
        />
      </Box>
    </Box>
  );
}
