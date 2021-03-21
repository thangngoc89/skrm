import { h } from "preact";
import { useMemo } from "react";
import { SelectOneDropdown } from "./FormComponents";
import { List, SelectPairRef } from "../form_schema/schema";
import style from "./DentalArchTable2Rows.css";
import objStr from "obj-str";

interface HeaderProps {
  headers: Array<string>;
}

const Header: React.FC<HeaderProps> = ({ headers }) => {
  return (
    <section className={style.row}>
      {headers.map((header) => (
        <div key={header} className={style.cellHeader}>
          {header}
        </div>
      ))}
    </section>
  );
};

interface DataRowProps {
  row: Array<SelectPairRef>;
  lists: List;
  isReverse?: boolean;
}

const DataRow: React.FC<DataRowProps> = ({ row, lists, isReverse = false }) => {
  return (
    <section className={objStr({ [style.row]: true, [style.rowReverse]: isReverse })}>
      {row.map(({ name, list }) => (
        <div key={name} className={style.cell}>
          <SelectOneDropdown name={name} choices={lists[list]}></SelectOneDropdown>
        </div>
      ))}
    </section>
  );
};

interface Props {
  name: string;
  lists: List;
  label?: string;
  firstRow: Array<SelectPairRef>;
  secondRow: Array<SelectPairRef>;
}
export const DentalArchTable2Rows: React.FC<Props> = ({ name, lists, label, firstRow, secondRow }) => {
  const firstRowHeaders: Array<string> = useMemo(() => firstRow.map(({ name, label }) => label || name), [firstRow]);
  const secondRowHeaders = useMemo(() => secondRow.map(({ name, label }) => label || name).reverse(), [firstRow]);

  return (
    <article className={style.wrapper}>
      <caption className={style.caption}>{label}</caption>
      <div className={style.container}>
        <Header headers={firstRowHeaders} />
        <DataRow row={firstRow} lists={lists} />
        <DataRow row={secondRow} lists={lists} isReverse />
        <Header headers={secondRowHeaders} />
      </div>
    </article>
  );
};
