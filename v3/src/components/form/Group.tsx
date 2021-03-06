import { h, FunctionComponent } from "preact";
import { Fieldset } from "@trussworks/react-uswds";

interface TextInputProps {
  name: string;
  className?: string;
}

export const Group: React.FC<TextInputProps> = ({ name, className, children }) => {
  return (
    <Fieldset legend={name} className={className}>
      {children}
    </Fieldset>
  );
};
