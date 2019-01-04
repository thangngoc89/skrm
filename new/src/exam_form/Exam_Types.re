module Ttnc: {
  type t = pri string;
  let make: string => t;
} = {
  type t = string;

  let make = a => a;
};

module GioiTinh = {
  type t =
    | Nam
    | Nu;
};
