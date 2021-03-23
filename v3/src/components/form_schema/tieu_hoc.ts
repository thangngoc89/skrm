import { Survey } from "./schema";

import * as form from "./tieu_hoc_form";
import * as questionare from "./tieu_hoc_questionare";
import * as childOidp from "./tieu_hoc_child_oidp";

export const survey: Survey = {
  name: "tieu_hoc",
  forms: [form, questionare, childOidp],
  headerColor: "pink",
};
