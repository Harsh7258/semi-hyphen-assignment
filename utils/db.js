const admin = require("firebase-admin");
const serviceAccount = require('../blogApiCred.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID
});

const firebaseDB = admin.firestore();

module.exports = firebaseDB;