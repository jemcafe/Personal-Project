const bcrypt = require('bcrypt');
const saltRounds = 8;

module.exports = {
    login ( req, res, next ) {
        const db = req.app.get('db');
        const { session } = req;
        const { username, password } = req.body;

        db.find_user( [username] ).then( user => {

            if ( user.length ) {    // If the user is found

                bcrypt.compare( password, user[0].password ).then( passwordMatch => {
                    if ( passwordMatch ) {
                        session.user = {
                            id: user[0].id,
                            username: user[0].username,
                            imageurl: user[0].imageurl,
                            headerbkgdimgurl: user[0].headerbkgdimgurl
                        };
                        res.status(200).json( session.user );    // The session object is sent
                    } else {
                        res.status(403).json('Wrong password');
                    }
                });

            } else {
                res.status(404).json('User not found');
            }

        }).catch( err => {
            console.log(err)
            res.status(500).send(err);
        });
    },

    register ( req, res, next ) {
        const db = req.app.get('db');
        const { session } = req;
        const { username, password, name, imageurl, headerBkgdImage } = req.body;

        db.find_user( [username, password] ).then( user => {
            
            // If the user is not found and the given username is not the same as another user
            if ( !user.length ) {
                // The user is created
                bcrypt.hash( password, saltRounds ).then( hashedPassword => {
                    db.create_user( [username, hashedPassword, null, name, imageurl, headerBkgdImage, null] ).then( newUser => {
                        
                        session.user = {
                            id: newUser[0].id,
                            username: newUser[0].username,
                            imageurl: !newUser[0].imageurl ? 'http://busybridgeng.com/wp-content/uploads/2017/05/generic-avatar.png' : newUser[0].imageurl.slice(0,8) === 'https://' ? newUser[0].imageurl : 'http://busybridgeng.com/wp-content/uploads/2017/05/generic-avatar.png',
                            headerbkgdimgurl: newUser[0].headerbkgdimgurl
                        };
                        res.status(200).json( session.user );

                    }).catch(err => console.log(err));
                });
                
            } else {
                res.status(500).send('That user aleady exists');
            }

        }).catch( err => {
            console.log(err)
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