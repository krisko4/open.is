const mongoose = require('mongoose')
const Contact = require('./model/contact')


const contactService = {
    sendMessage : (contact) => new Contact({
        _id: new mongoose.Types.ObjectId,
        ...contact
    }).save()  
}

module.exports = contactService