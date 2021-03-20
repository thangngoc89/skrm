import { h, FunctionComponent } from "preact";
import { Fieldset } from "@trussworks/react-uswds";

interface TextInputProps {
  name: string;
}

export const Group: React.FC<TextInputProps> = ({ name, children }) => {
  return <Fieldset legend={name}>{children}</Fieldset>;
};
