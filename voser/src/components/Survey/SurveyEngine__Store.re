module Types = SurveyEngine__Types;

module Store = {
  module StringMap = Belt.MutableMap.String;
  type valueStore = StringMap.t(Types.t);
  let valueStore: valueStore = StringMap.make();

  // Callback for each subscriber
  type subCallback = Types.t => unit;
  // Subscriber metadata identifier
  type sub = {
    id: Id.t,
    cb: subCallback,
  };
  let subscribers: StringMap.t(array(sub)) = StringMap.make();

  let subscribe = (name, cb) => {
    let id = Id.make();

    subscribers->StringMap.set(
      name,
      subscribers
      ->StringMap.get(name)
      ->Belt.Option.getWithDefault([||])
      ->Belt.Array.concat([|{id, cb}|]),
    );
    id;
  };

  let unsubscribe = (name, subId) =>
    subscribers->StringMap.set(
      name,
      subscribers
      ->StringMap.get(name)
      ->Belt.Option.getWithDefault([||])
      ->Belt.Array.keep(({id, cb: _}) => id != subId),
    );

  let read = name => {
    valueStore->StringMap.get(name);
  };

  let readUnsafe = name => {
    name->read->Belt.Option.getUnsafe;
  };

  let notify = (~newValue=?, name) =>
    subscribers
    ->StringMap.get(name)
    ->Belt.Option.getWithDefault([||])
    ->Belt.Array.forEach(({id: _, cb}) =>
        newValue->Belt.Option.getWithDefault(readUnsafe(name))->cb
      );

  let write = (name, newValue) => {
    valueStore->StringMap.set(name, newValue);
    notify(~newValue, name);
  };
};

module type DataType = {
  type value;
  let fromValue: value => Types.t;
};

module Make = (DataType: DataType) => {
  external toValue: Types.t => DataType.value = "%identity";

  let useStoreValue = (~initialValue=?, name) => {
    let write = (name, value) => {
      Store.write(name, value->DataType.fromValue);
    };

    let (state, send) =
      React.useReducer(
        (_, _) => Store.readUnsafe(name),
        {
          switch (initialValue) {
          | None => Store.readUnsafe(name)
          | Some(value) => DataType.fromValue(value)
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
