require('dotenv').config();
const axios = require('axios');
const gamePlatforms = require('../db_temp/gamePlatforms');

module.exports = {
   getPlatforms ( req, res, next ) {
      // axios.get(`https://www.giantbomb.com/api/platforms/?api_key=${process.env.GIANT_BOMB_KEY}&format=json&offset=100`).then( resp => {
      //    const platforms = resp.data.results.map( e => [ e.id, e.name ] );
      //    res.status(200).json( platforms );
      // }).catch( err => console.error(err) );
      const platformNames = gamePlatforms.map( e => e.platform );
      const platforms = ['All', ...platformNames ];
      res.status(200).json( platforms );
   },

   getGames ( req, res, next ) {
      const { search, platform } = req.query;

      // Giant Bomb uses ids instead of names to filter by platforms. Got the id from the list I made.
      const plat = gamePlatforms.find( e => e.platform === platform );
      const platformId = platform === 'All' ? '' : `${ plat.id }`;

      axios.get(`https://www.giantbomb.com/api/games/?api_key=${process.env.GIANT_BOMB_KEY}&format=json&filter=name:${ search },platforms:${ platformId }&limit=27&offest=0`).then( resp => {
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

         res.status(200).json( data );
      }).catch( err => console.error(err) );
   }
}