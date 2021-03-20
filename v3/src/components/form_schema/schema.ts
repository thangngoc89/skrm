type Pair = { name: string; label: string };

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
    }
  | {
      type: "select_one_ref";
      name: string;
      label?: string;
      list: string;
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
      label?: string;
      headers: Array<string>;
      rowHeaders: Array<string>;
      alternativeRowHeaders: Array<string>;
      fields: Array<Field>;
    };

type List = {
  name: string;
  choices: Array<Pair>;
};

type Form = {
  name: string;
  survey: Array<Field>;
  list?: Array<List>;
  label: string;
  labelSecondary?: string;
};
export { Field, Form, List };
