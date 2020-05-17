module Types = SurveyEngine__Types;
/**
 * This is a specialized store for making really fast form
 * It uses a HashMap under the hood for storing data and
 * keeping tracking of the listener
 *
 * You should put `useField` as close to the input as possible
 * To minimize the number of renders
 */
module Store: {
  type t;
  type id = Id.t;
  type error = string;
  type key = string;
  type listener = Types.t => unit;

  let init: unit => t;

  /** Subscribe to a value in the store */
  let subscribe: (~key: key, ~listener: listener, t) => id;
  /** Unsubscribe the listener */
  let unsubscribe: (~key: key, ~id: id, t) => unit;

  let readValue: (~key: key, t) => option(Types.t);

  /** Write a new value to particular key and notify all listener */
  let writeValue: (~key: key, ~value: Types.t, t) => unit;
  let writeValueNoSub: (~key: key, ~value: Types.t, t) => unit;

  let readError: (~key: key, t) => option(error);
  let writeError: (~key: key, ~error: error, t) => unit;
};

module Form: {
  module type UseFieldDataType = {
    type value;
    let fromValue: value => Types.t;
  };

  module MakeUseField:
    (T: UseFieldDataType) =>
     {
      let useField:
        (
          ~dependsOn: array(Store.key)=?,
          ~key: Store.key,
          React.ref(Store.t)
        ) =>
        (option(T.value), T.value => unit);
    };

  let useForm: unit => React.ref(Store.t);
};
