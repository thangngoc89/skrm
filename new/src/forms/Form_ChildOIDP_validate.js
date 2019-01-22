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

const truthyLevel = ["1", "2", "3"];
const isTruthyLevel = level => {
  return truthyLevel.indexOf(level) !== -1;
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
    return PART_1_REQUIRED;
  } else if (values.coKhoChiu === "0") {
    return SUCCESS(values);
  }

  const processedValues = {
    ...values,
  };
  const cacKhoChiu = processedValues.lietke;
  const khoChiu_tuBangNguyenNhan = new Set();

  if (Array.isArray(cacKhoChiu) && cacKhoChiu.length === 0) {
    return PART_2_REQUIRED;
  }

  for (let i = 1; i <= 8; i++) {
    const keyMucdo = i + "-mucdo";
    const keyTansuat = i + "-tansuat";
    const keyNguyenNhan = i + "-nguyennhan";

    const valueMucdo = processedValues[keyMucdo];
    const valueTansuat = processedValues[keyTansuat];
    const valueNguyenNhan = processedValues[keyNguyenNhan];

    /*
     * Nguyên nhân
     */
    if (valueMucdo === null) {
      return REQUIRED_MUCDO(i);
    }
    // Có mức độ, thiếu tần suất
    if (valueMucdo !== "0" && !isTruthyLevel(valueTansuat)) {
      // Reset tần suất, nguyên nhân khi mức độ = 0
      processedValues[keyTansuat] = "0";
      processedValues[keyNguyenNhan] = [];
      return REQUIRED_TANSUAT(i);
    } else if (
      // Có mức độ và tần số, thiếu  nguyên nhân
      valueMucdo !== "0" &&
      valueTansuat !== "0" &&
      valueNguyenNhan.length === 0
    ) {
      return REQUIRED_NGUYENNHAN(i);
    } else {
      /*
       * Đảm bảo các nguyên nhân của hoạt động này
       * chỉ nằm trong các nguyên nhân được liệt kê
       * Tránh trường hợp chọn ở liệt kê => chọn nguyên nhân
       * => bỏ chọn liệt kê => nguyên nhân chưa được bỏ chọn
       */
      const newNguyenNhan = valueNguyenNhan.filter(
        nguyennhan => cacKhoChiu.indexOf(nguyennhan) !== -1
      );

      if (newNguyenNhan.length === 0) {
        return REQUIRED_NGUYENNHAN(i);
      }

      processedValues[keyNguyenNhan] = newNguyenNhan;

      // Thỏa mọi điều kiện, thêm nguyên nhân vào Set
      newNguyenNhan.forEach(nguyennhan => {
        khoChiu_tuBangNguyenNhan.add(nguyennhan);
      });
    }
  }

  /* Các khó chịu đã chọn ở trên mà chưa được đánh vào mục nguyên nhân */
  for (let i = 0; i < cacKhoChiu.length; i++) {
    const khochiu = cacKhoChiu[i];
    if (!khoChiu_tuBangNguyenNhan.has(khochiu)) {
      return UNSASTIFIED_SUM_NGUYENNHAN(khochiu);
    }
  }
  return resolve(processedValues);
};
