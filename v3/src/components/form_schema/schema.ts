type Pair = { name: string; label: string };

type SelectPairRef = { name: string; label?: string; list: string };

type BaseInput = {
  name: string;
  label?: string;
  condition?: string;
  optional?: boolean;
};

type Field =
  | {
      type: "select_one";
      name: string;
      label?: string;
      choices: Array<Pair>;
      display?: "dropdown" | "radio";
    }
  | {
      type: "select_one_ref";
      name: string;
      label?: string;
      list: string;
      display?: "dropdown" | "radio";
    }
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
      alternativeRowHeaders: Array<string>;
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
};
export { Pair, Field, Form, List, SelectPairRef };
