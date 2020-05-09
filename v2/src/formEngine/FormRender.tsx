import * as React from "react";
import { SheetSchema } from "../model/Sheet";
import * as FormEntry from "../model/FormEntry";
import Relavent from "./FormRenderRelavent";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import { Container } from "@material-ui/core";

const testSchema: SheetSchema = [
  {
    type: "select_one",
    id: "co_kho_chiu",
    label:
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
        label: "Liệt kê các khó chịu",
        params: [
          { value: "1", label: "Đau răng, nhức răng" },
          { value: "99", label: "Những khó chịu khác (ghi rõ)" },
        ],
      },
      {
        type: "text",
        id: "kho_chiu_khac",
        label: "Khó chịu khác",
        relavent: "'99' in liet_ke",
      },
      {
        type: "select_one",
        id: "co_kho_chiu",
        label:
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
      <FormLabel component="legend" required={true}>
        {schema.label}
      </FormLabel>
      <RadioGroup
        aria-label={schema.label || schema.id}
        name={schema.id}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      >
        {schema.params.map((pair) => (
          <FormControlLabel
            key={pair.value}
            value={pair.value}
            control={<Radio />}
            label={pair.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

interface FormEntryTextProps {
  schema: FormEntry.Text;
  value: string;
  handleChange: any;
}

const FormEntryText = ({
  schema,
  value,
  handleChange,
}: FormEntryTextProps) => {
  return (
    <TextField
      name={schema.id}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      variant="filled"
    />
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
    case "text":
      return (
        <FormEntryText
          key={entrySchema.id}
          schema={entrySchema}
          value={value}
          handleChange={handleChange}
        />
      );
    default:
      return <div>Unhandled</div>;
  }
};

function RenderEntries({ schema = testSchema }: FormRenderProps) {
  const [values, setValues] = React.useState(() => ({
    co_kho_chiu: "",
    liet_ke: [],
  }));
  return (
    <>
      {schema.map((entrySchema) => (
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
      ))}
    </>
  );
}

const FormRender = ({ schema = testSchema }: FormRenderProps) => {
  return (
    <Container>
      <RenderEntries schema={schema} />
    </Container>
  );
};

export default FormRender;
