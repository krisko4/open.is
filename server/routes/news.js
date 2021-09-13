const express = require('express')
const router = express.Router()
const newsController = require('../API/news/news_controller')
const jwtController = require('../API/jwt/jwt_controller')

router.post('/', jwtController.authenticateAccessToken, (req, res) => {
    newsController.addNews(req, res)
})

router.get('/', (req, res) => {
    newsController.getNews(req, res)
}),


router.delete('/', (req, res) => {
    newsController.deleteNews(req, res)
})

module.exports = router