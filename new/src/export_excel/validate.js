import { validationSchema as PDT_schema } from "../exam_form/PhieuDieuTra_Main";
import { validationSchema as BCH_schema } from "../questions/Render_question_form";
import { validate as ChO_validate } from "../forms/Form_ChildOIDP_validate";

export const validate = record => {
  return Promise.all([
    PDT_schema.isValid(record.phieuDieuTra).catch(() => {}),
    BCH_schema.isValid(record.bangCauHoi).catch(() => {}),
    new Promise((resolve, reject) => {
      try {
        if (!record.childOIDP) {
          return resolve(false);
        } else {
          const result = ChO_validate(record.childOIDP);
          if (result.type === "SUCCESS") {
            return resolve(true);
          } else {
            return resolve(false);
          }
        }
      } catch (err) {
        reject(err);
      }
    }),
  ])
    .then(([phieuDieuTra, bangCauHoi, childOIDP]) => {
      return {
        doc: record,
        phieuDieuTra,
        bangCauHoi,
        childOIDP,
      };
    })
    .catch(() => {});
};
