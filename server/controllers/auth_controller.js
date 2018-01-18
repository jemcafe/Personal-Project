// const axios = require('axios');

const users = require('../db_temp/users');
let id = 1;

module.exports = {
    login ( req, res, next ) {
        const db = req.app.get('db');
        const { session } = req;
        const { username, password } = req.body;    // Request body

        session.user = {
            id: null,
            username: username
        };

        db.find_user( [username, password] ).then( user => {

            // If the user is found
            if ( user.length ) {
                // The session id value is the user's id
                session.user.id = user[0].id
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

        session.user = {
            id: null,
            username: username
        };

        db.find_user( [username, password] ).then( user => {
            
            // If the user is not found and the username aren't the same
            if ( !user.length && username !== user[0].username ) {

                // The user is created
                db.create_user( [username, password, null, name, image] ).then( newUser => {
                    // The session id value is the new user's id
                    session.user.id = newUser[0].id;
                }).catch( err => console.log(err) );

                // The session object is sent
                res.status(200).json( session.user );
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
        res.status(200).json( null );
    },

    getUser ( req, res, next ) {
        const { session } = req;
        
        if ( session.user.username !== '' ) {
            res.status(200).json( session.user );
        } else {
            res.status(404).json( 'Not Found' );
        }
    }
}