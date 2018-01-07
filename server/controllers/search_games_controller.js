require('dotenv').config();
const axios = require('axios');

module.exports = {
   getGenres ( req, res, next ) {
      axios.get(`https://www.giantbomb.com/api/genres/?api_key=${process.env.GIANT_BOMB_KEY}&format=json`).then( resp => {
         const genreNames = resp.data.results.map( e => e.name );
         res.json( genreNames );
      }).catch( err => console.error(err) );
   },
}