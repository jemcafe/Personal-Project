const bcrypt = require('bcrypt');
const saltRounds = 8;

module.exports = {
    login ( req, res, next ) {
        const db = req.app.get('db');
        const { session } = req;
        const { username, password } = req.body;

        db.find_user( [username] ).then( user => {

            if ( !user.length ) {
                // The user is not found
                res.status(404).json('User not found');
            } else {

                // The user is found
                bcrypt.compare( password, user[0].password )
                .then( passwordMatch => {
                    if ( passwordMatch ) {
                        session.user = {
                            id: user[0].id,
                            username: user[0].username,
                            avatar: user[0].avatar,
                            header_bkgd_img: user[0].header_bkgd_img
                        };
                        res.status(200).json( session.user );    // The session object is sent
                    } else {
                        res.status(403).json('Wrong password');
                    }
                });

            }

        }).catch( err => {
            console.log('login', err)
            res.status(500).send(err);
        });
    },

    register ( req, res, next ) {
        const db = req.app.get('db');
        const { session } = req;
        const { username, password, email, name, avatar } = req.body;
        const auth_id = null,
              header_bkgd_img = null,
              profile_url =  null;
              
        // Checks the protocol. If the rest of the url does not point to a actual source, the default image is used.
        const avatarCheck = !avatar 
                            ? 'http://busybridgeng.com/wp-content/uploads/2017/05/generic-avatar.png' 
                            : avatar.slice(0,8) === 'https://' || avatar.slice(0,7) === 'http://'
                            ? avatar 
                            : 'http://busybridgeng.com/wp-content/uploads/2017/05/generic-avatar.png'

        // This regex checks if the email format. It returns a boolean value.
        // Letters, numbers, underscores, hyphens, and periods are allowed before the '@' and between the '@' and '.' with no limits on the string length
        // Only letters are allowed after the '.' and string length must be between 1 and 5
        // The '$' signals the end of the string.
        const emailReg = /^([A-Za-z0-9_\-\.]){1,}\@([A-Za-z0-9_\-\.]){1,}\.([A-Za-z]){2,4}$/;
        const emailIsValid = emailReg.test( email );

        db.find_user( [username] ).then( user => {
            
            if ( !username.length ) {        // username was not submitted
                res.status(412).send('username');
            } else if ( user.length ) {      // the given username is found ( taken )
                res.status(401).send('Username unavailable');
            } else if ( !password.length ) { // password was not submitted
                res.status(412).send('password');
            } else if ( !emailIsValid ) {    // the email is invalid
                res.status(406).send('Invalid email');
            } else if ( !name.length ) {     // name was not submitted
                res.status(412).send('name');
            } else {

                // The user is created
                bcrypt.hash( password, saltRounds ).then( hashedPassword => {
                    db.create_user( [username, hashedPassword, auth_id, email, name, avatarCheck, header_bkgd_img, profile_url] )
                    .then( newUser => {
                        
                        session.user = {
                            id: newUser[0].id,
                            username: newUser[0].username,
                            avatar: newUser[0].avatar,
                            header_bkgd_img: newUser[0].header_bkgd_img
                        };
                        res.status(200).json( session.user );

                    }).catch(err => console.log(err));
                });
            
            }

        }).catch( err => {
            console.log('register', err)
            res.status(500).send(err);
        });
    },

    logout ( req, res, next ) {
        req.session.destroy();
        res.status(200).json( {} );
    },

    getUser ( req, res, next ) {
        res.status(200).json( req.session.user );
    }
}