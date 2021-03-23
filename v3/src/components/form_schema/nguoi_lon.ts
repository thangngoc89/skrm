import { Survey } from "./schema";

import * as form from "./nguoi_lon_form";
import * as questionare from "./nguoi_lon_questionare";
import * as ohip14 from "./nguoi_lon_ohip14";

export const survey: Survey = {
  name: "nguoi_lon",
  forms: [form, questionare, ohip14],
  headerColor: "green",
};
