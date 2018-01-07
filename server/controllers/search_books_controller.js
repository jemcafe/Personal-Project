// require('dotenv').config();
const bookSubjects = require('../db_temp/bookSubjects');
const axios = require('axios');

module.exports = {
   getSubjects ( req, res, next ) {
      const subjects = ['All', ...bookSubjects];
      res.status(200).json( subjects );
   },
   
   getVolumes ( req, res, next ) {
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=r&maxResults=10&startIndex=0`).then( resp => {
         const volumeInfo = resp.data.items.map( (e) => e.volumeInfo );
         res.status(200).json( volumeInfo );
      }).catch( err => console.error(err) );
   }
}