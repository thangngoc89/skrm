import { validate, REQUIRED } from "./Form_ChildOIDP_validate";
import { blankInitialValues } from "./Form_ChildOIDP";

describe("part 1 is null", () => {
  test("it should require part 1", () => {
    const values = blankInitialValues;
    expect(values.coKhoChiu).toBe(null);
    expect(validate(blankInitialValues)).toEqual({
      coKhoChiu: REQUIRED,
    });
  });
});

describe("part 1 is falsy", () => {
  test("it should be success", () => {
    const values = {
      ...blankInitialValues,
      coKhoChiu: "0",
    };

    expect(validate(values)).toEqual({});
  });
});

describe("part 1 is truthy", () => {
  describe("part 2 is empty", () => {
    test("it should require part 2", () => {
      const values = {
        ...blankInitialValues,
        coKhoChiu: "1",
      };
      expect(validate(values)).toEqual({ lietke: REQUIRED });
    });
  });
  describe("part 2 is selected", () => {
    test("it should not requires part 2", () => {
      const values = {
        ...blankInitialValues,
        coKhoChiu: "1",
        lietke: ["1", "2", "3"],
      };
      expect(validate(values).lietke).toBe(undefined);
    });
  });
});

describe("part 3", () => {
  const defaultMessage = {
    "1-mucdo": REQUIRED,
    "2-mucdo": REQUIRED,
    "3-mucdo": REQUIRED,
    "4-mucdo": REQUIRED,
    "5-mucdo": REQUIRED,
    "6-mucdo": REQUIRED,
    "7-mucdo": REQUIRED,
    "8-mucdo": REQUIRED,
  };
  test("MUCDO = null => it should require MUCDO", () => {
    const values = {
      ...blankInitialValues,
      coKhoChiu: "1",
      lietke: ["1", "2", "3"],
      "1-mucdo": null,
    };
    expect(validate(values)["1-mucdo"]).toEqual(REQUIRED);
    expect(validate(values)).toMatchSnapshot();
  });
  test(`MUCDO = "0" => it should not requires NGUYENNHAN or TANSUAT`, () => {
    const values = {
      ...blankInitialValues,
      coKhoChiu: "1",
      lietke: ["1", "2", "3"],
      "1-mucdo": "0",
    };
    const result = validate(values);
    const allKeysStartWithOne = Object.keys(result).find(key =>
      key.includes("1-")
    );
    expect(allKeysStartWithOne).toBe(undefined);
  });

  test("MUCDO = truthy => it should require TANSUAT", () => {
    const values = {
      ...blankInitialValues,
      coKhoChiu: "1",
      lietke: ["1", "2", "3"],
      "1-mucdo": "1",
    };
    expect(validate(values)["1-mucdo"]).toBe(undefined);
    expect(validate(values)["1-tansuat"]).toEqual(REQUIRED);
    expect(validate(values)).toMatchSnapshot();
  });
  test("MUCDO = truthy, TANSUAT = truthy => it should require NGUYENNHAN", () => {
    const values = {
      ...blankInitialValues,
      coKhoChiu: "1",
      lietke: ["1", "2", "3"],
      "1-mucdo": "1",
      "1-tansuat": "2",
    };
    expect(validate(values)["1-mucdo"]).toBe(undefined);
    expect(validate(values)["1-tansuat"]).toBe(undefined);
    expect(validate(values)["1-nguyennhan"]).toEqual(REQUIRED);
    expect(validate(values)).toMatchSnapshot();
  });
  test("MUCDO = truthy, TANSUAT = truthy, NGUYENNHAN = truthy => it should pass", () => {
    const values = {
      ...blankInitialValues,
      coKhoChiu: "1",
      lietke: ["1", "2", "3"],
      "1-mucdo": "1",
      "1-tansuat": "2",
      "1-nguyennhan": ["1"],
    };
    expect(validate(values)["1-mucdo"]).toBe(undefined);
    expect(validate(values)["1-tansuat"]).toBe(undefined);
    expect(validate(values)["1-nguyennhan"]).toBe(undefined);
    expect(validate(values)).toMatchSnapshot();
  });
  test("it should filter unselected NGUYENHAN", () => {
    const values = {
      ...blankInitialValues,
      coKhoChiu: "1",
      lietke: ["1", "2", "3"],
      "1-mucdo": "1",
      "1-tansuat": "2",
      "1-nguyennhan": ["4"],
    };
    expect(validate(values)["1-nguyennhan"]).toEqual(REQUIRED);
  });

  test("it should do an exhaustive check on NGUYENNHAN", () => {
    const values = {
      coKhoChiu: "1",
      lietke: ["1", "2", "3", "4"],
      lietkeCustom: "",
      "1-mucdo": "0",
      "1-tansuat": null,
      "1-nguyennhan": [],
      "2-mucdo": "0",
      "2-tansuat": null,
      "2-nguyennhan": [],
      "3-mucdo": "0",
      "3-tansuat": null,
      "3-nguyennhan": [],
      "4-mucdo": "0",
      "4-tansuat": null,
      "4-nguyennhan": [],
      "5-mucdo": "0",
      "5-tansuat": null,
      "5-nguyennhan": [],
      "6-mucdo": "0",
      "6-tansuat": null,
      "6-nguyennhan": [],
      "7-mucdo": "1",
      "7-tansuat": "1",
      "7-nguyennhan": ["2", "3"],
      "8-mucdo": "2",
      "8-tansuat": "1",
      "8-nguyennhan": ["1"],
    };
    expect(validate(values)).toEqual("foo");
  });
});
