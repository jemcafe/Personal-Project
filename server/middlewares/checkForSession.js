module.exports = ( req, res, next ) => {
    if ( !req.session.user ) {  // Check if the session object exists
        req.session.user = { 
            username: '',
            cart: []
        };
    }

    next();  // Move on
}