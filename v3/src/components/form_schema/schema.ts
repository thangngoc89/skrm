import { Color as HeaderColor } from "../useHeaderColor";
import { SurveyType } from "../types";

type Pair = { name: string; label: string };

type SelectPairRef = { name: string; label?: string; list: string };

type BaseInput = {
  name: string;
  label?: string;
  condition?: string;
  optional?: boolean;
};

type Field =
  | ({
      type: "select_one";
      choices: Array<Pair>;
      display?: "dropdown" | "radio";
    } & BaseInput)
  | ({
      type: "select_one_ref";
      list: string;
      display?: "dropdown" | "radio";
    } & BaseInput)
  | {
      type: "matrix_select_one";
      name: string;
      label?: string;
      choices: Array<Pair>;
      subQuestions: Array<{ id: string; question: string }>;
    }
  | {
      type: "select_many";
      name: string;
      label?: string;
      choices: Array<Pair>;
    }
  | {
      type: "select_many_ref";
      name: string;
      label?: string;
      list: string;
    }
  | ({
      type: "text";
    } & BaseInput)
  | ({
      type: "date";
    } & BaseInput)
  | ({
      type: "integer";
    } & BaseInput)
  | {
      type: "note";
      label: string;
    }
  | {
      type: "group";
      name: string;
      label: string;
      fields: Array<Field>;
    }
  | {
      type: "dental_arch_table";
      name: string;
      label?: string;
      headers: Array<string>;
      rowHeaders: Array<string>;
      alternativeRowHeaders?: Array<string>;
      // Same as select_one_ref
      fields: Array<SelectPairRef>;
    }
  | {
      type: "dental_arch_table_2_rows";
      name: string;
      label?: string;
      firstRow: Array<SelectPairRef>;
      secondRow: Array<SelectPairRef>;
    };

type List = { [key: string]: Array<Pair> };
type Form = {
  name: string;
  survey: Array<Field>;
  lists?: List;
  label: string;
  labelSecondary?: string;
  labelShort: string;
  labelVerbose?: boolean;
};

type Survey = {
  name: SurveyType;
  forms: Array<{
    form: Form;
    makeInitialValues: () => any;
  }>;
  headerColor: HeaderColor;
};

export { Pair, Field, Form, List, SelectPairRef, Survey };
