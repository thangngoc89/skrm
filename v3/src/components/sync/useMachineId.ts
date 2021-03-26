import { makeId } from "../db/db";

const key = "voser__machineId";

export const useMachineId = () => {
  const ls = window.localStorage.getItem(key);
  if (!ls) {
    const id = makeId();
    window.localStorage.setItem(key, id);
    return id;
  } else {
    return ls;
  }
};
