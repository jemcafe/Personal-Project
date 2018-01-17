// const axios = require('axios');

const users = require('../db_temp/users');
let id = 1;

module.exports = {
    login ( req, res, next ) {
        const db = req.app.get('db');
        const { session } = req;
        const { username, password } = req.body;    // Request body

        session.user = {
            username: username,
            cart: []
        };

        db.find_user( [username, password] ).then( user => {
            if ( username === user[0].username && password === user[0].password) {
                res.status(200).json( session.user );
            } else {
                res.status(401).json( 'Unauthorized' );
            }
        }).catch( err => {
            console.log(err)
            res.status(500).send(err);
        });

        // // Compares the usernames and passwords to find the user
        // const user = users.find( e => e.username === username && e.password === password );
        
        // // If the user exists, the session object is returned
        // if ( user ) {
        //     session.user.username = username;
        //     res.status(200).json( session.user );   // The updated session user object is returned
        // } else {
        //     res.status(401).json( 'Unauthorized' ); // A message if the user doesn't exist
        // }
    },

    register ( req, res, next ) {
        const { session } = req;
        const { username, password } = req.body;

        users.push({ 
            id: id,
            username: username,
            password: password
        });
        id++;

        session.user.username = username;
        res.status(200).json( session.user );
    },

    logout ( req, res, next ) {
        const { session } = req;

        session.destroy();                         // Ends the session
        res.status(200).json( null );           // This line is just for unit testing
    },

    getUser ( req, res, next ) {
        const { session } = req;
        
        if ( session.user.username !== '' ) {
            res.status(200).json( session.user );  // Gets the session user object. Needed for get user's 
        } else {
            res.status(404).json( 'Not Found' );
        }
    }
}