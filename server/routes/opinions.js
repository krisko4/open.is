const express = require('express')
const router = express.Router()
const opinionController = require('../API/opinion/opinion_controller')
router.get('/', (req, res) => {
    opinionController.getOpinionsBy(req, res)
})

router.post('/', (req, res) => {
    opinionController.addNewOpinion(req, res)
})

router.delete('/', (req, res) => {
    opinionController.deleteOpinions(req, res)
})

module.exports = router