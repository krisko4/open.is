const express = require('express')
const app = express()
app.listen(3000)

const usersRoute = require('./routes/users')

app.use('/users', usersRoute)