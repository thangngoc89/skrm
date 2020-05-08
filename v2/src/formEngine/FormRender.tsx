import * as React from "react";
import { SheetSchema } from "../model/Sheet";
import * as FormEntry from "../model/FormEntry";
import Relavent from "./FormRenderRelavent";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

const testSchema: SheetSchema = [
  {
    type: "select_one",
    id: "co_kho_chiu",
    label: "co_kho_chiu",
    question:
      "Trong 3 tháng qua các em có thấy khó chịu hay đau ở vùng răng miệng của mình hay không?",
    params: [
      { value: "0", label: "Không" },
      { value: "1", label: "Có" },
    ],
  },
  {
    type: "group",
    id: "yes_branch",
    params: [
      {
        type: "select_multiple",
        id: "liet_ke",
        label: "Liệt kê khó chịu",
        question: "Liệt kê các khó chịu",
        params: [
          { value: "1", label: "Đau răng, nhức răng" },
          { value: "99", label: "Những khó chịu khác (ghi rõ)" },
        ],
      },
      {
        type: "select_one",
        id: "co_kho_chiu",
        label: "co_kho_chiu",
        question:
          "Trong 3 tháng qua các em có thấy khó chịu hay đau ở vùng răng miệng của mình hay không?",
        params: [
          { value: "0", label: "Không" },
          { value: "1", label: "Có" },
        ],
      },
    ],
    relavent: 'co_kho_chiu == "1"',
  },
];

interface FormEntryGroupProps {
  schema: FormEntry.Group;
}

const FormEntryGroup = ({ schema }: FormEntryGroupProps) => {
  return <FormRender schema={schema.params} />;
};
interface FormEntrySelectOneProps {
  schema: FormEntry.SelectOne;
  value: string;
  handleChange: any;
}
const FormEntrySelectOne = ({
  schema,
  value,
  handleChange,
}: FormEntrySelectOneProps) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{schema.question}</FormLabel>
      <RadioGroup
        aria-label={schema.label || schema.id}
        name={schema.id}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      >
        {schema.params.map((pair) => (
          <FormControlLabel
            value={pair.value}
            control={<Radio />}
            label={pair.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

interface FormRenderProps {
  schema?: SheetSchema;
}
const formRenderSwitch = (
  entrySchema: FormEntry.FormEntry,
  value: any,
  handleChange: any
) => {
  switch (entrySchema.type) {
    case "select_one":
      return (
        <FormEntrySelectOne
          key={entrySchema.id}
          schema={entrySchema}
          value={value}
          handleChange={handleChange}
        />
      );
    case "group":
      return <FormEntryGroup key={entrySchema.id} schema={entrySchema} />;
  }
};

interface values {
  co_kho_chiu: string | null;
  liet_ke: string | null;
}

function FormRender({ schema = testSchema }: FormRenderProps) {
  const [values, setValues] = React.useState(() => ({
    co_kho_chiu: "",
    liet_ke: [],
  }));
  return (
    <>
      {schema.map((entrySchema) =>
        entrySchema.relavent ? (
          <Relavent
            key={entrySchema.id}
            param={entrySchema.relavent}
            context={values}
          >
            {formRenderSwitch(
              entrySchema,
              (values as any)[entrySchema.id],
              (value: any) => {
                setValues({
                  ...values,
                  [entrySchema.id]: value,
                });
              }
            )}
          </Relavent>
        ) : (
          formRenderSwitch(
            entrySchema,
            (values as any)[entrySchema.id],
            (value: any) => {
              setValues({
                ...values,
                [entrySchema.id]: value,
              });
            }
          )
        )
      )}
    </>
  );
}

export default FormRender;
