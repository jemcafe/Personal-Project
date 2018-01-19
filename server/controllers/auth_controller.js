// const axios = require('axios');

const users = require('../db_temp/users');
let id = 1;

module.exports = {
    login ( req, res, next ) {
        const db = req.app.get('db');
        const { session } = req;
        const { username, password } = req.body;    // Request body

        db.find_user( [username, password] ).then( user => {

            // The session id value is the user's id
            session.user = {
                id: user[0].id,
                username: user[0].username,
                imageurl: !user[0].imageurl || user[0].imageurl.slice(0,8) === 'https://' ? user[0].imageurl : ''
            };

            // If the user is found
            if ( user.length ) {
                // The session object is sent
                res.status(200).json( session.user );
            } else {
                res.status(401).json( 'Unauthorized' );
            }

        }).catch( err => {
            console.log(err)
            res.status(500).send(err);
        });
    },

    register ( req, res, next ) {
        const db = req.app.get('db');
        const { session } = req;
        const { username, password, name, image } = req.body;

        db.find_user( [username, password] ).then( user => {
            
            // If the user is not found and the username aren't the same
            if ( !user.length ) {
                // The user is created
                db.create_user( [username, password, null, name, image] ).then( newUser => {
                    
                    session.user = {
                        id: newUser[0].id,
                        username: newUser[0].username,
                        image: newUser[0].imageurl.slice(0,8) === 'https://' ? newUser[0].imageurl : ''
                    };

                    res.status(200).json( session.user );

                }).catch( err => console.log(err) );
                
            } else {
                res.status(500).send('That user aleady exists');
            }

        }).catch( err => {
            console.log(err)
            res.status(500).send(err);
        });
    },

    logout ( req, res, next ) {
        const { session } = req;

        session.destroy();
        res.status(200).json( {} );
    },

    getUser ( req, res, next ) {
        const { session } = req;
        
        res.status(200).json( session.user );
    }
}