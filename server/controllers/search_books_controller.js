require('dotenv').config();
const bookSubjects = require('../db_temp/bookSubjects');
const axios = require('axios');

module.exports = {
   getSubjects ( req, res, next ) {
      res.json( bookSubjects );
   },
   getVolumes ( req, res, next ) {
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=r&maxResults=10&startIndex=0`).then( resp => {
         const volumeInfo = resp.data.items.map( (e) => e.volumeInfo );
         res.json( volumeInfo );
      }).catch( err => console.error(err) );
   }
}