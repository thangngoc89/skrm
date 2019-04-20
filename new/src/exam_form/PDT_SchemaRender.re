[@bs.config {jsx: 3}];
open ReactHelpers;

external toString: Js.Json.t => string = "%identity";

let getErrorString = error => {
  error->Belt.Option.map(toString);
};

external toStringDict: Js.Json.t => Js.Dict.t(string) = "%identity";

let getErrorObject = error => {
  error
  ->Belt.Option.map(toStringDict)
  ->Belt.Option.getWithDefault(Js.Dict.empty());
};

module TextInputWithType = {
  [@react.component]
  let make = (~label, ~field, ~type_, ~error, ~touched) => {
    <FormField
      label
      htmlFor={
        field##name;
      }
      error=?{touched ? getErrorString(error) : None}>
      <TextInput
        type_
        name={field##name}
        id={field##name}
        value={field##value}
        onChange={field##onChange}
        onBlur={field##onBlur}
      />
    </FormField>;
  };
};

module RenderRow = {
  let setTableCellValue:
    (Js.Dict.t(string), string, string) => Js.Dict.t(string) = [%raw
    {|
        function (fieldValue, cellLabel, value) {
          return Object.assign({}, fieldValue, { [cellLabel]: value})
        }
      |}
  ];

  [@react.component]
  let make = (~row, ~setFieldValue, ~setFieldTouched) => {
    <Box direction=`row_responsive>
      {row
       ->Belt.Array.map(((node, size)) => {
           let {PDT_Schema.Node.label, id, data, suggest} = node;
           <Box key=id className={"lg:mx-2 flex-" ++ size->string_of_int}>
             <Formik.FastField
               name=id
               render={renderProps => {
                 let field = renderProps##field;
                 let form = renderProps##form;

                 let error = form##errors->Js.Dict.get(field##name);
                 let touched =
                   form##touched
                   ->Js.Dict.get(field##name)
                   ->Belt.Option.flatMap(json =>
                       switch (json->Js.Json.classify) {
                       | JSONTrue => Some(true)
                       | _ => Some(false)
                       }
                     )
                   ->(
                       fun
                       | Some(true) => true
                       | _ => false
                     );

                 switch (data) {
                 | Date(_) =>
                   <TextInputWithType type_="date" field label error touched />
                 | String(_) =>
                   <TextInputWithType type_="text" field label error touched />
                 | Integer(_) =>
                   <TextInputWithType
                     type_="number"
                     field
                     label
                     error
                     touched
                   />
                 | SelectOne(_, options) =>
                   <FormField
                     label
                     htmlFor={field##name}
                     error=?{touched ? getErrorString(error) : None}>
                     <Select
                       options
                       name={field##name}
                       id={field##name}
                       value={field##value}
                       onChange={value => setFieldValue(. field##name, value)}
                       onBlur={field##onBlur}
                     />
                   </FormField>
                 | Table(_, table, showLabel) =>
                   let fieldValue: Js.Dict.t(string) =
                     Obj.magic(field##value);
                   <div className="my-2 lg:my-0">
                     {showLabel
                        ? <Heading level=3 size="small"> label->str </Heading>
                        : React.null}
                     <PDT_TableRender
                       id={field##name}
                       table
                       value=fieldValue
                       onCellChange={(. cellLabel, value) =>
                         setFieldValue(.
                           field##name,
                           setTableCellValue(fieldValue, cellLabel, value),
                         )
                       }
                       // Too slow
                       //  onCellBlur={_ => setFieldTouched(. field##name, true)}
                       error={getErrorObject(error)}
                     />
                   </div>;
                 };
               }}
             />
           </Box>;
         })
       ->React.array}
    </Box>;
  };
};

[@react.component]
let make =
    (
      ~layout: PDT_Schema.Layout.t,
      ~setFieldValue: (. PDT_Schema.Node.nodeId, 'a) => unit,
      ~setFieldTouched: (. PDT_Schema.Node.nodeId, bool) => unit,
    ) => {
  <Box direction=`column>
    {{layout->Belt.Array.map(({title, items: groupItems}) =>
        <Box className="my-4" key=title>
          <Heading level=3> title->str </Heading>
          {groupItems
           ->Belt.Array.mapWithIndex((i, row) =>
               <RenderRow
                 key={i->string_of_int}
                 row
                 setFieldValue
                 setFieldTouched
               />
             )
           ->React.array}
        </Box>
      )}
     ->React.array}
  </Box>;
};
