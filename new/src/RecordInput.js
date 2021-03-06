import React, { Component } from "react";
import PhieuDieuTra from "./exam_form/PhieuDieuTra_Main";
import BangCauHoi from "./questions/Render_question_form";
import ChildOIDP from "./forms/Form_ChildOIDP";
import promiseRetry from "promise-retry";
import db from "./db";
import { Box, Select } from "grommet";
import * as Notify from "./Notify";
const tabPhieuDieuTra = "phieuDieuTra";
const tabBangCauHoi = "bangCauHoi";
const tabChildOIDP = "childOIDP";

const tabs = [
  { label: "Phiếu điều tra", value: tabPhieuDieuTra },
  { label: "Bảng câu hỏi", value: tabBangCauHoi },
  { label: "Child-OIDP", value: tabChildOIDP },
];

class RecordInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordValue: props.value,
      currentTab: tabs[0],
    };
  }

  changeTab = tab => {
    this.setState({ currentTab: tab });
  };

  nextTab = () => {
    const currentTab = this.state.currentTab;
    const currentTabIndex = tabs.findIndex(
      ({ value }) => value === currentTab.value
    );
    if (currentTabIndex < 2) {
      this.setState({ currentTab: tabs[currentTabIndex + 1] });
    }
  };

  handleSave = tabName => {
    return (value, autosave = false) => {
      let doc = this.state.recordValue;

      let tabValue = !autosave ? { ...value, complete: true } : value;

      doc[tabName] = tabValue;

      return promiseRetry((retry, number) => {
        return db.put(doc).catch(response => {
          if (response.status === 409) {
            retry();
          } else {
            return response;
          }
        });
      })
        .then(response => {
          this.setState(
            {
              recordValue: {
                ...doc,
                _rev: response.rev,
              },
            },
            () => {
              if (!autosave) {
                this.nextTab();
              }
            }
          );
        })
        .catch(err => {
          Notify.error("Có lỗi xảy ra khi lưu", "Vui lòng thử lại");
          console.log(err);
        });
    };
  };

  render() {
    const { currentTab, recordValue } = this.state;
    const { value: currentTabValue } = currentTab;
    return (
      <Box fill>
        <Box
          background="brand"
          pad={{ horizontal: "medium", vertical: "small" }}
          direction="row-responsive"
          justify="between"
          align="center"
        >
          <Select
            id="select"
            name="select"
            placeholder="Select"
            options={tabs}
            valueKey="value"
            labelKey="label"
            value={currentTab}
            onChange={({ option }) => {
              this.changeTab(option);
            }}
          />
          <div id="footerAction" className="mt-2 mb-4 md:m-0" />
        </Box>
        <Box
          fill
          style={{ WebkitOverflowScrolling: "touch" }}
          pad="medium"
          overflow="auto"
        >
          {currentTabValue === tabPhieuDieuTra && (
            <PhieuDieuTra
              initialValues={recordValue.phieuDieuTra}
              onSave={this.handleSave(tabPhieuDieuTra)}
            />
          )}
          {currentTabValue === tabBangCauHoi && (
            <BangCauHoi
              initialValues={recordValue.bangCauHoi}
              onSave={this.handleSave(tabBangCauHoi)}
            />
          )}
          {currentTabValue === tabChildOIDP && (
            <ChildOIDP
              initialValues={recordValue.childOIDP}
              onSave={this.handleSave(tabChildOIDP)}
            />
          )}
        </Box>
      </Box>
    );
  }
}

export default RecordInput;
