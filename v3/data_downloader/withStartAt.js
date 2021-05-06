import "isomorphic-fetch";
import { Database } from "./firebase-firestore-lite/Database.js";
import { createWriteStream } from "fs";
import { join } from "path";

const db = new Database({ projectId: "thucdia-e52ff" });

const loadCollection = async (collectionName) => {
  const ws = createWriteStream(join("/Users/khoa/dev/voser/v3/data_downloader/data", collectionName), { flags: "a" });

  const docRef = db.ref("prod--surveyData/01F2MXT3PZ5VMC3ZV8DSESEVEQ");
  const doc = await docRef.get();

  const collRef = db.ref(collectionName);
  let res = await collRef.query({ startAt: doc }).run();

  res
    .map((doc) => {
      return { __id: getDocumentId(doc), ...doc };
    })
    .forEach((doc) => {
      ws.write(JSON.stringify(doc));
      ws.write("\n");
    });

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
