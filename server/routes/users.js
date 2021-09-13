const express = require('express');
const router = express.Router();
const userController = require('../API/user/user_controller')
const jwtController = require('../API/jwt/jwt_controller')



router.get('/', jwtController.authenticateAccessToken, (req, res) => {
    userController.getUsers(req, res)
});

router.delete('/', (req, res, next) => {
    userController.deleteAllUsers(req, res)
})

router.get('/:userId', (req, res, next) => {
    userController.getUserById(req, res)
})

router.get('/:userId/name', (req, res, next) => {
    userController.getFullNameById(req, res)
})

router.post('/', (req, res) => {
    userController.addUser(req, res)
})


module.exports = router;
