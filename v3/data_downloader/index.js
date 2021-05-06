import { Database } from "./firebase-firestore-lite/Database.js";

export const db = new Database({ projectId: "thucdia-e52ff" });

const loadCollection = async (collectionName) => {
  const collRef = db.ref(collectionName);

  const coll = await collRef.list();
  console.log(coll.documents);
};

loadCollection("prod--survey");
