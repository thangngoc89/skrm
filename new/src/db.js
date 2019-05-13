import PouchDb from "pouchdb";

const db = new PouchDb("hmong", { auto_compaction: true });

// PouchDb.sync("hmong", "http://localhost:3001/test", {
//   live: true,
//   retry: true,
// });

window.db = db;

export default db;

export const TIEUHOC = 0;
export const MAUGIAO = 1;
