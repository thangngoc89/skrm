const fs = require("fs");
const ws = fs.createWriteStream("data.nguoitruongthanh.json", {
  flags: "a", // 'a' means appending (old data will be preserved)
});

const firebase = require("firebase");
require("firebase/firestore");

const config = {
  apiKey: "AIzaSyDoPlIJYQeuUnlePYReFeDSs8wogftUheo",
  authDomain: "thucdia-e52ff.firebaseapp.com",
  databaseURL: "https://thucdia-e52ff.firebaseio.com",
  projectId: "thucdia-e52ff",
  storageBucket: "",
  messagingSenderId: "1041107599637",
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

db
  .collection("production--form_adult")
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      ws.write(JSON.stringify(doc.data()) + "\n");
    });
  })
  .then(() => {
    ws.end();
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
  });
