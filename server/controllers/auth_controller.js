const users = require('../db_temp/users');
let id = 1;

module.exports = {
    signin: ( req, res, next ) => {
        const { session } = req;                    // The session
        const { username, password } = req.body;    // The request body

        // Compares the usernames and passwords for a match
        const user = users.find( e => e.username === username && e.password === password );
        
        // If the user exists, the session object is returned
        if ( user ) {
            session.user.username = user.username;  // The session ooject's username is updated
            res.status(200).send( session.user );   // The updated session user object is returned
        } else {
            res.status(500).send('Unauthorized');   // A message if the user doesn't exist
        }
    },
    register: ( req, res, next ) => {
        const { session } = req;
        const { username, password } = req.body;

        // The new user is added to the list of users
        users.push({ 
            id: id,
            username: username,
            password: password
        });
        id++;

        session.user.username = username;
        res.status(200).send( session.user );
    },
    signout: ( req, res, next ) => {
        req.session.destroy();                     // Ends the session
        res.status(200).send( req.session );       // This line is just for unit testing
    },
    getUser: ( req, res, next ) => {
        res.send(200).send( req.session.user );    // Gets the session user object
    }
}