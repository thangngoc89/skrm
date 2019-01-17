import React, { Component } from "react";
import RecordInput from "./RecordInput";
import ulid from "./ulid";

const RecordNew = () => {
  const id = ulid();
  return <RecordInput id={id} key={id} new />;
};

export default RecordNew;
