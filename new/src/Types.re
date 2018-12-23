module Rang = {
  type rang_sua = [
    | `r51
    | `r52
    | `r53
    | `r54
    | `r55
    | `r61
    | `r62
    | `r63
    | `r64
    | `r65
    | `r71
    | `r72
    | `r73
    | `r74
    | `r75
    | `r81
    | `r82
    | `r83
    | `r84
    | `r85
  ];
  type rang_vv = [
    | `r11
    | `r12
    | `r13
    | `r14
    | `r15
    | `r16
    | `r17
    | `r18
    | `r21
    | `r22
    | `r23
    | `r24
    | `r25
    | `r26
    | `r27
    | `r28
    | `r31
    | `r32
    | `r33
    | `r34
    | `r35
    | `r36
    | `r37
    | `r38
    | `r41
    | `r42
    | `r43
    | `r44
    | `r45
    | `r46
    | `r47
    | `r48
  ];
};
module Tinh_trang_nhu_cau = {
  type tinh_trang =
    | Tt_vinh_vien(Rang.rang_vv, mat_rang(smt_vv))
    | Tt_sua(Rang.rang_sua, mat_rang(smt_sua))
  and smt_vv =
    | SMT_0
    | SMT_1
    | SMT_2
    | SMT_3
    | SMT_4
    | SMT_5
    | SMT_6
    | SMT_7
    | SMT_8
    | SMT_9
  and smt_sua =
    | SMT_A
    | SMT_B
    | SMT_C
    | SMT_D
    | SMT_E
    | SMT_F
  and mat_rang('smt) = {
    tt: 'smt,
    nhai: option('smt),
    ngoai: 'smt,
    trong: 'smt,
    gan: 'smt,
    xa: 'smt,
  };

  type nhu_cau =
    | NC_0
    | NC_1
    | NC_2
    | NC_3
    | NC_4
    | NC_5
    | NC_6
    | NC_F
    | NC_P;

  type row = {
    nhu_cau,
    tinh_trang,
  };

  type ham = array(row);
  /* let ham_tren = [|
       {
         nhu_cau: NC_0,
         tinh_trang:
           Tt_vinh_vien(
             `r11,
             {
               tt: SMT_0,
               nhai: Some(SMT_0),
               ngoai: SMT_0,
               trong: SMT_0,
               gan: SMT_0,
               xa: SMT_0,
             },
           ),
       },
     |]; */
};

type item('a) = {
  id: 'a,
  label: string,
  typ: [
    | `string
    | `date
    | `number
    | `select_one(list(string))
    | `tinh_trang_nhu_cau
  ],
};

type items_section('a) = {
  title: string,
  items: list(item('a)),
};

let phieu_dieu_tra = [
  {
    title: {j|Hành chính|j},
    items: [
      {id: `ngay_kham, label: {j|Ngày khám|j}, typ: `date},
      {id: `so_ho_so, label: {j|Số hồ sơ|j}, typ: `string},
      {id: `nguoi_kham, label: {j|Người khám|j}, typ: `string},
      {id: `ho_va_ten, label: {j|Họ và tên|j}, typ: `string},
      {id: `tuoi, label: {j|Tuổi|j}, typ: `number},
      {
        id: `gioi,
        label: {j|Giới tính|j},
        typ: `select_one([{j|Nam|j}, {j|Nữ|j}]),
      },
      {id: `dan_toc, label: {j|Dân tộc|j}, typ: `string},
      {id: `lop, label: {j|Lớp|j}, typ: `string},
      {id: `truong, label: {j|Trường|j}, typ: `string},
      {id: `dia_chi, label: {j|Địa chỉ|j}, typ: `string},
    ],
  },
  {
    title: {j|Tình trạng và nhu cầu|j},
    items: [
      {id: `ttnc_ham_tren, label: {j|Hàm trên|j}, typ: `tinh_trang_nhu_cau},
      {
        id: `ttnc_ham_duoi,
        label: {j|Hàm dưới|j},
        typ: `tinh_trang_nhu_cau,
      },
    ],
  },
];

let text_of_id =
  fun
  | `ngay_kham => "ngay_kham"
  | `so_ho_so => "so_ho_so"
  | `nguoi_kham => "nguoi_kham"
  | `ho_va_ten => "ho_va_ten"
  | `tuoi => "tuoi"
  | `gioi => "gioi"
  | `dan_toc => "dan_toc"
  | `lop => "lop"
  | `truong => "truong"
  | `dia_chi => "dia_chi"
  | `ttnc_ham_tren => "ttnc_ham_tren"
  | `ttnc_ham_duoi => "ttnc_ham_duoi";
