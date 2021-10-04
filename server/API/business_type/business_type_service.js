const BusinessType = require('./model/business_type')
const mongoose = require('mongoose')
const businessTypeService = {
    addBusinessType: (type) => new BusinessType({
        _id: new mongoose.Types.ObjectId,
        name: type
    }).save(),

    getBusinessTypes: () => BusinessType.find().exec()
}

module.exports = businessTypeService