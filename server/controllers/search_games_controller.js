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

      // Find the platform from the list of platforms then get the id to filter the search by platform (Giant Bomb uses ids instead of names)
      const plat = gamePlatforms.find( e => e.platform === platform );
      const platformId = plat.id;
      const platformFilter = platform === '' ? '' : `&filter=platforms:${ plat.id }`;

      axios.get(`https://www.giantbomb.com/api/games/?api_key=${process.env.GIANT_BOMB_KEY}&format=json${ platformFilter }&limit=15&offest=0`).then( resp => {
      //    const data = [];
      //    resp.data.results.forEach( e => {
      //       data.push({
      //       id: e.id,
      //       name: e.name,
      //       image: e.image.thumb_url,
      //       description: e.deck,
      //       releaseDate: e.original_release_date
      //       });
      //    });

         res.status(200).json( resp.data.results );
      }).catch( err => console.error(err) );
   }
}