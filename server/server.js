const cookie = require('cookie')
const cookieParser = require('cookie-parser')
const express = require('express');
require('dotenv').config()
const path = require('path');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const placesRouter = require('./routes/places')
const registrationRouter = require('./routes/registration')
const confirmationTokensRouter = require('./routes/confirmation_tokens')
const confirmationRouter = require('./routes/confirmation')
const loginRouter = require('./routes/login')
const mongoose = require('mongoose')
const uri = require('./config/keys_dev')
const cors = require('cors')
const server = express();
server.use(cookieParser())
const corsOptions = {
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200,
    credentials: true
}
server.use(cors(corsOptions));

const port = process.env.PORT || 8080

server.use(express.json());
server.use(express.static(path.join(__dirname, 'public')));

server.use('/', indexRouter);
server.use('/users', usersRouter);
server.use('/places', placesRouter);
server.use('/registration', registrationRouter)
server.use('/confirmation_tokens', confirmationTokensRouter)
server.use('/confirmation', confirmationRouter)



mongoose.connect(uri.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Successfully connected to mongoDB!')
    server.listen(port, () => {
        console.log('Server running on port %d', port)
    })
})


module.exports = server;
