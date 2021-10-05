const express = require('express');
const router = express.Router();
const userController = require('../API/user/user_controller')
const jwtController = require('../API/jwt/jwt_controller')
const userValidator = require('../API/user/validation/user_validator')
const { body, validationResult, param} = require('express-validator');


router.get('/', (req, res, next) => {
    userController.getUsers(req, res, next)
});

router.delete('/', (req, res, next) => {
    userController.deleteAll(req, res, next)
})

router.get('/:userId', (req, res, next) => {
    userController.getUserById(req, res)
})

router.delete('/:id',
    param('id').notEmpty().isMongoId(),
    (req, res, next) => {
        const errors = validationResult(req)
        console.log(errors)
        if (!errors.isEmpty()) return res.status(400).json(errors.array())
        userController.deleteUserById(req, res, next)
    })

router.get('/:userId/name', (req, res, next) => {
    userController.getFullNameById(req, res)
})

router.post('/', userValidator.checkEmailPasswordEquality, (req, res, next) => {
    userController.addUser(req, res, next)
})


module.exports = router;
