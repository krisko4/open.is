const businessTypeService = require('./business_type_service')
const businessTypeDto = require('../business_type/model/business_type_dto')

const businessTypeController = {

    addBusinessType: async (req, res, next) => {
        try {
            const { type } = req.body
            await businessTypeService.addBusinessType(type)
            return res.sendStatus(200)
        } catch (err) {
            return next(err)
        }
    },

    getBusinessTypes: async (req, res, next) => {
        try {
            const businessTypes = await businessTypeService.getBusinessTypes()
            res.status(200).json(businessTypes.length > 0 ? businessTypes.map(businessType => businessTypeDto(businessType)) : [])
        } catch (err) {
            return next(err)
        }
    }

}

module.exports = businessTypeController