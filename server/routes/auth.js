const express = require('express')
const router = express.Router()
const jwtController = require('../API/jwt/jwt_controller')
const passport = require('passport')


router.get('/', jwtController.authenticateAccessToken, (req, res, next) => {
  res.sendStatus(200)
})

// router.get('/facebook', passport.authenticate('facebook'))

router.get('/facebook/openis', (req, res, next) => {
  console.log('hello')
})

router.get('/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}))



router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  console.log('welcome')
  res.sendStatus(200)

})



// router.get('/google', (req, res, next) => console.log(req))


module.exports = router