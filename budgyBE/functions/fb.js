const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fcn = functions;
// const serviceAccount = require("./serviceAccountKey.json");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const getAuth = admin.auth();
const db = admin.firestore();

module.exports = {
  db,
  getAuth,
  fcn,
  admin,
};
