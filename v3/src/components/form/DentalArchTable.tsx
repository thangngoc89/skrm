import { h } from "preact";
import { useMemo } from "react";
import { Table } from "@trussworks/react-uswds";
import { SelectOneDropdown } from "./FormComponents";
import { List, Field } from "../form_schema/schema";
import style from "./DentalArchTable.css";

interface SingleRowProps {
  headers: Array<string>;
  headerLength: number;
  rowHeader: string;
  alternativeRowHeader: string;
  lists: List;
}

const SingleRow: React.FC<SingleRowProps> = ({ headers, headerLength, rowHeader, alternativeRowHeader, lists }) => {
  return (
    <tr>
      {headers.map((header, i) => {
        if (i === 0) {
          return (
            <th scope="row" key={i}>
              {rowHeader}
            </th>
          );
        } else if (i === headerLength - 1) {
          return alternativeRowHeader === "" ? (
            <td></td>
          ) : (
            <th scope="row" key={i}>
              {alternativeRowHeader}
            </th>
          );
        } else {
          return (
            <td>
              <SelectOneDropdown
                name={`${rowHeader}_${headers[i]}`}
                choices={lists.tinhtrang}
                key={i}
              ></SelectOneDropdown>
            </td>
          );
        }
      })}
    </tr>
  );
};

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
        {rowHeaders.map((rowHeader, i) => {
          return (
            <SingleRow
              key={i}
              rowHeader={rowHeader}
              alternativeRowHeader={alternativeRowHeaders[i]}
              headers={headers}
              headerLength={headerLength}
              lists={lists}
            />
          );
        })}
      </tbody>
      <thead>
        <tr>{headers.map((header) => (header === "" ? <td></td> : <th scope="col">{header}</th>))}</tr>
      </thead>
    </Table>
  );
};
