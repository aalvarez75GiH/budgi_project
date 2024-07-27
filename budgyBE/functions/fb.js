const functions = require("firebase-functions");
// dotenv = require("dotenv");
// console.log(
//   "GOOGLE_APPLICATION_CREDENTIALS:",
//   process.env.GOOGLE_APPLICATION_CREDENTIALS
// );
const admin = require("firebase-admin");
const fcn = functions;
// const serviceAccount = require("./serviceAccountKey.json");
// const serviceAccount = require("./googleServicesAccountKey.json");
const serviceAccount = require("./googleServicesAccountKey.json");
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
