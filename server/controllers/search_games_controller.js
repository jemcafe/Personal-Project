require('dotenv').config();
const axios = require('axios');
const gamePlatforms = require('../db_temp/gamePlatforms');

module.exports = {
   getPlatforms ( req, res, next ) {
      // axios.get(`https://www.giantbomb.com/api/platforms/?api_key=${process.env.GIANT_BOMB_KEY}&format=json`).then( resp => {
      //    const platfroms = resp.data.results.map( (e, i) => [ e.id, e.name ] );
      //    const plat = ['All', ...platforms];
      //    res.status(200).json( plat );
      // }).catch( err => console.error(err) );
      const platformNames = gamePlatforms.map( e => e.platform );
      const platforms = ['All', ...platformNames ];
      res.status(200).json( platorms );
   },

   getGames ( req, res, next ) {
      const { search, platform } = req.query;

      axios.get(`https://www.giantbomb.com/api/games/?api_key=${process.env.GIANT_BOMB_KEY}&format=json&limit=15&filter=name:${ search }`).then( resp => {
         const data = [];
         resp.data.results.forEach( e => {
               data.push({
                  id: e.id,
                  name: e.name,
                  image: e.image.thumb_url,
                  description: e.deck,
                  releaseDate: e.original_release_date
               });
         });

         res.status(200).json( resp.data.results );
      }).catch( err => console.error(err) );
   }
}