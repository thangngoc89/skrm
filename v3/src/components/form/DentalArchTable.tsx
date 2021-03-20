import { h } from "preact";
import { useMemo } from "react";
import { Table } from "@trussworks/react-uswds";
import { SelectOneDropdown } from "./FormComponents";
import { List, Field } from "../form_schema/schema";
import style from "./DentalArchTable.css";

interface Props {
  name: string;
  lists: List;
  label?: string;
  headers: Array<string>;
  rowHeaders: Array<string>;
  alternativeRowHeaders: Array<string>;
  fields: Array<Field>;
}

export const DentalArchTable: React.FC<Props> = ({
  name,
  lists,
  label,
  headers,
  rowHeaders,
  alternativeRowHeaders,
}) => {
  // const context = useFormikContext();
  // console.log(context);
  const headerLength = useMemo(() => headers.length, [headers]);

  return (
    <Table bordered fullWidth caption={label}>
      <thead>
        <tr>{headers.map((header) => (header === "" ? <td></td> : <th scope="col">{header}</th>))}</tr>
      </thead>
      <tbody className={style.tbody}>
        <tr>
          <th scope="row">17</th>
          <td>
            <SelectOneDropdown name="17_Nhai" choices={lists.tinhtrang}></SelectOneDropdown>
          </td>
          <td>
            <SelectOneDropdown name="17_N" choices={lists.tinhtrang}></SelectOneDropdown>
          </td>
          <td>
            <SelectOneDropdown name="17_T" choices={lists.tinhtrang}></SelectOneDropdown>
          </td>
          <td>
            <SelectOneDropdown name="17_G" choices={lists.tinhtrang}></SelectOneDropdown>
          </td>
          <td>
            <SelectOneDropdown name="17_X" choices={lists.tinhtrang}></SelectOneDropdown>
          </td>
          <td>
            <SelectOneDropdown name="17_TT" choices={lists.tinhtrang}></SelectOneDropdown>
          </td>
          <td>
            <SelectOneDropdown name="17_NC" choices={lists.nhucau}></SelectOneDropdown>
          </td>
          <td></td>
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
