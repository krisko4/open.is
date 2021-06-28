const express = require('express');
const router = express.Router();

const User = require('../models/user')
const mongoose = require('mongoose')

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find().exec().then((docs => {
      res.json(docs)
    })).catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
});

router.delete('/', (req, res, next) => {
  User.deleteMany().exec().then(() => {
    res.json('All users deleted successfully')
  }).catch((err) => {
    res.json({
      error: err
    })
  })
})

router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId).exec().then(doc => {
    if(doc){
      res.status(200).json(doc)
    }
    else{
      res.status(404).json({
        message: 'User with provided ID not found'
      })
    }
  }).catch(err => {
    console.log(err)
    res.json({
      error: err
    })
  })
})

router.post('/', (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    secondName: req.body.secondName
  })
  user.save().then(result => {
    console.log(result)
    res.status(201).json({
      message: 'Handling POST request to /users',
      createdUser: user
    })
  }).catch(error => {
    console.log(error)
  })

})

module.exports = router;
