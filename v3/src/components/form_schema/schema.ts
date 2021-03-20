type pair = { value: string; label: string };

type field =
  | {
      type: "select_one";
      name: string;
      question: string;
      content: Array<pair>;
    }
  | {
      type: "matrix_select_one";
      name: string;
      question: string;
      values: Array<pair>;
      subQuestions: Array<{ id: string; question: string }>;
    }
  | {
      type: "select_many";
      name: string;
      question: string;
      content: Array<pair>;
    }
  | {
      type: "text";
      name: string;
      question?: string;
      condition?: string;
    }
  | {
      type: "note";
      caption: string;
    }
  | {
      type: "group";
      caption: string;
      content: Array<field>;
    };

type form = {
  name: string;
  fields: Array<field>;
};
export { field, form };
