module Node = {
  type nodeId = string;

  type defaultDate = string;
  type defaultString = string;
  type defaultInteger = int;

  type defaultSelectOne = string;
  type selection =
    Select.pair = {
      value: string,
      label: string,
    };
  type defaultTable = Js.Dict.t(string);
  type nodeData =
    | Date(option(defaultDate))
    | String(option(defaultString))
    | Integer(option(defaultInteger))
    | SelectOne(option(defaultSelectOne), array(selection))
    | Table(option(defaultTable), PDT_Types.Table.table, bool);

  type validate =
    | NoValidate
    | CustomValidate(Yup.schema)
    | DefaultValidate;

  type t = {
    id: nodeId,
    label: string,
    data: nodeData,
    suggest: bool,
    validate,
  };

  let makeNode =
      (~id, ~label, ~data, ~validate=DefaultValidate, ~suggest=false, ()) => {
    {id, label, data, suggest, validate};
  };
};
module BuiltinNodes = {
  open Node;
  let ngayKham: Node.t = {
    makeNode(
      ~id="ngayKham",
      ~label={j|Ngày khám|j},
      ~data=Date(Some(DateFns.format(Js.Date.make(), "YYYY-MM-DD"))),
      (),
    );
  };

  let soHoSo: Node.t = {
    makeNode(
      ~id="soHoSo",
      ~label={j|Số hồ sơ|j},
      ~data=String(None),
      (),
    );
  };

  let nguoiKham: Node.t =
    makeNode(
      ~id="nguoiKham",
      ~label={j|Người khám|j},
      ~data=String(None),
      ~suggest=true,
      (),
    );

  let hoVaTen =
    makeNode(
      ~id="hoVaTen",
      ~label={j|Họ và tên|j},
      ~data=String(None),
      (),
    );

  let tuoi =
    makeNode(
      ~id="tuoi",
      ~label={j|Tuổi|j},
      ~data=Integer(Some(1)),
      ~validate=
        CustomValidate(
          {
            open! Yup;
            number()->integer->min(1)->required;
          },
        ),
      (),
    );

  let danToc: Node.t =
    makeNode(
      ~id="danToc",
      ~label={j|Dân tộc|j},
      ~data=String(None),
      ~suggest=true,
      (),
    );

  let gioiTinh: Node.t =
    makeNode(
      ~id="gioiTinh",
      ~label={j|Giới tính|j},
      ~data=
        SelectOne(
          Some(""),
          [|
            {label: {j|1 - Nam|j}, value: "1"},
            {label: {j|2 - Nữ|j}, value: "2"},
          |],
        ),
      (),
    );
  let lop =
    makeNode(
      ~id="lop",
      ~label={j|Lớp|j},
      ~data=String(None),
      ~suggest=true,
      (),
    );
  let truong =
    makeNode(
      ~id="truong",
      ~label={j|Trường|j},
      ~data=String(None),
      ~suggest=true,
      (),
    );
  let diaChi =
    makeNode(
      ~id="diaChi",
      ~label={j|Địa chỉ|j},
      ~data=String(None),
      ~suggest=true,
      (),
    );

  let makeTable = (~id, ~label, ~showLabel, ~schema) => {
    makeNode(
      ~id,
      ~label,
      ~data=Table(None, schema, showLabel),
      ~validate=CustomValidate(PDT_TableSchema.YupSchema.make(schema)),
      (),
    );
  };
  /* Tables */
  let ttncHamTren_maugiao =
    makeTable(
      ~id="ttncHamTren",
      ~label={j|Hàm trên|j},
      ~schema=PDT_TableSchema.Tinh_trang_ham_tren_maugiao.table,
      ~showLabel=false,
    );
  let ttncHamDuoi_maugiao =
    makeTable(
      ~id="ttncHamDuoi",
      ~label={j|Hàm dưới|j},
      ~schema=PDT_TableSchema.Tinh_trang_ham_duoi_maugiao.table,
      ~showLabel=false,
    );
  let pi_maugiao =
    makeTable(
      ~id="pi",
      ~label="PI",
      ~schema=PDT_TableSchema.OHIS_Maugiao.table,
      ~showLabel=true,
    );
  /* Tables Tieuhoc */
  let ttncHamTren_tieuhoc =
    makeTable(
      ~id="ttncHamTren",
      ~label={j|Hàm trên|j},
      ~schema=PDT_TableSchema.Tinh_trang_ham_tren.table,
      ~showLabel=false,
    );
  let ttncHamDuoi_tieuhoc =
    makeTable(
      ~id="ttncHamDuoi",
      ~label={j|Hàm dưới|j},
      ~schema=PDT_TableSchema.Tinh_trang_ham_duoi.table,
      ~showLabel=false,
    );
  let pi_tieuhoc =
    makeTable(
      ~id="pi",
      ~label="PI",
      ~schema=PDT_TableSchema.OHIS.table,
      ~showLabel=true,
    );
  let ci_tieuhoc =
    makeTable(
      ~id="ci",
      ~label="CI",
      ~schema=PDT_TableSchema.OHIS.table,
      ~showLabel=true,
    );
  let cpi =
    makeTable(
      ~id="cpi",
      ~label="CPI",
      ~schema=PDT_TableSchema.CPI.table,
      ~showLabel=false,
    );
  let canPhu: Node.t =
    makeNode(
      ~id="canPhu",
      ~label={j|Độ cắn phủ|j},
      ~data=Integer(None),
      (),
    );
  let canChia: Node.t =
    makeNode(
      ~id="canChia",
      ~label={j|Độ cắn chìa|j},
      ~data=Integer(None),
      (),
    );

