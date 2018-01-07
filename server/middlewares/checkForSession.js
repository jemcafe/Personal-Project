module.exports = ( req, res, next ) => {
   if ( !req.session.user ) {  // Check if the session has a user object
      req.session.user = { username: '', cart: [] };
   }

   next();  // Move on to the next middleware
}