import PouchDb from "pouchdb";

const db = new PouchDb("hmong", { auto_compaction: true });

// PouchDb.sync("hmong", "http://localhost:3001/test", {
//   live: true,
//   retry: true,
// });

export default db;
