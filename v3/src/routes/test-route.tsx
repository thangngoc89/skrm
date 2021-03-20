import { FunctionalComponent, h } from "preact";
import style from "./test-route.css";
import { Table } from "@trussworks/react-uswds";
// import List from "../components/form_schema/"

const Testroute: FunctionalComponent<{}> = () => {
  return (
    <div>
      <Table bordered fullWidth caption="This table uses the fullWidth prop to increase to 100% width">
        <thead>
          <tr>
            <td></td>
            <th scope="col">Nhai</th>
            <th scope="col">NC</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">17</th>
            <td>1</td>
            <th scope="row">0</th>
          </tr>
          <tr>
            <th scope="row">15</th>
            <td>1</td>
            <th scope="row">0</th>
          </tr>
          <tr>
            <th scope="row">16</th>
            <td>1</td>
            <th scope="row">0</th>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Testroute;
