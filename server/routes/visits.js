const express = require('express')
const router = express.Router()
const visitController = require('../API/visit/visit_controller')
const jwtController = require('../API/jwt/jwt_controller')

router.get('/',
    jwtController.authenticateAccessToken,
    (req, res, next) => {
        visitController.getVisits(req, res, next)
    })

router.post('/',
    jwtController.authenticateAccessToken,
    (req, res, next) => {
        visitController.addVisit(req, res, next)
    })

// router.delete('/', (req, res, next) => {
//     visitController.deleteVisits(req, res, next)
// })


module.exports = router