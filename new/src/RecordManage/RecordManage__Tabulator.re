open RecordManage__Types;

module TableColumns: {
  let soHoSo: ReactTabulator.column;
  let hoVaTen: ReactTabulator.column;
  let nguoiKham: ReactTabulator.column;
  let ngayKham: ReactTabulator.column;
  let phieuDieuTra: ReactTabulator.column;
  let bangCauHoi: ReactTabulator.column;
  let childOIDP: ReactTabulator.column;
  let hoanTat: ReactTabulator.column;
  let actions: ReactTabulator.column;
} = {
  let m = ReactTabulator.makeColumn;

  let soHoSo =
    m(
      ~title="SHS",
      ~field="soHoSo",
      ~align="center",
      ~width=80,
      ~headerFilter="input",
      ~resizable=false,
      (),
    );
  let hoVaTen =
    m(
      ~title={j|Họ và tên|j},
      ~field="hoVaTen",
      ~headerFilter="input",
      ~minWidth=300,
      (),
    );
  let nguoiKham =
    m(
      ~title={j|Người khám|j},
      ~field="nguoiKham",
      ~minWidth=100,
      ~headerFilter="input",
      ~responsive=1,
      (),
    );
  let ngayKham =
    m(
      ~title={j|Ngày khám|j},
      ~field="ngayKham",
      ~minWidth=100,
      ~headerFilter="input",
      ~responsive=1,
      (),
    );
  let makeTickCross =
    m(
      ~formatter="tickCross",
      ~align="center",
      ~width=50,
      ~headerVertical=true,
      ~responsive=2,
    );
  let phieuDieuTra =
    makeTickCross(
      ~title={j|Phiếu điều tra|j},
      ~field="phieuDieuTra",
      (),
    );
  let bangCauHoi =
    makeTickCross(~title={j|Bảng câu hỏi|j}, ~field="bangCauHoi", ());
  let childOIDP =
    makeTickCross(~title={j|Child-OIDP|j}, ~field="childOIDP", ());
  let hoanTat = makeTickCross(~title={j|Hoàn tất|j}, ~field="hoanTat", ());
  module Actions = {
    [@react.component] [@bs.module "./Actions"]
    external make: (~cell: ReactTabulator.cell) => React.element = "default";
  };
  let actions =
    m(
      ~field="id",
      ~headerSort=false,
      ~minWidth=100,
      ~formatter__custom=
        ReactTabulator.reactFormatter(cell => <Actions cell />),
      (),
    );
};

let tieuhocColumns =
  TableColumns.(
    [|
      soHoSo,
      hoVaTen,
      nguoiKham,
      ngayKham,
      phieuDieuTra,
      bangCauHoi,
      childOIDP,
      hoanTat,
      actions,
    |]
  );
let maugiaoColumns =
  TableColumns.(
    [|soHoSo, hoVaTen, nguoiKham, ngayKham, phieuDieuTra, actions|]
  );

module DataProcessing = {
  type phieuDieuTra = {
    .
    "hoVaTen": string,
    "ngayKham": string,
    "nguoiKham": string,
    "soHoSo": string,
    "complete": Js.Nullable.t(bool),
  };
  type form = {. "complete": Js.Nullable.t(bool)};

  type tieuhocRecord = {
    .
    "_id": string,
    "hoVaTen": Js.Nullable.t(string),
    "ngayKham": Js.Nullable.t(string),
    "nguoiKham": Js.Nullable.t(string),
    "soHoSo": Js.Nullable.t(string),
    "phieuDieuTra": Js.Nullable.t(phieuDieuTra),
    "bangCauHoi": Js.Nullable.t(form),
    "childOIDP": Js.Nullable.t(form),
  };
  type maugiaoRecord = {
    .
    "_id": string,
    "hoVaTen": Js.Nullable.t(string),
    "ngayKham": Js.Nullable.t(string),
    "nguoiKham": Js.Nullable.t(string),
    "soHoSo": Js.Nullable.t(string),
    "phieuDieuTra": Js.Nullable.t(phieuDieuTra),
  };

  type tieuhocTable = {
    .
    "id": string,
    "hoVaTen": string,
    "ngayKham": string,
    "nguoiKham": string,
    "soHoSo": string,
    "phieuDieuTra": bool,
    "bangCauHoi": bool,
    "childOIDP": bool,
    "hoanTat": bool,
  };

