import React from "react";
import { Box, Button, Heading } from "grommet";
import { navigate } from "@reach/router";
import { Database, AddCircle } from "grommet-icons";
import styled from "styled-components";

const PrimaryButton = styled(Button)`
  height: 4rem;
  width: 100%;
  font-size: 1.125rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-content: center;
`;

export default function Homepage() {
  return (
    <Box pad="medium">
      <Box margin={{ vertical: "large" }}>
        <Heading level={1} textAlign="center">
          VOSER - Quản lí dữ liệu SKRM
        </Heading>
      </Box>

      <Heading level={2}>Chọn chức năng</Heading>
      <Box
        gap="large"
        direction="row-responsive"
        margin={{ vertical: "medium" }}
      >
        <PrimaryButton
          primary
          color="accent-1"
          href="/new"
          label="Thêm tiểu học"
          icon={<AddCircle />}
          onClick={event => {
            event.preventDefault();
            navigate("/new");
          }}
        />
        <PrimaryButton
          primary
          color="accent-1"
          href="/new/maugiao"
          label="Thêm mẫu giáo"
          icon={<AddCircle />}
          onClick={event => {
            event.preventDefault();
            navigate("/new/maugiao");
          }}
        />
      </Box>
      <Box
        gap="large"
        direction="row-responsive"
        margin={{ vertical: "medium" }}
      >
        <PrimaryButton
          primary
          color="accent-1"
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
