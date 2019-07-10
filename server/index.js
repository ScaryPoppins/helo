require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const session = require('express-session')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const {registerUser, loginUser, getUser, logOutUser} = require('./authController');
const {postMessage, getMessages} = require('./userController')

app.use(express.json());



// massive DB connectionz
massive(CONNECTION_STRING).then(db => {
    app.set("db", db);
    console.log(`Database is Connected :)`);
  });



//yummy session cookies
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
  }))



//auth endpoints
app.post('/auth/register', registerUser);
app.post('/auth/login', loginUser);
app.post('/auth/user', logOutUser);
app.get('/auth/user', getUser);
app.get('/auth/session', session);

// user endpoints
app.post('/api/post/', postMessage)
app.get('/api/messages', getMessages)



app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));