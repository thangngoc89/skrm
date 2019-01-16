import React, { Component } from "react";
import PhieuDieuTra from "./exam_form/PhieuDieuTra_Main";
import BangCauHoi from "./questions/Render_question_form";
import db from "./db";
import { Box, Text } from "grommet";

const tabPhieuDieuTra = "phieuDieuTra";
const tabBangCauHoi = "bangCauHoi";
const tabChildOIDP = "childOIDP";

const tabToName = tab => {
  switch (tab) {
    case 0:
      return tabPhieuDieuTra;
    case 1:
      return tabBangCauHoi;
    case 2:
      return tabChildOIDP;
    default:
      throw new Error("Unknown tab id");
  }
};

class RecordInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordValue: props.value,
      currentTab: 0,
    };
  }

  nextTab = () => {
    const currentTab = this.state.currentTab;
    if (currentTab < 2) {
      this.setState({ currentTab: currentTab + 1 });
    } else {
      this.handleSubmit();
    }
  };

  handleSave = tab => {
    return (value, draft = false) => {
      let tabName = tabToName(tab);

      let doc = this.state.recordValue;

      doc[tabName] = value;

      return db
        .put(doc)
        .then(status => {
          this.setState(
            {
              recordValue: {
                ...doc,
                _rev: status.rev,
              },
            },
            () => {
              this.nextTab();
            }
          );
        })
        .catch(err => console.log(err));
    };
  };

  render() {
    const { currentTab } = this.state;
    return (
      <>
        <Box style={{ WebkitOverflowScrolling: "touch" }} pad="medium">
          {currentTab === 0 && <PhieuDieuTra onSave={this.handleSave(0)} />}
          {currentTab === 1 && <BangCauHoi onSave={this.handleSave(1)} />}
          {currentTab === 2 && "unimplemented"}
        </Box>
        <Box
          className="fixed pin-b pin-r pin-l z-20"
          background="brand"
          justify="between"
          direction="row"
          align="center"
          pad={{
            left: "medium",
            top: "xxsmall",
            bottom: "xxsmall",
            right: "xxsmall",
          }}
        >
          <Text weight="bold">
            {currentTab === 0 && "Phiếu điều tra"}
            {currentTab === 1 && "Bảng câu hỏi"}
            {currentTab === 2 && "Child-OIDP"}
            {currentTab === 3 && "Kiểm tra thông tin"}
          </Text>
          <div id="footerAction" />
        </Box>
      </>
    );
  }
}

class RecordInputContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordState: { type: "INITIAL" },
    };
  }

  componentDidMount() {
    const recordId = this.props.id;
    this.setState({ recordState: { type: "LOADING" } }, () => {
      db.get(recordId)
        .catch(err => {
          if (err.name === "not_found") {
            return {
              _id: recordId,
            };
          } else {
            throw err;
          }
        })
        .then(doc =>
          this.setState({ recordState: { type: "LOADED", value: doc } })
        )
        .catch(err => console.error(err));
    });
  }

  render() {
    switch (this.state.recordState.type) {
      case "INITIAL":
      case "LOADING":
        return "Loading...";
      case "LOADED":
        return <RecordInput value={this.state.recordState.value} />;
    }
  }
}
export default RecordInputContainer;
