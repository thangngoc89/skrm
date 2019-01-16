import React, { Component } from "react";
import ulid from "./ulid";
import PhieuDieuTra from "./exam_form/PhieuDieuTra_Main";
import db from "./db";
import { Box } from "grommet";

const stateDraft = "DRAFT";
const stateComplete = "COMPLETE";

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

      console.log(db);

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
        .catch(err => console.log(err));
    };
  };

  render() {
    const { currentTab } = this.state;
    return (
      <Box fill>
        {currentTab === 0 && <PhieuDieuTra onSave={this.handleSave(0)} />}
      </Box>
    );
  }
}

export default RecordNew;
