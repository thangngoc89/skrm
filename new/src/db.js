import PouchDb from "pouchdb";

const db = new PouchDb("hmong", { auto_compaction: true});

export default db;