  let selectOneBinaryValue = [|
    {label: {j|0 - Không|j}, value: "0"},
    {label: {j|1 - Có|j}, value: "1"},
  |];

  let canNguocRangTruoc: Node.t =
    makeNode(
      ~id="canNguocRangTruoc",
      ~label={j|Cắn ngược răng trước|j},
      ~data=SelectOne(None, selectOneBinaryValue),
      (),
    );
  let canNguocRangSau: Node.t =
    makeNode(
      ~id="canNguocRangSau",
      ~label={j|Cắn ngược răng răng sau|j},
      ~data=SelectOne(None, selectOneBinaryValue),
      (),
    );
  let canHo: Node.t =
    makeNode(
      ~id="canHo",
      ~label={j|Cắn hở|j},
      ~data=SelectOne(None, selectOneBinaryValue),
      (),
    );
  let fluorMaSo: Node.t =
    makeNode(
      ~id="fluorMaSo",
      ~label={j|Mã số|j},
      ~data=
        SelectOne(
          None,
          [|
            {label: "0", value: "0"},
            {label: "1", value: "1"},
            {label: "2", value: "2"},
            {label: "3", value: "3"},
            {label: "4", value: "4"},
            {label: "5", value: "5"},
          |],
        ),
      (),
    );
  let fluorSoRang: Node.t =
    makeNode(
      ~id="fluorSoRang",
      ~label={j|Số răng|j},
      ~data=Integer(None),
      (),
    );
  let mocChenChuc: Node.t =
    makeTable(
      ~id="mocChenChuc",
      ~label={j|Mọc chen chúc|j},
      ~schema=PDT_TableSchema.MocChenChuc.table,
      ~showLabel=false,
    );
  let mih: Node.t =
    makeTable(
      ~id="mih",
      ~label={j|MIH|j},
      ~schema=PDT_TableSchema.MIH.table,
      ~showLabel=false,
    );
  let angleData =
    SelectOne(
      None,
      [|
        {label: "1", value: "1"},
        {label: "2", value: "2"},
        {label: "3", value: "3"},
        {label: "9", value: "9"},
      |],
    );
  let angleR3P: Node.t =
    makeNode(~id="angleR3P", ~label={j|R3P|j}, ~data=angleData, ());
  let angleR3T: Node.t =
    makeNode(~id="angleR3T", ~label={j|R3T|j}, ~data=angleData, ());
  let angleR6P: Node.t =
    makeNode(~id="angleR6P", ~label={j|R6P|j}, ~data=angleData, ());
  let angleR6T: Node.t =
    makeNode(~id="angleR6T", ~label={j|R6T|j}, ~data=angleData, ());
};

module Layout = {
  type item = (Node.t, int);
  let makeItem = (~size=1, node: Node.t): item => (node, size);
  type row = array(item);

  type group = {
    title: string,
    items: array(row),
  };
  type t = array(group);

  let getNodes: t => array(Node.t) =
    layout => {
      let flattenRow = (row, result) => {
        row->Belt.Array.forEach(((node, _)) =>
          result |> Js.Array.push(node) |> ignore
        );
      };
      let flattenGroup = (group, result) => {
        let {items} = group;
        items->Belt.Array.forEach(row => flattenRow(row, result));
      };
      let result = [||];
      layout->Belt.Array.forEach(group => flattenGroup(group, result));

      result;
    };

  let getIds: array(Node.t) => array(Node.nodeId) =
    nodes => nodes->Belt.Array.map(({id}) => id);
};