  type maugiaoTable = {
    .
    "id": string,
    "hoVaTen": string,
    "ngayKham": string,
    "nguoiKham": string,
    "soHoSo": string,
    "phieuDieuTra": bool,
  };

  let getFormStatus = form => {
    form
    ->Js.Nullable.toOption
    ->Belt.Option.flatMap(form => form##complete->Js.Nullable.toOption)
    ->Belt.Option.getWithDefault(false);
  };
  let mapTieuhoc: tieuhocRecord => tieuhocTable =
    doc => {
      let phieuDieuTra = doc##phieuDieuTra->Js.Nullable.toOption;

      let readProperty = mapper =>
        phieuDieuTra
        ->Belt.Option.map(mapper)
        ->Belt.Option.getWithDefault("");

      let pdt = getFormStatus(doc##phieuDieuTra);
      let bch = getFormStatus(doc##bangCauHoi);
      let co = getFormStatus(doc##childOIDP);

      {
        "id": doc##_id,
        "hoVaTen": readProperty(p => p##hoVaTen),
        "ngayKham": readProperty(p => p##ngayKham),
        "nguoiKham": readProperty(p => p##nguoiKham),
        "soHoSo": readProperty(p => p##soHoSo),
        "phieuDieuTra": pdt,
        "bangCauHoi": bch,
        "childOIDP": co,
        "hoanTat": pdt && bch && co,
      };
    };
  let mapMaugiao: maugiaoRecord => maugiaoTable =
    doc => {
      let phieuDieuTra = doc##phieuDieuTra->Js.Nullable.toOption;

      let readProperty = mapper =>
        phieuDieuTra
        ->Belt.Option.map(mapper)
        ->Belt.Option.getWithDefault("");

      let pdt = getFormStatus(doc##phieuDieuTra);

      {
        "id": doc##_id,
        "hoVaTen": readProperty(p => p##hoVaTen),
        "ngayKham": readProperty(p => p##ngayKham),
        "nguoiKham": readProperty(p => p##nguoiKham),
        "soHoSo": readProperty(p => p##soHoSo),
        "phieuDieuTra": pdt,
      };
    };
};

module ExportModal = {
  open ReactHelpers;
  [@react.component]
  let make = (~handleCloseModal, ~body, ~footer) => {
    <G.Layer
      position="right"
      full__custom="vertical"
      onClickOutside=handleCloseModal
      onEsc=handleCloseModal>
      <G.Box fill=true style={ReactDOMRe.Style.make(~minWidth="378px", ())}>
        <G.Box
          direction=`row
          align="center"
          as_="header"
          elevation=`small
          justify="between"
          style={ReactDOMRe.Style.make(~minHeight="48px", ())}
          pad="xsmall">
          <Heading level=4> {j|Xuất dữ liệu ra Excel|j}->str </Heading>
          <G.Button icon={<G.Icons.FormClose />} onClick=handleCloseModal />
        </G.Box>
        <G.Box flex=true overflow="auto" pad="xsmall"> body </G.Box>
        <G.Box
          as_="footer"
          border__custom={"side": "top"}
          pad="xsmall"
          justify="end"
          direction=`row
          align="center"
          style={ReactDOMRe.Style.make(~minHeight="48px", ())}>
          footer
        </G.Box>
      </G.Box>
    </G.Layer>;
  };
};

module type RenderTable = {
  let kind: int;
  type doc;
  type mappedDoc;
  let mapper: doc => mappedDoc;
  type kindSelector;
  let kindSelector: kindSelector;
  let columns: array(ReactTabulator.column);
  /* Getter */
  let keepInComplete: mappedDoc => bool;
  let getSoHoSo: mappedDoc => string;
  let getId: mappedDoc => string;
};
module RenderTable = (T: RenderTable) => {
  open ReactHelpers;

  [@bs.module "./handleExport.js"]
  external handleExport:
    (~data: 'a, ~fileName: string, ~kind: int) => Js.Promise.t(unit) =
    "handleExport";

  [@react.component]
  let make = () => {
    let docs: array(T.doc) =
      ReactPouchdb.useFind({
        "selector": {
          "_id": {
            "$gte": Js.null,
          },
          "kind": T.kindSelector,
        },
        "sort": [|{"_id": "desc"}|],
      });

    let mappedDocs =
      React.useMemo1(() => docs->Belt.Array.map(T.mapper), [|docs|]);

    let (showModal, setShowModal) = React.useState(() => false);

    let handleCloseModal = _ => setShowModal(_ => false);
    let onOpenModal = _ => setShowModal(_ => true);
    <>
      <G.Button
        label={{j|Xuất Excel|j}->str}
        margin="small"
        primary=true
        onClick=onOpenModal
      />
      {!showModal
         ? React.null
         : {
           let handleExport = () => {
             let fileName =
               Prompt.makeWithDefaultMessage(
                 {j|Tên file excel:|j},
                 "voser__"
                 ++ (
                   switch (T.kind) {
                   | 0 => "tieuhoc__"
                   | 1 => "maugiao__"
                   | _ => ""
                   }
                 )
                 ++ DateFns.format(Js.Date.make(), "HH-mm__DD-MM-YYYY"),
               );

             switch (fileName) {
             | None => ()
             | Some(fileName) =>
               handleExport(~data=docs, ~fileName, ~kind=T.kind)
               |> Js.Promise.then_(_ =>
                    handleCloseModal()->Js.Promise.resolve
                  )
               |> ignore
             };
           };

           let inCompleteRecord =
             mappedDocs->Belt.Array.keep(T.keepInComplete);
           switch (inCompleteRecord->Belt.Array.length) {
           | 0 =>
             let recordCount = mappedDocs->Belt.Array.length;
             <ExportModal
               handleCloseModal
               body={
                 <Text>
                   {j|Xuất $(recordCount) hồ sơ ra Excel|j}->str
                 </Text>
               }
               footer={
                 <G.Button
                   primary=true
                   label={{j|Xuất dữ liệu|j}->str}
                   onClick={_ => handleExport()}
                 />
               }
             />;
           | _ =>
             <ExportModal
               handleCloseModal
               body=
                 <>
                   <Text weight="bold">
                     {j|Các bộ hồ sơ dưới đây chưa hoàn tất:|j}
                     ->str
                   </Text>
                   <ul>
                     {inCompleteRecord
                      ->Belt.Array.map(doc =>
                          <li key={T.getId(doc)}>
                            {T.getSoHoSo(doc)->str}
                          </li>
                        )
                      ->React.array}
                   </ul>
                 </>
               footer={
                 <G.Button
                   primary=true
                   color="status-critical"
                   label={{j|Xuất dữ liệu chưa hoàn chỉnh|j}->str}
                   onClick={_ => handleExport()}
                 />
               }
             />
           };
         }}
      <ReactTabulator
        options={
          "height": 500,
          "placeholder": {j|Chưa có dữ liệu|j},
          "persistentSort": true,
          "persistentFilter": true,
          "groupBy": "ngayKham",
          "groupToggleElement": "header",
        }
        data=mappedDocs
        columns=T.columns
        layout="fitColumns"
      />
    </>;
  };
};

module RenderMaugiao =
  RenderTable({
    let kind = 1;
    type doc = DataProcessing.maugiaoRecord;
    type mappedDoc = DataProcessing.maugiaoTable;
    let mapper = DataProcessing.mapMaugiao;
    type kindSelector = {. "$eq": int};
    let kindSelector = {"$eq": 1};
    let columns = maugiaoColumns;
    /* Getter */
    let keepInComplete = doc => !doc##phieuDieuTra;
    let getSoHoSo = doc => doc##soHoSo;
    let getId = doc => doc##id;
  });

module RenderTieuhoc =
  RenderTable({
    let kind = 0;
    type doc = DataProcessing.tieuhocRecord;
    type mappedDoc = DataProcessing.tieuhocTable;
    let mapper = DataProcessing.mapTieuhoc;
    type kindSelector = {. "$ne": int};
    let kindSelector = {"$ne": 1};
    let columns = tieuhocColumns;
    /* Getter */
    let keepInComplete = doc => !doc##hoanTat;
    let getSoHoSo = doc => doc##soHoSo;
    let getId = doc => doc##id;
  });

[@react.component]
let make = (~tab: tab) => {
  switch (tab) {
  | Tieuhoc => <RenderTieuhoc />
  | Maugiao => <RenderMaugiao />
  };
};
