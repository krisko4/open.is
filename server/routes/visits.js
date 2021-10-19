const express = require('express')
const router = express.Router()
const visitController = require('../API/visit/visit_controller')

router.get('/', (req, res, next) => {
    visitController.getVisitsByPlaceId(req, res, next)
})

router.post('/', (req, res, next) => {
    visitController.addVisit(req, res, next)
})

// router.delete('/', (req, res, next) => {
//     visitController.deleteVisits(req, res, next)
// })


module.exports = router