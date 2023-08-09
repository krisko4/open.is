const admin = require('../firebase-admin')

const payload = {
    notification: {
        title: "Hello",
        body: "Thank you for subscribing!"
    }
};
const greet = async (token) => {
    try {
        const res = await admin.messaging().sendToDevice(token, payload)
        console.log('Successfully sent message:', res)
    } catch (err) {
        console.log("Error sending message:", err)
    }
}

module.exports = greet;