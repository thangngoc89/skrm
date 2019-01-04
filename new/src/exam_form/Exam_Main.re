module ExamForm = {
  open Formality;

  type field =
    | NgayKham
    | SoHoSo
    | NguoiKham
    | HoVaTen
    | Tuoi
    | GioiTinh
    | DanToc
    | Lop
    | Truong
    | DiaChi
    | TtncHamTren
    | TtncHamDuoi;

  type state = {
    ngayKham: string,
    soHoSo: string,
    nguoiKham: string,
    hoVaTen: string,
    tuoi: int,
    gioiTinh: Exam_Types.GioiTinh.t,
    danToc: string,
    lop: string,
    truong: string,
    diaChi: string,
    ttncHamTren: Exam_Types.Ttnc.t,
    ttncHamDuoi: Exam_Types.Ttnc.t,
  };

  type message = string;

  module NgayKhamField = {
    let update = (state, value) => {...state, ngayKham: value};

    let validator = {
      field: NgayKham,
      strategy: Strategy.OnFirstSuccessOrFirstBlur,
      dependents: None,
      validate: state => Ok(Valid),
    };
  };

  let validators = [NgayKhamField.validator];
};

module ExamFormContainer = Formality.Make(ExamForm);

module Layout = {
  type basis = [ | `full | `half | `oneThird | `twoThird];

  type col('a) = (basis, 'a);
  type row('a) = list(col('a));
  type group('a) = {
    title: string,
    items: list(row('a)),
  };
  type t('a) = list(group('a));

  let phieu_dieu_tra_layout: t('a) = [
    {
      title: {j|Hành chính|j},
      items: [
        [
          (`oneThird, ExamForm.NgayKham),
          (`oneThird, SoHoSo),
          (`oneThird, NguoiKham),
        ],
        [(`full, HoVaTen)],
        [(`oneThird, Tuoi), (`oneThird, DanToc), (`oneThird, GioiTinh)],
        [(`oneThird, Lop), (`twoThird, Truong)],
        [(`full, DiaChi)],
      ],
    },
    {
      title: {j|Tình trạng và nhu cầu|j},
      items: [[(`half, TtncHamTren), (`half, TtncHamDuoi)]],
    },
  ];
};

open React;
let component = ReasonReact.statelessComponent("Exam_Main");

let make = _children => {
  ...component,
  render: _self => {
    <ExamFormContainer
      initialState={
        ngayKham: "",
        soHoSo: "",
        nguoiKham: "",
        hoVaTen: "",
        tuoi: 0,
        gioiTinh: Nam,
        danToc: "",
        lop: "",
        truong: "",
        diaChi: "",
        ttncHamTren: Exam_Types.Ttnc.make(""),
        ttncHamDuoi: Exam_Types.Ttnc.make(""),
      }
      onSubmit={(state, {notifyOnSuccess, notifyOnFailure, reset}) => ()}>
      ...{form =>
        <form
          className="form"
          onSubmit={form.submit->Formality.Dom.preventDefault}>
          <label>
            "Ngay Kham"->str
            <TextInput
              value={form.state.ngayKham}
              type_="date"
              onBlur={_ => form.blur(NgayKham)}
              onChange={event =>
                form.change(
                  NgayKham,
                  ExamForm.NgayKhamField.update(
                    form.state,
                    event->ReactEvent.Form.target##value,
                  ),
                )
              }
            />
          </label>
        </form>
      }
    </ExamFormContainer>;
  },
};
