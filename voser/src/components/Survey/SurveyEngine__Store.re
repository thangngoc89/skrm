module Types = SurveyEngine__Types;
module StringMap = Belt.MutableMap.String;

module Store = {
  type valueStore = StringMap.t(Types.t);
  let valueStore: valueStore = StringMap.make();

  type subscription = Types.t => unit;

  let subscribers: StringMap.t(array((Id.t, subscription))) =
    StringMap.make();

  let subscribe = (name, subscription) => {
    let id = Id.make();

    subscribers->StringMap.set(
      name,
      subscribers
      ->StringMap.get(name)
      ->Belt.Option.getWithDefault([||])
      ->Belt.Array.concat([|(id, subscription)|]),
    );
    id;
  };

  let unsubscribe = (name, subId) =>
    subscribers->StringMap.set(
      name,
      subscribers
      ->StringMap.get(name)
      ->Belt.Option.getWithDefault([||])
      ->Belt.Array.keep(sub => fst(sub) != subId),
    );

  let read = name => {
    switch (valueStore->StringMap.get(name)) {
    | None =>
      Js.log(name);
      Js.log(valueStore);
    | Some(_) => ()
    };
    valueStore->StringMap.get(name)->Belt.Option.getUnsafe;
  };

  let notify = (~newValue=?, name) =>
    subscribers
    ->StringMap.get(name)
    ->Belt.Option.getWithDefault([||])
    ->Belt.Array.forEach(sub =>
        sub->snd(newValue->Belt.Option.getWithDefault(read(name)))
      );

  let write = (name, newValue) => {
    valueStore->StringMap.set(name, newValue);
    notify(~newValue, name);
  };
};

module type DataType = {type value;};

module Make = (DataType: DataType) => {
  external toValue: Types.t => DataType.value = "%identity";

  let useStoreValue = (~initialValue=?, name) => {
    let write = (name, value: Types.t) => {
      Store.write(name, value);
    };

    let (state, send) =
      React.useReducer(
        (_, _) => Store.read(name),
        {
          switch (initialValue) {
          | None => Store.read(name)
          | Some(value) => value
          };
        },
      );
    React.useEffect0(() => {
      let subId = Store.subscribe(name, send);
      Some(() => Store.unsubscribe(name, subId));
    });

    (state->toValue, write(name));
  };
};
