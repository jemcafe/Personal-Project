const axios = require('axios');
require('dotenv').config();
let bookId = 0;

module.exports = {
    getProductCategories ( req, res, next ) {
        const db = req.app.get('db');

        db.read_productCategories().then( categories => {
            const creators = {
                id: categories.length+1,
                product_category: 'Creators'
            };
            res.status(200).json( [...categories, creators] );
        }).catch( err => {
            console.log('search productCategories', err);
            res.status(500).send('No Platforms');
        });
    },

    getProductSubcategories ( req, res, next ) {
        const db = req.app.get('db');

        db.read_gamePlatforms().then( gamePlatforms => {
            db.read_bookSubjects().then( bookSubjects => {
                db.read_posterCategories().then( posterCategories => {

                    res.status(200).json( [gamePlatforms, bookSubjects, posterCategories] );

                }).catch( err => console.log(err) );
            }).catch( err => console.log(err) );
        }).catch( err => console.log(err) );
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

            axios.get(`https://www.giantbomb.com/api/games/?api_key=${process.env.GIANT_BOMB_KEY}&format=json&filter=${ gameSearch }&limit=27&offest=0`)
            .then( games => {
                if ( games.data.results.length ) {
                    const data = games.data.results.map( e => ({
                        id: e.id,
                        name: e.name,
                        description: e.deck,
                        releasedate: e.original_release_date,
                        price: Math.floor( Math.random() * (59 - 10) + 10 ) + 0.99,
                        platform: platform,
                        product_category_id: 1,
                        product_category: 'Games',
                        image_url: e.image.thumb_url ? e.image.thumb_url : '',
                        rating: (Math.random() * (10 - 4) + 4).toFixed(1)
                    }));
                    res.status(200).json( data );
                } else {
                    res.status(200).json('No results');
                }
            }).catch(err => console.error(err));

        }).catch( err => {
            console.log(err);
            res.status(500).send(err);
        });
    },


    getVolumes ( req, res, next ) {
        const { search, subject } = req.query;
        let sub = subject === 'All' ? '' : subject;  // Google Books doesn't have an 'All' category, so it must be empty to search everything

        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${ search }+subject:${ sub }&maxResults=27&startIndex=0`)
        .then( books => {
            if ( books.data.items.length ) {
                const data = books.data.items.map( e => {
                    bookId++;
                    return {
                        id: e.id,
                        name: e.volumeInfo.title,
                        description: e.volumeInfo.description,
                        published_date: e.volumeInfo.publishedDate,
                        price: Math.floor( Math.random() * (30 - 10) + 10 ) + 0.99,
                        subject: subject,
                        product_category_id: 2,
                        product_category: 'Books',
                        image_url: e.volumeInfo.imageLinks ? e.volumeInfo.imageLinks.thumbnail : ''
                    }
                });
                res.status(200).json( data );
            }
        }).catch(err => console.error(err));
    },


    getPosters ( req, res, next ) {
        const db = req.app.set('db');
        const { search, category } = req.query;

        db.read_posters().then( posters => {

            const filteredPosters = posters
                .filter( poster => poster.name.toLowerCase().includes( search.toLowerCase() ) ? poster : false )
                .filter( poster => category === 'All' || category === '' ? poster : category === poster.category ? poster : false);
            const allPosters = !search && !category ? posters : filteredPosters;
            
            res.status(200).json( allPosters );

        }).catch( err => {
            console.log('search getPosters', err);
            res.status(500).send('No posters');
        });
    },


    getUsers ( req, res ) {
        const db = req.app.get('db');
        const { search } = req.query;

        db.read_users().then( users => {

            const filteredUsers = users
                .filter( user => user.username.toLowerCase().includes( search.toLowerCase() ) ? user : false )
                .map( user => ({
                    id: user.id,
                    username: user.username,
                    name: user.name,
                    avatar: user.avatar,
                    header_bkgd_img: user.header_bkgd_img,
                    profile_url: user.profile_url
                }));
            res.status(200).json( filteredUsers );

        }).catch( err => {
            console.log('search getUsers', err); 
            res.status(500).send(err); 
        });
    },


    getProduct () {
        const db = req.app.get('db');
        const { category, id, name } = req.query;

        if ( category === 'games' ) {

            axios.get(`https://www.giantbomb.com/api/games/?api_key=${process.env.GIANT_BOMB_KEY}&format=json&filter=name:${ name }&limit=1`)
            .then( games => {
                if ( games.length ) {
                    // res.status(200).json({
                    //     id: games[0].id,
                    //     name: games[0].name,
                    //     description: games[0].deck,
                    //     releasedate: games[0].original_release_date,
                    //     price: Math.floor( Math.random() * (59 - 10) + 10 ) + 0.99,
                    //     platform: platform,
                    //     product_category_id: 1,
                    //     product_category: 'Games',
                    //     image_url: games[0].image.thumb_url ? games[0].image.thumb_url : '',
                    // });
                    res.status(200).json( games.data );
                } else {
                    res.status(404).json('Product not found');
                }
            }).catch( err => {
                console.error(err);
                res.status(200).json(err);
            });

        } else if ( category === 'books' ) {

            // axios.get(`https://www.googleapis.com/books/v1/volumes/${ volumeId }`)
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${ name }&maxResults=1`)
            .then( books => {
                if ( books.data.items.length ) {
                    // const books = resp.data.items;
                    // res.status(200).json({
                    //     id: bookId,
                    //     name: e.volumeInfo.title,
                    //     description: e.volumeInfo.description,
                    //     publisheddate: e.volumeInfo.publishedDate,
                    //     price: Math.floor( Math.random() * (30 - 10) + 10 ) + 0.99,
                    //     subject: subject,
                    //     product_category_id: 2,
                    //     product_category: 'Books',
                    //     image_url: e.volumeInfo.imageLinks ? e.volumeInfo.imageLinks.thumbnail : ''
                    // });
                    res.status(200).json( resp.data );
                } else {
                    res.status(404).json('Product not found');
                }
            }).catch(err => console.error(err));

        } else if ( category === 'posters' ) {

            db.read_posters().then( posters => {

                const filteredPosters = posters
                    .filter( poster => poster.name.toLowerCase().includes( search.toLowerCase() ) ? poster : false )
                const allPosters = !search && !category ? posters : filteredPosters;
                res.status(200).json( allPosters );
    
            }).catch( err => {
                console.log(err);
                res.status(500).send('No posters');
            });
            
        }
    },


    // This is for getting the data to my database
    // getGamesForDatabase ( req, res, next ) {
    //     axios.get(`https://www.giantbomb.com/api/games/?api_key=${process.env.GIANT_BOMB_KEY}&format=json&limit=50&offest=0&filter=name:${ 'tekken' }`)
    //     .then( resp => {
    //         res.status(200).json( resp.data.results );
    //     }).catch( err => console.error(err) );
    // },
    // getBooksForDatabase ( req, res, next ) {
    //     axios.get(`https://www.googleapis.com/books/v1/volumes?q=ghost&maxResults=50&startIndex=0`)
    //     .then( resp => {
    //         const volumes = resp.data.items.map( e => e.volumeInfo );
    //         res.status(200).json( volumes );
    //     }).catch( err => console.error(err) );
    // }
}