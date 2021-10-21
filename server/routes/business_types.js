const express = require('express')
const router = express.Router()
const businessTypeController = require('../API/business_type/business_type_controller')

// router.post('/', (req, res, next) => businessTypeController.addBusinessType(req, res, next))

router.get('/', (req, res, next) => businessTypeController.getBusinessTypes(req, res, next))

module.exports = router