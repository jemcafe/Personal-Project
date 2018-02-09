const axios = require('axios');
require('dotenv').config();
let bookId = 1;

module.exports = {
    getProductCategories ( req, res, next ) {
        const db = req.app.get('db');

        db.read_productCategories().then( category => {

            const categories = category.map( e => e.productcategory );
            res.status(200).json( categories );

        }).catch( err => {
            console.log(err);
            res.status(500).send('No Platforms');
        });
    },

    getProductSubcategories ( req, res, next ) {
        const db = req.app.get('db');

        db.read_gamePlatforms().then( platform => {
            db.read_bookSubjects().then( subject => {
                db.read_posterCategories().then( pCategory => {

                    const platforms = platform.map( e => e.platform );
                    const subjects = subject.map( e => e.subject );
                    const pCategories = pCategory.map( e => e.category );

                    const subCategories = [['All', ...platforms], ['All', ...subjects], ['All', ...pCategories]];
                    res.status(200).json( subCategories );

                }).catch( err => {
                    console.log(err);
                    res.status(500).send('No poster categories');
                });
            }).catch( err => {
                console.log(err);
                res.status(500).send('No book subjects');
            });
        }).catch( err => {
            console.log(err);
            res.status(500).send('No game platforms');
        });
    },
    
    getGames ( req, res, next ) {
        const db = req.app.set('db');
        const { search, platform } = req.query;

        let plat = platform === 'All' ? '' : platform;

        db.read_gamePlatforms().then( platforms => {

            // Giant Bomb uses numeric ids instead of names to filter data by platform. I found the platform ids I wanted and put them my Platforms table.
            let platformGbid = platforms.filter( e => e.platform === plat ).map( e => e.gbid )[0];
            // This checks the request values and updates the url with the proper Giant Bomb search fields 
            let gameSearch = search && plat ? `name:${ search },platforms:${ platformGbid }` :
                                       plat ? `platforms:${ platformGbid }` :
                                     search ? `name:${ search }` : '';

            axios.get(`https://www.giantbomb.com/api/games/?api_key=${process.env.GIANT_BOMB_KEY}&format=json&filter=${ gameSearch }&limit=27&offest=0`).then( resp => {
                const data = [];
                resp.data.results.forEach( e => {
                    data.push({
                        id: e.id,
                        name: e.name,
                        description: e.deck,
                        releasedate: e.original_release_date,
                        price: Math.floor( Math.random() * (59 - 10) + 10 ) + 0.99,
                        platform: platform,
                        productcategoryid: 1,
                        productcategory: 'Games',
                        imageurl: e.image.thumb_url ? e.image.thumb_url : '',
                    });
                });
                res.status(200).json( data );
            }).catch( err => console.error(err) );

        }).catch( err => {
            console.log(err);
            res.status(500).send('No Platforms');
        });
    },
    
    getVolumes ( req, res, next ) {
        const { search, subject } = req.query;
        
        let sub = subject === 'All' ? '' : subject;  // Google Books doesn't have an 'All' category, so it must be empty to search everything

        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${ search }+subject:${ sub }&maxResults=27&startIndex=0`).then( resp => {
            const data = [];
            resp.data.items.forEach( e => {
                    data.push({
                    id: bookId,
                    name: e.volumeInfo.title,
                    description: e.volumeInfo.description,
                    publisheddate: e.volumeInfo.publishedDate,
                    price: Math.floor( Math.random() * (30 - 10) + 10 ) + 0.99,
                    subject: subject,
                    productcategoryid: 2,
                    productcategory: 'Books',
                    imageurl: e.volumeInfo.imageLinks.thumbnail ? e.volumeInfo.imageLinks.thumbnail : ''
                });
                bookId++;
            });
            res.status(200).json( data );
        }).catch( err => console.error(err) );
    },
    getBookRatings( req, res, next ) {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=Harry%20Potter&maxResults=10&startIndex=0`).then( resp => {
            const averageRatings = resp.data.items.map( e => e.volumeInfo );
            res.status(200).json( averageRatings );
        }).catch( err => console.error(err) );
    },

    getPosters ( req, res, next ) {
        const db = req.app.set('db');
        const { search, category } = req.query;

        db.read_posters().then( posters => {

            const filteredPosters = posters.filter( poster => poster.name.toLowerCase().includes( search.toLowerCase() ) ? poster : false )
                                           .filter( poster => category === 'All' || category === '' ? poster : category === poster.category ? poster : false);
            const allPosters = !category ? posters : filteredPosters;

            res.status(200).json( allPosters );

        }).catch( err => {
            console.log(err);
            res.status(500).send('No posters');
        });
    },




    // This is for getting the data to my database
    getGamesForDatabase ( req, res, next ) {
        axios.get(`https://www.giantbomb.com/api/games/?api_key=${process.env.GIANT_BOMB_KEY}&format=json&limit=50&offest=0&filter=name:${ 'tekken' }`).then( resp => {
            res.status(200).json( resp.data.results );
        }).catch( err => console.error(err) );
    },
    getBooksForDatabase ( req, res, next ) {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=ghost&maxResults=50&startIndex=0`).then( resp => {
            const volumes = resp.data.items.map( e => e.volumeInfo );
            res.status(200).json( volumes );
        }).catch( err => console.error(err) );
    }
}