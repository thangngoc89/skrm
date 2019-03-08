import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "${path} chưa được điền",
  },
  number: {
    min: "${path} phải có giá trị tối thiểu là ${min}",
    max: "${path} phải có giá trị tối thiểu là ${max}",
  },
});

const mocChenChucOptions = ["0", "1"];
export const mocChenChuc = yup
  .object({
    mcc16: yup
      .string()
      .oneOf(mocChenChucOptions)
      .required()
      .label("16"),
    mcc11: yup
      .string()
      .oneOf(mocChenChucOptions)
      .required()
      .label("11"),
    mcc26: yup
      .string()
      .oneOf(mocChenChucOptions)
      .required()
      .label("26"),
    mcc46: yup
      .string()
      .oneOf(mocChenChucOptions)
      .required()
      .label("46"),
    mcc31: yup
      .string()
      .oneOf(mocChenChucOptions)
      .required()
      .label("31"),
    mcc36: yup
      .string()
      .oneOf(mocChenChucOptions)
      .required()
      .label("36"),
  })
  .required();

const mihOptions = ["0", "1", "2", "3", "4", "5"];
export const mih = yup
  .object({
    mih16: yup
      .string()
      .oneOf(mihOptions)
      .required()
      .label("16"),
    mih12: yup
      .string()
      .oneOf(mihOptions)
      .required()
      .label("12"),
    mih11: yup
      .string()
      .oneOf(mihOptions)
      .required()
      .label("11"),
    mih21: yup
      .string()
      .oneOf(mihOptions)
      .required()
      .label("21"),
    mih22: yup
      .string()
      .oneOf(mihOptions)
      .required()
      .label("22"),
    mih26: yup
      .string()
      .oneOf(mihOptions)
      .required()
      .label("26"),
    mih46: yup
      .string()
      .oneOf(mihOptions)
      .required()
      .label("46"),
    mih42: yup
      .string()
      .oneOf(mihOptions)
      .required()
      .label("42"),
    mih41: yup
      .string()
      .oneOf(mihOptions)
      .required()
      .label("41"),
    mih31: yup
      .string()
      .oneOf(mihOptions)
      .required()
      .label("31"),
    mih32: yup
      .string()
      .oneOf(mihOptions)
      .required()
      .label("32"),
    mih36: yup
      .string()
      .oneOf(mihOptions)
      .required()
      .label("36"),
  })
  .required();

const ohisOptions = ["0", "1", "2", "3", "X"];
export const ohis = yup
  .object({
    ohis16N: yup
      .string()
      .oneOf(ohisOptions)
      .required()
      .label("16N"),
    ohis11N: yup
      .string()
      .oneOf(ohisOptions)
      .required()
      .label("11N"),
    ohis26N: yup
      .string()
      .oneOf(ohisOptions)
      .required()
      .label("26N"),
    ohis46T: yup
      .string()
      .oneOf(ohisOptions)
      .required()
      .label("46(T)"),
    ohis31N: yup
      .string()
      .oneOf(ohisOptions)
      .required()
      .label("31N"),
    ohis36N: yup
      .string()
      .oneOf(ohisOptions)
      .required()
      .label("36(T)"),
  })
  .required();
