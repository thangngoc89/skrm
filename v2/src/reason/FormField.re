open MaterialUi;
open Helpers;

module Text = {
  [@react.component]
  let make =
      (~value=?, ~onChange=?, ~name=?, ~label=?, ~fullWidth=?, ~required=?) => {
    let inputBaseStyles = MuiTreasury.Styles.TextField.Bordered.useInputBase();
    let inputLabelStyles =
      MuiTreasury.Styles.TextField.Bordered.useInputLabel();
    <TextField
      ?name
      ?label
      ?value
      ?onChange
      ?fullWidth
      ?required
      _InputProps={"classes": inputBaseStyles, "disableUnderline": true}
      _InputLabelProps={"classes": inputLabelStyles, "shrink": true}
    />;
  };
};

module SelectOne = {
  [@react.component]
  let make = (~value=?, ~handleChange, ~field: Survey_bs.select) => {
    <FormControl component={`String("fieldset")}>
      <FormLabel component={`String("legend")} required=true>
        {field.label}
      </FormLabel>
      <RadioGroup name={field.id} value>
        {field.params
         ->Belt.List.map(({value, label}) => {
             <FormControlLabel
               key=value
               value
               control={<Radio />}
               label={s(label)}
               onChange={e => e->ReactEvent.Form.target##value->handleChange}
             />
           })}
      </RadioGroup>
    </FormControl>;
  };
};
