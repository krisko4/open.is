const mongoose = require('monogoose');

const NotificationSchema = new mongoose.Schema({
    title: ReqString,
    content: ReqString,
    place: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Place'
    }
})

module.exports = mongoose.Model('Notifications', NotificationSchema)