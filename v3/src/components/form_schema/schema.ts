type pair = { name: string; label: string };

type field =
  | {
      type: "select_one";
      name: string;
      label: string;
      choices: Array<pair>;
    }
  | {
      type: "matrix_select_one";
      name: string;
      label: string;
      choices: Array<pair>;
      subQuestions: Array<{ id: string; question: string }>;
    }
  | {
      type: "select_many";
      name: string;
      label: string;
      choices: Array<pair>;
    }
  | {
      type: "text";
      name: string;
      label?: string;
      condition?: string;
    }
  | {
      type: "note";
      caption: string;
    }
  | {
      type: "group";
      label: string;
      content: Array<field>;
    };

type form = {
  name: string;
  survey: Array<field>;
  label: string;
  labelSecondary?: string;
};
export { field, form };
