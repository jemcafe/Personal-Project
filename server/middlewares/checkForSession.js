module.exports = ( req, res, next ) => {
   if ( !req.session.user) {  // Check if the session has a user
      req.session.user = { 
         username: '',
         cart: []
      }
   }

   next();  // If it does, move on to the next middleware
}