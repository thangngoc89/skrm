import { lastDayOfISOYear } from "date-fns";

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
export const SUCCESS = () => ({
  type: "SUCCESS",
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
  console.log(mucdo);
  if (mucdo === "0") {
    return [];
  } else if (mucdo === null) {
    return [keyMucdo];
  } else {
    if (!isTruthyLevel(tansuat)) {
      return [keyTansuat];
    } else if (nguyennhan.length === 0) {
      return [keyNguyenNhan];
    } else {
      /* Filter unselected NGUYENNHAN */
      const nguyennhanFiltered = nguyennhan.filter(
        n => lietke.indexOf(n) !== -1
      );

      if (nguyennhanFiltered.length === 0) {
        return [keyNguyenNhan];
      }
      return [];
    }
  }
};

export const validate = values => {
  let required = [];

  if (values.coKhoChiu !== "1" && values.coKhoChiu !== "0") {
    return {
      type: "REQUIRED",
      value: ["coKhoChiu"],
    };
  } else if (values.coKhoChiu === "0") {
    return SUCCESS;
  }

  const lietke = values.lietke;

  if (Array.isArray(lietke) && lietke.length === 0) {
    return {
      type: "REQUIRED",
      value: ["lietke"],
    };
  }
  console.log(lietke);
  if (lietke.indexOf("99") !== -1 && values.lietkeCustom === "") {
    required.push("lietkeCustom");
  }

  [1, 2, 3, 4, 5, 6, 7, 8].forEach(i => {
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
    required = [...required, ...result];
  });

  if (Array.isArray(required) && Boolean(required.length)) {
    return {
      type: "REQUIRED",
      value: required,
    };
  } else {
    /* NGUYENNHAN exhaustiveness check */
    const selectedSet = new Set();
    [1, 2, 3, 4, 5, 6, 7, 8].forEach(i => {
      const rowSelect = values[`${i}-nguyennhan`];
      rowSelect.forEach(a => selectedSet.add(a));
    });
    const unexhaustiveValues = values.lietke.filter(a => !selectedSet.has(a));

    if (
      Array.isArray(unexhaustiveValues) &&
      Boolean(unexhaustiveValues.length)
    ) {
      return { type: "EXHAUSTIVE_CHECK", value: unexhaustiveValues };
    } else {
      return SUCCESS;
    }
  }
};
