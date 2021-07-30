const express = require('express');
const registrationController = require("../API/registration/registration_controller");
const router = express.Router();


router.post('/', (req, res) => {
    registrationController.registerUser(req, res)
})

module.exports = router