import { h, FunctionComponent } from "preact";
import { FormGroup, Label, ErrorMessage } from "@trussworks/react-uswds";
import { FastField, FieldProps } from "formik";
import { Pair } from "../form_schema/schema";
import { SelectOneRadio } from "./SelectOneRadio";

interface Props {
  name: string;
  label: string;
  optional?: boolean;
  choices: Array<Pair>;
  subQuestions: Array<{ id: string; question: string }>;
  labelVerbose?: boolean;
}

export const MatrixSelectOne: React.FC<Props> = ({
  label,
  name,
  choices,
  subQuestions,
  optional,
  labelVerbose = false,
}) => {
  return (
    <FormGroup>
      <Label htmlFor={name} hint={optional === true ? " (tuỳ chọn)" : ""}>
        <strong>
          {labelVerbose && <strong>{`${name.toUpperCase()}. `}</strong>} {label}
        </strong>
      </Label>
      {subQuestions.map(({ id: questionName, question: label }) => {
        return <SelectOneRadio name={questionName} choices={choices} label={label} labelVerbose={labelVerbose} />;
      })}
      <hr />
    </FormGroup>
  );
};
