// require('dotenv').config();
const axios = require('axios');
const bookSubjects = require('../db_temp/bookSubjects');

module.exports = {
   getSubjects ( req, res, next ) {
      const subjects = ['All', ...bookSubjects];
      res.status(200).json( subjects );
   },
   
   getVolumes ( req, res, next ) {
      const { search, subject } = req.query;
      
      let sub = subject === 'All' ? '' : subject;  // Google Books doesn't have an 'All' category, so it must be empty to search everything

      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${ search }+subject:${ sub }&maxResults=18&startIndex=0`).then( resp => {
         const data = [];
         resp.data.items.forEach( e => {
               data.push({
                  id: e.id,
                  name: e.volumeInfo.title,
                  image: e.volumeInfo.imageLinks.thumbnail,
                  description: e.volumeInfo.description,
                  publishedDate: e.volumeInfo.publishedDate
               });
         });
         
         res.status(200).json( data );
      }).catch( err => console.error(err) );
   }
}