const express = require('express')
const router = express.Router()
const newsController = require('../API/news/news_controller')
const { query, body, param, validationResult, cookie } = require('express-validator');
const validateRequest = require('../request_validators/express_validator')
const jwtController = require('../API/jwt/jwt_controller')

router.post('/', 
jwtController.authenticateAccessToken, 
body('locationId').isMongoId(),
body('content').notEmpty().isString({max: 1000}),
body('title').notEmpty().isString({max: 150}),
validateRequest,
(req, res, next) => {
    newsController.addNews(req, res, next)
})

router.get('/', (req, res, next) => {
    newsController.getNews(req, res, next)
}),


// router.delete('/', (req, res, next) => {
//     newsController.deleteNews(req, res, next)
// })

module.exports = router