import * as facility from "./Form_ChildOIDP_validate";
import { blankInitialValues } from "./Form_ChildOIDP";

const validate = facility.validate;

describe("part 1 is null", () => {
  test("it should require part 1", () => {
    const values = blankInitialValues;
    expect(values.coKhoChiu).toBe(null);
    expect(validate(blankInitialValues)).toEqual(facility.PART_1_REQUIRED);
  });
});

describe("part 1 is falsy", () => {
  test("it should be success", () => {
    const values = {
      ...blankInitialValues,
      coKhoChiu: "0",
    };

    expect(validate(values)).toEqual(facility.SUCCESS(values));
  });
});

describe("part 1 is truthy", () => {
  describe("part 2 is empty", () => {
    test("it should require part 2", () => {
      const values = {
        ...blankInitialValues,
        coKhoChiu: "1",
      };
      expect(validate(values)).toEqual(facility.PART_2_REQUIRED);
    });
  });
  describe("part 2 is selected", () => {
    test("it should not requires part 2", () => {
      const values = {
        ...blankInitialValues,
        coKhoChiu: "1",
        lietke: ["1", "2", "3"],
      };
      expect(validate(values)).not.toEqual(facility.PART_2_REQUIRED);
    });

    describe("part 3", () => {
      test(`MUCDO = "0" => it should not requires NGUYENNHAN or TANSUAT`, () => {
        const values = {
          ...blankInitialValues,
          coKhoChiu: "1",
          lietke: ["1", "2", "3"],
          "1-mucdo": "0",
        };
        expect(validate(values)).not.toEqual(facility.REQUIRED_TANSUAT(1));
        expect(validate(values)).not.toEqual(facility.REQUIRED_NGUYENNHAN(2));
      });
      test("MUCDO = null => it should require MUCDO", () => {
        const values = {
          ...blankInitialValues,
          coKhoChiu: "1",
          lietke: ["1", "2", "3"],
          "1-mucdo": null,
        };
        expect(validate(values)).toEqual(facility.REQUIRED_MUCDO(1));
      });
      test("MUCDO = truthy => it should require TANSUAT", () => {
        const values = {
          ...blankInitialValues,
          coKhoChiu: "1",
          lietke: ["1", "2", "3"],
          "1-mucdo": "1",
        };
        expect(validate(values)).toEqual(facility.REQUIRED_TANSUAT(1));
      });
      test("MUCDO = truthy, TANSUAT = truthy => it should require NGUYENNHAN", () => {
        const values = {
          ...blankInitialValues,
          coKhoChiu: "1",
          lietke: ["1", "2", "3"],
          "1-mucdo": "1",
          "1-tansuat": "2",
        };
        expect(validate(values)).toEqual(facility.REQUIRED_NGUYENNHAN(1));
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
        expect(validate(values)).not.toEqual(facility.REQUIRED_MUCDO(1));
        expect(validate(values)).not.toEqual(facility.REQUIRED_TANSUAT(1));
        expect(validate(values)).not.toEqual(facility.REQUIRED_NGUYENNHAN(1));
      });
      test("MUCDO = truthy, TANSUAT = truthy, NGUYENNHAN = not in selected items => it should requires NGUYENNHAN", () => {
        const values = {
          ...blankInitialValues,
          coKhoChiu: "1",
          lietke: ["1", "2", "3"],
          "1-mucdo": "1",
          "1-tansuat": "2",
          "1-nguyennhan": ["4"],
        };
        expect(validate(values)).toEqual(facility.REQUIRED_NGUYENNHAN(1));
      });
    });
  });
});
