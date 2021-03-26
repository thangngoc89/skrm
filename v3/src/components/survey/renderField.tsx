import { h } from "preact";
import style from "./FormRender.css";
import {
  TextInput,
  Group,

  DatePicker,
  SelectOneDropdown,
  SelectOneRadio,
  SelectMany,
  MatrixSelectOne,
  DentalArchTable,
  DentalArchTable2Rows
} from "../form/FormComponents";
import { Field as FieldSchema } from "../form_schema/schema";
import { List } from "../form_schema/schema";

export const renderField = (field: FieldSchema, lists: List, labelVerbose = false) => {
  switch (field.type) {
    case "group":
      return (
        <Group key={field.name} name={field.label} className={style.group}>
          {field.fields.map((field) => renderField(field, lists))}
        </Group>
      );
    case "date":
      return (
        <DatePicker
          key={field.name}
          name={field.name}
          label={field.label || ""}
          optional={field.optional}
          labelVerbose={labelVerbose} />
      );
    case "text":
      return (
        <TextInput
          key={field.name}
          name={field.name}
          label={field.label || ""}
          optional={field.optional}
          labelVerbose={labelVerbose} />
      );
    case "integer":
      return (
        <TextInput
          key={field.name}
          type="number"
          name={field.name}
          label={field.label || ""}
          optional={field.optional}
          labelVerbose={labelVerbose} />
      );
    case "select_one":
      if (field.display === "radio") {
        return (
          <SelectOneRadio
            key={field.name}
            name={field.name}
            label={field.label || ""}
            choices={field.choices}
            labelVerbose={labelVerbose} />
        );
      }
      return (
        <SelectOneDropdown
          key={field.name}
          name={field.name}
          label={field.label || ""}
          choices={field.choices}
          labelVerbose={labelVerbose} />
      );
    case "select_one_ref":
      if (field.display === "radio") {
        return (
          <SelectOneRadio
            key={field.name}
            name={field.name}
            label={field.label || ""}
            choices={lists[field.list]}
            labelVerbose={labelVerbose} />
        );
      }
      return (
        <SelectOneDropdown
          key={field.name}
          name={field.name}
          label={field.label || ""}
          choices={lists[field.list]}
          labelVerbose={labelVerbose} />
      );
    case "select_many":
      return (
        <SelectMany
          key={field.name}
          name={field.name}
          label={field.label || ""}
          choices={field.choices}
          labelVerbose={labelVerbose} />
      );
    case "select_many_ref":
      return (
        <SelectMany
          name={field.name}
          key={field.name}
          label={field.label || ""}
          choices={lists[field.list]}
          labelVerbose={labelVerbose} />
      );
    case "matrix_select_one":
      return (
        <MatrixSelectOne
          key={field.name}
          name={field.name}
          label={field.label || ""}
          choices={field.choices}
          labelVerbose={labelVerbose}
          subQuestions={field.subQuestions} />
      );
    case "dental_arch_table":
      return <DentalArchTable key={field.name} lists={lists} label={field.label} {...field} />;
    case "dental_arch_table_2_rows":
      return <DentalArchTable2Rows key={field.name} lists={lists} label={field.label} {...field} />;
    case "note":
      return <p>{field.label}</p>;
  }
};
