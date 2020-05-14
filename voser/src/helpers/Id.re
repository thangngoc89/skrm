/** 
  This generate light weight unique int id
  for local usages. Please use UUID if you
  want to persist the ids
*/
type t = int;
let id = ref(0);

let make = () => {
  let old_id = id^;
  id := id^ + 1;
  old_id;
};
