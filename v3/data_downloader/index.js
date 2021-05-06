import "isomorphic-fetch";
import { Database } from "./firebase-firestore-lite/Database.js";
import { createWriteStream } from "fs";
import { join } from "path";

const db = new Database({ projectId: "thucdia-e52ff" });

const loadCollection = async (collectionName) => {
  const ws = createWriteStream(join("/Users/khoa/dev/voser/v3/data_downloader/data", collectionName));

  const collRef = db.ref(collectionName);

  let counter = 0;
  let list = await collRef.list();
  counter = list.documents.length;
  console.log("Downloaded", counter, "from", collectionName);
  writeList(ws, list);

  while (typeof list.options.pageToken !== "undefined") {
    list = await list.getNextPage();
    counter = counter + list.documents.length;
    console.log("Downloaded", counter, "from", collectionName);
    writeList(ws, list);
  }

  ws.close();
};

loadCollection("prod--surveyData");

function getDocumentId(document) {
  return document.__meta__.id;
}

function getDocumentsFromList(list) {
  return list.documents.map((doc) => {
    return { __id: getDocumentId(doc), ...doc };
  });
}

function writeList(ws, list) {
  const docs = getDocumentsFromList(list);

  docs.forEach((doc) => {
    ws.write(JSON.stringify(doc));
    ws.write("\n");
  });
}
