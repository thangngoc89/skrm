import { validationSchema as PDT_schema } from "../exam_form/PhieuDieuTra_Main";

import * as yup from "yup";

export const schema = yup.object().shape({
  phieuDieuTra: PDT_schema,
  bangCauHoi: yup.object().required(),
});

