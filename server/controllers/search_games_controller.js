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

      axios.get(`https://www.giantbomb.com/api/games/?api_key=${process.env.GIANT_BOMB_KEY}&format=json&limit=15&filter=name:${ search }`).then( resp => {
         const data = [];
         resp.data.results.forEach( e => {
               data.push({
                  id: e.id,
                  name: e.name,
                  image: e.image.thumb_url,
                  deck: e.deck,
                  description: e.description,
                  releaseDate: e.original_release_date
               });
         });

         res.status(200).json( data );
      }).catch( err => console.error(err) );
   }
}