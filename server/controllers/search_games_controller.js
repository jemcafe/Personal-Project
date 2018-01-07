require('dotenv').config();
const axios = require('axios');

module.exports = {
   getGenres ( req, res, next ) {
      axios.get(`https://www.giantbomb.com/api/genres/?api_key=${process.env.GIANT_BOMB_KEY}&format=json`).then( resp => {
         const gameGenres = resp.data.results.map( e => e.name ).sort();
         const genres = ['All', ...gameGenres];
         res.json( genres );
      }).catch( err => console.error(err) );
   },
}