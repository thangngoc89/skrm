// type common('a) = Js.t({.. common: string} as 'a);

// let bar = {"common": "common", "bar": "bar"};

// let sayCommon = doc => {
//   doc##common;
// };

// sayCommon(bar)->Js.log;

// let foo = {"common": "common", "foo": "foo"};
// sayCommon(foo)->Js.log;

// module type T = {
//   type table('a) =
//     Js.t(
//       {
//         ..
//         id: string,
//         hoVaTen: string,
//         ngayKham: string,
//         nguoiKham: string,
//         soHoSo: string,
//         phieuDieuTra: bool,
//       } as 'a,
//     );
// };

// module Render = (T: T) => {
//   // T.record##soHoSo;
// };

// module RenderFoo =
//   Render({
//     type table = {
//       .
//       "id": string,
//       "hoVaTen": string,
//       "ngayKham": string,
//       "nguoiKham": string,
//       "soHoSo": string,
//       "phieuDieuTra": bool,
//       "bangCauHoi": bool,
//       "childOIDP": bool,
//       "hoanTat": bool,
//     };
//   });

// module RenderBar =
//   Render({
//     type doc = {
//       .
//       "bar": string,
//       "common": string,
//     };
//     let bar = {"bar": "bar", "common": "common"};
//   });
