import { h } from "preact";
import { useMemo } from "react";
import { Table } from "@trussworks/react-uswds";
import { SelectOneDropdown } from "./FormComponents";
import { List, Field, SelectPairRef } from "../form_schema/schema";
import style from "./DentalArchTable.css";

interface SingleRowProps {
  headers: Array<string>;
  headerLength: number;
  rowHeader: string;
  alternativeRowHeader: string;
  lists: List;
  fieldsMap: FieldsMap;
}

type FieldsMap = { [key: string]: string };

const SingleRow: React.FC<SingleRowProps> = ({
  headers,
  headerLength,
  rowHeader,
  alternativeRowHeader,
  lists,
  fieldsMap,
}) => {
  return (
    <tr>
      {headers.map((_header, i) => {
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
          const key = `${rowHeader}_${headers[i]}`;
          if (fieldsMap[key]) {
            return (
              <td>
                <SelectOneDropdown
                  name={`${rowHeader}_${headers[i]}`}
                  choices={lists[fieldsMap[key]]}
                  key={i}
                ></SelectOneDropdown>
              </td>
            );
          }
          return <td className={style.emptyCell}></td>;
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
  fields: Array<SelectPairRef>;
}

export const DentalArchTable: React.FC<Props> = ({
  name,
  lists,
  label,
  headers,
  rowHeaders,
  alternativeRowHeaders,
  fields,
}) => {
  const headerLength = useMemo(() => headers.length, [headers]);

  const fieldsMap: FieldsMap = useMemo(() => {
    let map: FieldsMap = {};
    fields.forEach(({ name, list }) => {
      map[name] = list;
    });
    return map;
  }, [fields]);

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
              fieldsMap={fieldsMap}
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
