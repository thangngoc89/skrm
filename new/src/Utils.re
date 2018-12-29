let arrayFind = (array, f) => {
  let length = Js.Array.length(array);
  let rec loop = i =>
    if (i < length) {
      let element = array[i];
      if (f(element)) {
        Some(array[i]);
      } else {
        loop(i + 1);
      };
    } else {
      None;
    };
  loop(0);
};
