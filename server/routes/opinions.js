const express = require('express')
const router = express.Router()
const opinionController = require('../API/opinion/opinion_controller')
router.get('/', (req, res, next) => {
    opinionController.getOpinionsBy(req, res, next)
})

router.post('/', (req, res, next) => {
    opinionController.addNewOpinion(req, res, next)
})

// router.delete('/', (req, res, next) => {
//     opinionController.deleteOpinions(req, res, next)
// })

module.exports = router