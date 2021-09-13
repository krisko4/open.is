const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose')
const uri = require('./config/keys_dev')
const loginRouter = require('./routes/login')
const logoutRouter = require('./routes/logout')
const tokensRouter = require('./routes/tokens')
const authRouter = require('./routes/auth')
const cors = require('cors')
const server = express();
const cookieParser = require('cookie-parser')
server.use(cookieParser())


const corsOptions = {
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200,
    credentials: true
}
server.use(cors(corsOptions));

const port = process.env.AUTH_SERVER_PORT
server.use(express.json());
server.use('/login', loginRouter)
server.use('/tokens', tokensRouter)
server.use('/logout', logoutRouter)
server.use('/auth', authRouter)

mongoose.connect(uri.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Successfully connected to mongoDB!')
    server.listen(port, () => {
        console.log('Server running on port %d', port)
    })
}).catch(err => console.log(err))


module.exports = server;
