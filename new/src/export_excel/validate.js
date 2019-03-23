import { validationSchema as PDT_schema } from "../exam_form/PhieuDieuTra_Main";
import { validationSchema as BCH_schema } from "../questions/Render_question_form";

import * as yup from "yup";

export const schema = yup.object().shape({
  phieuDieuTra: PDT_schema,
  bangCauHoi: BCH_schema,
  childOIDP: yup.object().required(),
});

export const validate = async record => {
  const [phieuDieuTra, bangCauHoi] = await Promise.all([
    PDT_schema.isValid(record.phieuDieuTra),
    BCH_schema.isValid(record.bangCauHoi),
  ]);
  return {
    phieuDieuTra,
    bangCauHoi,
    childOIDP: false,
  };
};
