require('dotenv').config();
const axios = require('axios');

module.exports = {
   getGenres ( req, res, next ) {
      axios.get(`https://www.giantbomb.com/api/genres/?api_key=${process.env.GIANT_BOMB_KEY}&format=json`).then( resp => {
         const gameGenres = resp.data.results.map( e => e.name ).sort();
         const genres = ['All', ...gameGenres];
         res.status(200).json( genres );
      }).catch( err => console.error(err) );
   },

   getGames ( req, res, next ) {
      axios.get(`https://www.giantbomb.com/api/games/?api_key=${process.env.GIANT_BOMB_KEY}&format=json&limit=10&offset=0`).then( resp => {
         const games = resp.data.results.map( e => e.name );
         res.status(200).json( games );
      }).catch( err => console.error(err) );
   }
}