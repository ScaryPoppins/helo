require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const session = require('express-session')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const {registerUser, loginUser, getUser, logOutUser, editProfilePic} = require('./authController');
const {postMessage, getMessages, searchTitle} = require('./userController')

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
// app.get('/auth/session', session);
app.put('/api/auth/editProfilePic', editProfilePic)

// user endpoints
app.post('/api/post/', postMessage)
app.get('/api/messages', getMessages)
app.get('/api/buys/title/:title', searchTitle)



app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));