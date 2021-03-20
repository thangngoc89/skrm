import { h, FunctionComponent } from "preact";
import { Table } from "@trussworks/react-uswds";
import { Field, FieldProps, useFormikContext } from "formik";
import { SelectOneDropdown } from "./FormComponents";
import { List } from "../form_schema/schema";

interface Props {
  name: string;
  lists: List;
  label?: string;
}

export const DentalArchTable: React.FC<Props> = ({ name, lists, label }) => {
  const context = useFormikContext();
  console.log(context);
  return (
    <Table bordered fullWidth caption={label}>
      <thead>
        <tr>
          <td></td>
          <th scope="col">Nhai</th>
          <th scope="col">N</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">17</th>
          <td>
            <SelectOneDropdown name="17_Nhai" choices={lists.tinhtrang}></SelectOneDropdown>
          </td>
          <td>
            <SelectOneDropdown name="17_N" choices={lists.tinhtrang}></SelectOneDropdown>
          </td>
        </tr>
        <tr>
          <th scope="row">16</th>
          <td>
            <SelectOneDropdown name="16_Nhai" choices={lists.tinhtrang}></SelectOneDropdown>
          </td>
          <td>
            <SelectOneDropdown name="16_N" choices={lists.tinhtrang}></SelectOneDropdown>
          </td>
        </tr>
        <tr>
          <th scope="row">15</th>
          <td>
            <SelectOneDropdown name="15_Nhai" choices={lists.tinhtrang}></SelectOneDropdown>
          </td>
          <td>
            <SelectOneDropdown name="15_N" choices={lists.tinhtrang}></SelectOneDropdown>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};
