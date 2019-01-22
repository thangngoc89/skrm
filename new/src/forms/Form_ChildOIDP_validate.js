export const PART_1_REQUIRED = { type: "PART_1_REQUIRED" };
export const PART_2_REQUIRED = { type: "PART_2_REQUIRED" };
export const REQUIRED_MUCDO = value => ({
  type: "REQUIRED_MUCDO",
  value,
});
export const REQUIRED_TANSUAT = value => ({
  type: "REQUIRED_TANSUAT",
  value,
});
export const REQUIRED_NGUYENNHAN = value => ({
  type: "REQUIRED_NGUYENNHAN",
  value,
});
export const UNSASTIFIED_SUM_NGUYENNHAN = value => ({
  type: "UNSASTIFIED_SUM_NGUYENNHAN",
  value: value,
});
export const SUCCESS = value => ({
  type: "SUCCESS",
  value,
});

export const REQUIRED = {
  type: "REQUIRED",
};

const truthyLevel = ["1", "2", "3"];

const isTruthyLevel = level => {
  return truthyLevel.indexOf(level) !== -1;
};

export const validateHoatdong = ({
  mucdo,
  tansuat,
  nguyennhan,
  keyMucdo,
  keyTansuat,
  keyNguyenNhan,
  lietke,
}) => {
  if (mucdo === "0") {
    return {};
  } else if (mucdo === null) {
    return { [keyMucdo]: REQUIRED };
  } else {
    if (!isTruthyLevel(tansuat)) {
      return { [keyTansuat]: REQUIRED };
    } else if (nguyennhan.length === 0) {
      return { [keyNguyenNhan]: REQUIRED };
    } else {
      /* Filter unselected NGUYENNHAN */
      const nguyennhanFiltered = nguyennhan.filter(
        n => lietke.indexOf(n) !== -1
      );

      if (nguyennhanFiltered.length === 0) {
        return { [keyNguyenNhan]: REQUIRED };
      }
      return {};
    }
  }
};
/*
 * @return
 *   | { type: "PART_1_REQUIRED" }
 *   | { type: "PART_2_REQUIRED" }
 *   | { type: "REQUIRED_MUCDO", value: int}
 *   | { type: "REQUIRED_TANSUAT", value: int}
 *   | { type: "REQUIRED_NGUYENNHAN", value: int}
 *   | { type: "UNSASTIFIED_SUM_NGUYENNHAN", value: array(int) }
 *   | { type: "SUCCESS", value}
 */
export const validate = values => {
  if (values.coKhoChiu !== "1" && values.coKhoChiu !== "0") {
    return { coKhoChiu: REQUIRED };
  } else if (values.coKhoChiu === "0") {
    return {};
  }

  const lietke = values.lietke;

  if (Array.isArray(lietke) && lietke.length === 0) {
    return { lietke: REQUIRED };
  } else if (lietke.indexOf("99") !== -1 && lietke.lietkeCustom === "") {
    return { lietkeCustom: REQUIRED };
  }

  return [1, 2, 3, 4, 5, 6, 7, 8].reduce((acc, i) => {
    const keyMucdo = i + "-mucdo";
    const keyTansuat = i + "-tansuat";
    const keyNguyenNhan = i + "-nguyennhan";

    const valueMucdo = values[keyMucdo];
    const valueTansuat = values[keyTansuat];
    const valueNguyenNhan = values[keyNguyenNhan];

    const result = validateHoatdong({
      mucdo: valueMucdo,
      tansuat: valueTansuat,
      nguyennhan: valueNguyenNhan,
      keyMucdo,
      keyTansuat,
      keyNguyenNhan,
      lietke: values.lietke,
    });
    return { ...acc, ...result };
  }, {});
};
