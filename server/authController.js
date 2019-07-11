const bcrypt = require('bcrypt');

module.exports = {

    registerUser: (req, res) => {
        console.log(req.body)
        const {username, password, profile_pic} = req.body
        const db = req.app.get('db')

        //does user already exist?
        db.find_user(username)
        .then(cucumber_username => {
            if(cucumber_username.length > 0) {
                res.status(403).json({error: 'email already registered'})
            } else {
                bcrypt.hash(password, 10).then(newPassword => {
                    //create new user
                    db.add_user(username, newPassword, profile_pic).then(() => {
                        res.status(200).json(username)
                    })
                })
            }
        })
    },


    loginUser: (req,res) => {
        const {username, password} = req.body
        console.log(req.body)
        const db = req.app.get('db')

        db.find_user(username)
        .then(user => {
            if(!user.length) {
                res.status(404).json({error: 'USER_DOES_NOT_EXIST'})
            } else {
                bcrypt.compare(password, user[0].password).then(doesMatch => {
                    if(!doesMatch) {
                        res.status(403).json({error: 'USERNAME_OR_PASSWORD_INCORRECT'})
                    } else {
                        req.session.user = {
                            username: user[0].username,
                            id: user[0].users_id,
                            profile: user[0].profile_pic,
                            // user: user[0],
                            // users: user,
 
                        }
                        console.log("this is session after user",req.session.user)
                        res.status(200).json(req.session.user)
                    }
                })
            }
        })
    },

    getUser: (req, res) => {
        if(req.session.user) {
            console.log(req.session.user)
            res.json(req.session.user)
        } else {
            res.status(401).json({error: 'Please log in.'})
        }
    },

    logOutUser: (req, res) => {
        req.session.destroy()
        res.status(200).send(req.session)
    },

    session: async (req,res) => {
        const db = req.app.get('db'),
        { username } = req.session.user;
    
        const foundUser = await db.find_user([username]);
        const user = foundUser[0];
        if (req.session) {
            req.session.user = {                             
                username: user.username,
                id: user.id,
                profile: user.profile_pic, };
        
            return res.send(req.session.user);
        }
    }








}

