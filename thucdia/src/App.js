import React, { Component } from "react";
import "./App.css";
import { Layout } from "antd";
import HomePage from "./HomePage";
import FormChildrenController from "./Form_Children_Controller";
import FormAdultController from "./Form_Adult_Controller";
import { Router, Route, Switch, Link } from "react-router-dom";
import history from "./history";

const { Header, Content } = Layout;

const Children_School = props => <FormChildrenController hogiadinh={false} {...props} />;

const Children_Family = props => <FormChildrenController hogiadinh={true} {...props} />;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Layout className="layout">
            <Header>
              <div className="logo" />
              <ul className="ant-menu ant-menu-dark ant-menu-root ant-menu-horizontal" style={{ lineHeight: "64px" }}>
                <li className="ant-menu-item">
                  <Link to="/">Trang chủ</Link>
                </li>
                <li className="ant-menu-item">
                  <Link to="/tieu-hoc">Nhập trường tiểu học</Link>
                </li>
              </ul>
            </Header>
            <Content style={{ padding: "2rem", backgroundColor: "#fff" }}>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/tieu-hoc" component={Children_School} />
                <Route exact path="/gia-dinh/tre-em" component={Children_Family} />
                <Route exact path="/gia-dinh/nguoi-lon" component={FormAdultController} />
              </Switch>
            </Content>
          </Layout>
        </Router>
      </div>
    );
  }
}

export default App;
