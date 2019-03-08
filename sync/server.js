const PouchDB = require("pouchdb");
const express = require("express");
const expressPouchDB = require("express-pouchdb");
const cors = require("cors");

const app = express();
app.use(cors());

var HmongPouch = PouchDB.defaults({ prefix: "./db/" });

app.use(
  "/",
  expressPouchDB(HmongPouch, {
    mode: "fullCouchDB",
    overrideMode: {
      include: ["routes/fauxton"],
    },
  })
);

app.listen(3001, () => {
  let myDb = new HmongPouch("yay");
});
