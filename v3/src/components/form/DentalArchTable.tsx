import { h } from "preact";
import { useMemo } from "react";
import { Table } from "@trussworks/react-uswds";
import { SelectOneDropdown } from "./FormComponents";
import { List, SelectPairRef } from "../form_schema/schema";
import style from "./DentalArchTable.css";
import { Fragment } from "preact";
import { tablet } from "../responsive";
import { useMediaQuery } from "react-responsive";
import { DropdownMenu, Placement } from "../DropdownMenu";
import { useFormikContext } from "formik";
import { DisplayStyle } from "./SelectOneDropdown";

type FieldsMap = { [key: string]: string };

interface DropdownSetSoundToothProps {
  toothNumber: string;
  fieldsMap: FieldsMap;
  slicedHeader: Array<string>;
  placement?: Placement;
}

const DropdownSetSoundTooth: React.FC<DropdownSetSoundToothProps> = ({
  toothNumber,
  fieldsMap,
  slicedHeader,
  placement,
}) => {
  const { setValues, values } = useFormikContext();

  return (
    <DropdownMenu
      placement={placement}
      items={[
        {
          label: "Răng sữa tốt",
          action: () => {
            let toothValues: any = {};

            slicedHeader.forEach((toothSurface: string) => {
              const posibleValue = toothSurface === "NC" ? "0" : "a";
              const key = `${toothNumber}_${toothSurface}`;

              if (key in fieldsMap) {
                toothValues[key] = posibleValue;
              }
            });
            setValues(
              {
                // @ts-ignore
                ...values,
                ...toothValues,
              },
              false
            );
          },
        },
        {
          label: "Răng vĩnh viễn tốt",
          action: () => {
            let toothValues: any = {};
            slicedHeader.forEach((toothSurface: string) => {
              const posibleValue = 0;
              const key = `${toothNumber}_${toothSurface}`;

              if (key in fieldsMap) {
                toothValues[key] = posibleValue;
              }
            });

            setValues(
              {
                // @ts-ignore
                ...values,
                ...toothValues,
              },
              false
            );
          },
        },
        {
          label: "Răng chưa mọc",
          action: () => {
            let toothValues: any = {};
            slicedHeader.forEach((toothSurface: string) => {
              const posibleValue = toothSurface === "NC" ? "0" : "8";
              const key = `${toothNumber}_${toothSurface}`;

              if (key in fieldsMap) {
                toothValues[key] = posibleValue;
              }
            });

            setValues(
              {
                // @ts-ignore
                ...values,
                ...toothValues,
              },
              false
            );
          },
        },
      ]}
    />
  );
};

interface SingleRowProps {
  headers: Array<string>;
  headerLength: number;
  rowHeader: string;
  alternativeRowHeader?: string;
  lists: List;
  fieldsMap: FieldsMap;
}
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
              <div className={style.rowHeader}>
                {rowHeader}
                <DropdownSetSoundTooth
                  placement="bottom-start"
                  toothNumber={rowHeader}
                  fieldsMap={fieldsMap}
                  slicedHeader={headers}
                />
              </div>
            </th>
          );
        } else if (alternativeRowHeader && i === headerLength - 1) {
          return alternativeRowHeader === "" ? (
            <td className={style.emptyCell}></td>
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
                  name={key}
                  choices={lists[fieldsMap[key]]}
                  displayStyle={DisplayStyle.Minimal}
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

export const DentalArchTableBigScreen: React.FC<Props> = ({
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
              alternativeRowHeader={alternativeRowHeaders && alternativeRowHeaders[i]}
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

export const DentalArchTableMobile: React.FC<Props> = ({
  name,
  lists,
  label,
  headers,
  rowHeaders,
  alternativeRowHeaders,
  fields,
}) => {
  const fieldsMap: FieldsMap = useMemo(() => {
    let map: FieldsMap = {};
    fields.forEach(({ name, list }) => {
      map[name] = list;
    });
    return map;
  }, [fields]);

  // Remove empty cell in start and end of headers
  const slicedHeader = useMemo(() => {
    return headers.slice(1, headers.length - 1);
  }, [headers]);

  return (
    <Fragment>
      <caption className={style.caption}>{label}</caption>
      {rowHeaders.map((rowHeader, rowIter) => {
        let alRowHeader;
        if (alternativeRowHeaders) {
          alRowHeader = alternativeRowHeaders[rowIter] === "" ? null : alternativeRowHeaders[rowIter];
        }

        return (
          <section key={rowIter}>
            <div className={style.mobileRowHeader}>
              <span>
                R{rowHeader} {alRowHeader && `/ R${alRowHeader}`}{" "}
              </span>
              <DropdownSetSoundTooth toothNumber={rowHeader} fieldsMap={fieldsMap} slicedHeader={slicedHeader} />
            </div>
            <Table bordered fullWidth>
              <tbody className={style.tbody}>
                {slicedHeader.map((header, colIter) => {
                  const key = `${rowHeader}_${slicedHeader[colIter]}`;
                  return (
                    <tr>
                      <th scope="row">{header}</th>

                      {fieldsMap[key] ? (
                        <td>
                          <SelectOneDropdown
                            name={key}
                            choices={lists[fieldsMap[key]]}
                            key={colIter}
                            displayStyle={DisplayStyle.Minimal}
                          ></SelectOneDropdown>
                        </td>
                      ) : (
                        <td className={style.emptyCell}></td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </section>
        );
      })}
    </Fragment>
  );
};

interface Props {
  name: string;
  lists: List;
  label?: string;
  headers: Array<string>;
  rowHeaders: Array<string>;
  alternativeRowHeaders?: Array<string>;
  fields: Array<SelectPairRef>;
}
export const DentalArchTable: React.FC<Props> = (props) => {
  const isTablet = useMediaQuery({ minWidth: tablet });

  return isTablet ? <DentalArchTableBigScreen {...props} /> : <DentalArchTableMobile {...props} />;
};
