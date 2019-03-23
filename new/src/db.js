import PouchDb from "pouchdb";

const db = new PouchDb("hmong", { auto_compaction: true });

// PouchDb.sync("hmong", "http://localhost:3001/test", {
//   live: true,
//   retry: true,
// });
const demo = () => {
  const data = require("./export_excel/hong.json");
  db.bulkDocs(
    data.map(row => {
      delete row._rev;
      return row;
    })
  )
    .then(console.log)
    .catch(console.log);
};

window.demo = demo;

export default db;
