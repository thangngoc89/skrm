import React, { Component } from "react";
import ulid from "./ulid";
import PhieuDieuTra from "./exam_form/PhieuDieuTra_Main";
import BangCauHoi from "./questions/Render_question_form";
import db from "./db";
import { Box } from "grommet";

const stateDraft = "DRAFT";
const stateComplete = "COMPLETE";

const tabPhieuDieuTra = "phieuDieuTra";
const tabBangCauHoi = "bangCauHoi";
const tabChildOIDP = "childOIDP";

const statusToColor = status => {
  switch (status) {
    case "success":
      return "status-ok";
    case "warning":
      return "status-warning";
    case "active":
      return "brand";
    case "error":
      return "status-error";
    case "inactive":
      return "dark-4";
    default:
      return "";
  }
};
const Pill = ({ label, status }) => {
  let color = statusToColor(status);
  let textColor = "text-" + color;
  let bgColor = "bg-" + color;
  return (
    <button className={"flex flex-col mr-2 lg:mr-4 text-xs " + textColor}>
      <div className="mb-1"> {label} </div>
      <div className={"w-full h-1 rounded " + bgColor} />
    </button>
  );
};

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

class RecordNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordId: props.id || ulid(),
      currentTab: 0,

      phieuDieuTra: null,
      bangCauHoi: null,
      childOIDP: null,
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

      return db
        .get(this.state.recordId)
        .catch(err => {
          if (err.name === "not_found") {
            return {
              _id: this.state.recordId,
            };
          } else {
            throw err;
          }
        })
        .then(doc => {
          doc[tabName] = {
            status: stateDraft,
            value,
          };
          return db.put(doc);
        })
        .then(() => {
          this.nextTab();
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
          {currentTab === 1 && <BangCauHoi onSave={this.handleSave(0)} />}
          {currentTab === 2 && "unimplemented"}
        </Box>
        <Box
          className="fixed pin-b pin-r pin-l z-20"
          background="brand"
          justify="end"
          direction="row"
          align="center"
          pad="xxsmall"
        >
          <div id="footerAction" />
        </Box>
      </>
    );
  }
}

export default RecordNew;
