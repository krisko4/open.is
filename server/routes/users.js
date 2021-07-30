const express = require('express');
const router = express.Router();
const userController = require('../API/user/user_controller')




router.get('/', function (req, res, next) {
    userController.getUsers(req, res)
});

router.delete('/', (req, res, next) => {
    userController.deleteAllUsers(req, res)
})

router.get('/:userId', (req, res, next) => {
    userController.getUserById(req, res)
})

router.post('/', (req, res) => {
    userController.addUser(req, res)
})


module.exports = router;
