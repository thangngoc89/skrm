module Types = SurveyEngine__Types;

module Store = {
  module SM = Belt.MutableMap.String;

  type t = {
    values: SM.t(Types.t),
    subs: SM.t(array(subData)),
    errors: SM.t(error),
  }
  and subData = {
    id,
    listener,
  }
  and error = string
  and id = Id.t
  and listener = Types.t => unit;
  type key = string;

  let init = () => {
    {
      // TODO: Implement initial values
      values: SM.make(),
      subs: SM.make(),
      errors: SM.make(),
    };
  };

  let subscribe = (~key, ~listener, store) => {
    let id = Id.make();
    store.subs
    ->SM.set(
        key,
        store.subs
        ->SM.get(key)
        ->Belt.Option.getWithDefault([||])
        ->Belt.Array.concat([|{id, listener}|]),
      );
    id;
  };

  let unsubscribe = (~key, ~id as subId, store) => {
    store.subs
    ->SM.set(
        key,
        store.subs
        ->SM.get(key)
        ->Belt.Option.getWithDefault([||])
        ->Belt.Array.keep(({id, listener: _}) => id != subId),
      );
  };

  let readValue = (~key, store) => {
    store.values->SM.get(key);
  };
  let writeValueNoSub = (~key, ~value, store) => {
    store.values->SM.set(key, value);
  };

  let notify = (~key, ~value, store) => {
    store.subs
    ->SM.get(key)
    ->Belt.Option.getWithDefault([||])
    ->Belt.Array.forEach(({id: _, listener}) => {listener(value)});
  };

  let writeValue = (~key, ~value, store) => {
    writeValueNoSub(~key, ~value, store);
    notify(~key, ~value, store);
  };

  let readError = (~key, store) => {
    failwith("Unimplemented");
  };

  let writeError = (~key, ~error, store) => {
    failwith("Unimplemented");
  };
};

module Form = {
  module type UseFieldDataType = {
    type value;
    let fromValue: value => Types.t;
  };

  module MakeUseField = (T: UseFieldDataType) => {
    external toValue: Types.t => T.value = "%identity";

    // TODO: implement dependsOn
    let useField = (~dependsOn=?, ~key, storeRef) => {
      let store = storeRef.React.current;

      let (abstractValue, listener) =
        React.useReducer(
          (_, _) => Store.readValue(~key, store),
          {
            Store.readValue(~key, store);
          },
        );
      React.useEffect0(() => {
        let id = Store.subscribe(~key, ~listener, store);
        Some(() => Store.unsubscribe(~key, ~id, store));
      });

      let setValue = value => {
        Store.writeValue(~key, ~value=value->T.fromValue, store);
      };

      (abstractValue->Belt.Option.map(toValue), setValue);
    };
  };

  let useForm = () => {
    React.useRef(Store.init());
  };
};
