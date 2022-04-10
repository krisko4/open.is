const admin = require("firebase-admin");

const serviceAccount = require("../open-is-push-notifications-firebase-adminsdk-40ylp-ca810d7613.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports= admin