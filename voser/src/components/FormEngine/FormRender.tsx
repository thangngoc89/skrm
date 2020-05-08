import * as React from "react";
import * as Survey from "../../reason/Survey.gen";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { SelectOne, SelectMultiple, Group, Text, DatePicker } from "./FormField";
import Relavent from "./FormFieldRelavent";
import { makeStyles } from "@material-ui/core/styles";
import { useFormikContext } from "formik";

const fieldRenderSwitch = (fieldSchema: Survey.field) => {
  const { tag, value: fieldSchemaValue } = fieldSchema;
  switch (tag) {
    case "SelectOne":
      return (
        <SelectOne
          key={fieldSchemaValue.id}
          field={fieldSchemaValue as Survey.select}
        />
      );
    case "SelectMultiple":
      return (
        <SelectMultiple
          key={fieldSchemaValue.id}
          field={fieldSchemaValue as Survey.select}
        />
      );
    case "Group":
      return (
        <Group
          key={fieldSchemaValue.id}
          field={fieldSchemaValue as Survey.group}
        />
      );
    case "Text":
      return (
        <Text
          key={fieldSchemaValue.id}
          field={fieldSchemaValue as Survey.text}
        />
      );
    case "Date": 
        return (
          <DatePicker
            key={fieldSchemaValue.id}
            field={fieldSchemaValue as Survey.dateTime}
          />
        )
    default:
      console.log(fieldSchemaValue);
      return <div>Unhandled</div>;
  }
};

interface FieldsRenderProps {
  fields: Survey.field[];
}

export function FieldsRender({ fields }: FieldsRenderProps) {
  let { values, submitForm: _ } = useFormikContext();

  return (
    <>
      {fields.map((field) => (
        <Box key={field.value.id} mt={2} mb={2}>
          <Relavent param={field.value.relavent} context={values}>
            {fieldRenderSwitch(field)}
          </Relavent>
        </Box>
      ))}
    </>
  );
}

interface FormRenderProps {
  survey: Survey.t;
}

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(5),
    fontWeight: 700
  },
}));

const FormRender = ({ survey }: FormRenderProps) => {
  const classes = useStyles();
  return (
    <Box
      p={{ xs: 4 }}
      m={{ sm: 2, md: 6 }}
      border={8}
      borderColor="grey.100"
      borderRadius="4px"
    >
      <Typography
        color="primary"
        variant="h3"
        component="h1"
        className={classes.title}
      >
        {survey.title}
      </Typography>
      <FieldsRender fields={survey.fields} />
    </Box>
  );
};

export default FormRender;
