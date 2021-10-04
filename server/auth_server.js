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
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy
const passport = require('passport')


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

passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID_FB,
    clientSecret: process.env.CLIENT_SECRET_FB,
    callbackURL: `${process.env.AUTH_URL}/auth/facebook/openis`
},
    function (request, accessToken, refreshToken, profile, done) {
        console.log(profile)
    }
));

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(err, user))

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID_GOOGLE,
    clientSecret: process.env.CLIENT_SECRET_GOOGLE,
    callbackURL: `${process.env.AUTH_URL}/auth/google/callback`,
    passReqToCallback: true
},
    function (accessToken, refreshToken, profile, done) {
        console.log('hello')
        console.log(profile)
        return done(null, profile)
    }
));

//  passport.serializeUser(function(user, cb) {
//     cb(null, user);
//   });

//   passport.deserializeUser(function(obj, cb) {
//     cb(null, obj);
//   });

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