module Form = {
  let makeInitialValues: array(Node.t) => Js.Dict.t('a) =
    nodes => {
      nodes->Belt.Array.reduce(
        Js.Dict.empty(),
        (acc, node) => {
          let {Node.data, id} = node;
          let set = Js.Dict.set(acc, id);
          switch (data) {
          | Date(None)
          | String(None)
          | Integer(None)
          | SelectOne(None, _) => set("")

          | String(Some(def)) => set(def)
          | Integer(Some(def)) => set(Obj.magic(def))
          | SelectOne(Some(def), _) => set(def)
          | Date(Some(def)) => set(def)

          | Table(Some(def), _, _) => set(Obj.magic(def))
          | Table(None, _, _) => set(Obj.magic(Js.Dict.empty()))
          };
          acc;
        },
      );
    };

  let makeYupSchema: array(Node.t) => Yup.schema =
    nodes => {
      open Yup;
      let objectShape =
        nodes->Belt.Array.reduce(
          Js.Dict.empty(),
          (acc, node) => {
            let {Node.data, id, validate, label: nodeLabel} = node;
            let set = Js.Dict.set(acc, id);
            switch (validate) {
            | NoValidate => acc
            | CustomValidate(schema) =>
              set(schema->label(nodeLabel));
              acc;
            | DefaultValidate =>
              let nodeSchema =
                switch (data) {
                | String(_) => string()
                | Integer(_) => number()
                | SelectOne(_, options) =>
                  string()
                  ->oneOf_custom(
                      options->Belt.Array.map(({Node.value}) => value),
                      {js|"${path} chỉ chấp nhận các giá trị: "|js}
                      ++ options
                         ->Belt.Array.map(({Node.label}) => label)
                         ->Js.Array.joinWith(", ", _),
                    )
                | _ => mixed()
                };
              set(nodeSchema->required->label(nodeLabel));
              acc;
            };
          },
        );
      dict(objectShape);
    };
};
module Maugiao = {
  module N = BuiltinNodes;
  let i = Layout.makeItem;

  let layout: Layout.t = [|
    {
      title: {j|Hành chính|j},
      items: [|
        [|i(N.ngayKham), i(N.soHoSo), i(N.nguoiKham)|],
        [|i(N.hoVaTen)|],
        [|i(N.tuoi), i(N.danToc), i(N.gioiTinh)|],
        [|i(N.lop), i(~size=2, N.truong)|],
        [|i(N.diaChi)|],
      |],
    },
    {
      title: {j|Tình trạng và nhu cầu|j},
      items: [|[|i(N.ttncHamTren_maugiao), i(N.ttncHamDuoi_maugiao)|]|],
    },
    {
      title: {j|Tình trạng vệ sinh răng miệng|j},
      items: [|[|i(N.pi_maugiao)|]|],
    },
  |];

  let nodes = Layout.getNodes(layout);
  let ids = Layout.getIds(nodes);
  let initialValues = Form.makeInitialValues(nodes);
  let yupSchema = Form.makeYupSchema(nodes);
};

let maugiao_layout = Maugiao.layout;
let maugiao_ids = Maugiao.ids;
let maugiao_initialValues = Maugiao.initialValues;
let maugiao_yupSchema = Maugiao.yupSchema;

module Tieuhoc = {
  module N = BuiltinNodes;
  let i = Layout.makeItem;

  let layout: Layout.t = [|
    {
      title: {j|Hành chính|j},
      items: [|
        [|i(N.ngayKham), i(N.soHoSo), i(N.nguoiKham)|],
        [|i(N.hoVaTen)|],
        [|i(N.tuoi), i(N.danToc), i(N.gioiTinh)|],
        [|i(N.lop), i(~size=2, N.truong)|],
        [|i(N.diaChi)|],
      |],
    },
    {
      title: {j|Tình trạng và nhu cầu|j},
      items: [|[|i(N.ttncHamTren_tieuhoc), i(N.ttncHamDuoi_tieuhoc)|]|],
    },
    {
      title: {j|Tình trạng vệ sinh răng miệng|j},
      items: [|[|i(N.pi_tieuhoc), i(N.ci_tieuhoc)|]|],
    },
    {
      title: {j|Tình trạng răng nhiễm Fluor|j},
      items: [|[|i(N.fluorMaSo), i(N.fluorSoRang)|]|],
    },
    {
      title: {j|Chỉ số CPI - Chỉ số chảu máu nướu|j},
      items: [|[|i(N.cpi)|]|],
    },
    {
      title: {j|Tình trạng khớp cắn|j},
      items: [|
        [|i(N.canPhu), i(N.canChia)|],
        [|i(N.canNguocRangTruoc), i(N.canNguocRangSau), i(N.canHo)|],
      |],
    },
    {title: {j|Mọc chen chúc|j}, items: [|[|i(N.mocChenChuc)|]|]},
    {
      title: {j|Phân loại Angle|j},
      items: [|
        [|i(N.angleR3P), i(N.angleR3T), i(N.angleR6P), i(N.angleR6T)|],
      |],
    },
    {title: {j|MIH|j}, items: [|[|i(N.mih)|]|]},
  |];

  let nodes = Layout.getNodes(layout);
  let ids = Layout.getIds(nodes);
  let initialValues = Form.makeInitialValues(nodes);
  let yupSchema = Form.makeYupSchema(nodes);
};

let tieuhoc_layout = Tieuhoc.layout;
let tieuhoc_ids = Tieuhoc.ids;
let tieuhoc_initialValues = Tieuhoc.initialValues;
let tieuhoc_yupSchema = Tieuhoc.yupSchema;
