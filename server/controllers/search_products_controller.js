const axios = require('axios');
require('dotenv').config();

const bookSubjects = require('../db_temp/bookSubjects');
const gamePlatforms = require('../db_temp/gamePlatforms');
const posterCategories = require('../db_temp/posterCategories');
const posters = require('../db_temp/posters');

module.exports = {
    getPlatforms ( req, res, next ) {
        const db = req.app.get('db');

        db.read_gamePlatforms().then( platform => {
            const platforms = platform.map( e => e.platform);
            res.status(200).json( platforms );
        }).catch( () => {
            res.status(500).send('No Platforms');
        });
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
    },

    getSubjects ( req, res, next ) {
        const db = req.app.get('db');

        db.read_bookSubjects().then( subject => {
            const subjects = subject.map( e => e.subject );
            res.status(200).json( subjects );
        }).catch( () => { 
            res.status(500).send('No Subjects');
        });
    },
    getVolumes ( req, res, next ) {
        const { search, subject } = req.query;
        
        let sub = subject === 'All' ? '' : subject;  // Google Books doesn't have an 'All' category, so it must be empty to search everything

        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${ search }+subject:${ sub }&maxResults=27&startIndex=0`).then( resp => {
            const data = [];
            resp.data.items.forEach( e => {
                    data.push({
                    id: e.id,
                    name: e.volumeInfo.title,
                    image: e.volumeInfo.imageLinks.thumbnail || null,
                    description: e.volumeInfo.description,
                    publishedDate: e.volumeInfo.publishedDate
                    });
            });
            
            res.status(200).json( data );
        }).catch( err => console.error(err) );
    },

    getCategories ( req, res, next ) {
        const db = req.app.get('db');

        db.read_posterCategories().then( category => {
            const categories = category.map( e => e.category );
            res.status(200).send( categories );
        }).catch( () => { 
            res.status(500).send('No Categories');
        });
    },
    getPosters ( req, res, next ) {
        const { category } = req.query;

        let data = posters;
        // Can be searched by category but not by search input yet
        data = data.filter( e => e.category === category );

        res.status(200).send( data );
    }
}