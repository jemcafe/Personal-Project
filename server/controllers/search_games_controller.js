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
      const { search } = req.query;

      if ( search === '' ) {
         axios.get(`https://www.giantbomb.com/api/games/?api_key=${process.env.GIANT_BOMB_KEY}&format=json&field_list=name&limit=10`).then( resp => {
            const names = resp.data.results.map( e => e.name );
            res.status(200).json( names );
         }).catch( err => console.error(err) );
      } else {
         axios.get(`https://www.giantbomb.com/api/search/?api_key=${process.env.GIANT_BOMB_KEY}&format=json&query=${ search }&field_list=name&limit=10`).then( resp => {
            const names = resp.data.results.map( e => e.name );
            res.status(200).json( names );
         }).catch( err => console.error(err) );
      }
   }
}