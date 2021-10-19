const express = require('express')
const router = express.Router()
const newsController = require('../API/news/news_controller')
const jwtController = require('../API/jwt/jwt_controller')

router.post('/', jwtController.authenticateAccessToken, (req, res, next) => {
    newsController.addNews(req, res, next)
})

router.get('/', (req, res, next) => {
    newsController.getNews(req, res, next)
}),


// router.delete('/', (req, res, next) => {
//     newsController.deleteNews(req, res, next)
// })

module.exports = router