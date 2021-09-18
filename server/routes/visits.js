const express = require('express')
const router = express.Router()
const visitController = require('../API/visit/visit_controller')

router.get('/', (req, res) => {
    visitController.getVisitsByPlaceId(req, res)
})

router.post('/', (req, res) => {
    visitController.addVisit(req, res)
})

router.delete('/', (req, res) => {
    visitController.deleteVisits(req, res)
})


module.exports = router