const axios = require('axios');
require('dotenv').config();

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
                    res.status(200).send('No results');
                }
            }).catch(err => {
                console.error(err);
                res.status(500).send('GiantBomb error');
            });

        }).catch( err => {
            console.log(err);
            res.status(500).send('No platforms');
        });
    },


    getVolumes ( req, res, next ) {
        const { search, subject } = req.query;
        let sub = subject === 'All' ? '' : subject;  // Google Books doesn't have an 'All' category, so it must be empty to search everything

        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${ search }+subject:${ sub }&maxResults=27&startIndex=0`)
        .then( books => {
            if ( books.data.items.length ) {

                const data = books.data.items.map( e => {
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
            } else res.status(404).send('No books');
        }).catch(err => {
            console.error(err);
            res.status(500).send('GoogleBooks error');
        });
    },


    getPosters ( req, res, next ) {
        const db = req.app.set('db');
        const { search, category } = req.query;
        const maxResults = 27,
              offset = 0;

        db.read_posters( [maxResults, offset] ).then( posters => {

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


    getProduct (req, res ) {
        const db = req.app.get('db');
        const { category, product_id, name } = req.query;
        // console.log({ category, product_id, name: name.split('-').join(' ') });

        if ( category === 'games' ) {
            
            axios.get(`https://www.giantbomb.com/api/games/?api_key=${process.env.GIANT_BOMB_KEY}&format=json&filter=name:${ name.split('-').join(' ') }&limit=1`)
            .then( games => {
                if ( games.data.results.length ) {

                    const g = games.data.results[0];
                    const game = {
                        id: g.id,
                        name: g.name,
                        description: g.deck,
                        releasedate: g.original_release_date,
                        price: Math.floor( Math.random() * (59 - 10) + 10 ) + 0.99,
                        platforms: g.platforms ? g.platforms.map(e => e.name) : [],
                        product_category_id: 1,
                        product_category: 'Games',
                        image_url: g.image.thumb_url ? g.image.thumb_url : '',
                        image_url_sml: g.image.small_url ? g.image.small_url : g.image.thumb_url
                    };
                    // console.log('game ->', g);
                    res.status(200).json( game );

                } else res.status(404).send('Game not found');
            }).catch( err => {
                console.error(err);
                res.status(200).json(err);
            });

        } else if ( category === 'books' ) {
            
            axios.get(`https://www.googleapis.com/books/v1/volumes/${ product_id }`)
            .then( books => {

                    const b = books.data;
                    const book = {
                        id: b.id,
                        name: b.volumeInfo.title,
                        description: b.volumeInfo.description ? b.volumeInfo.description : '',
                        publisher: b.volumeInfo.publisher,
                        publisheddate: b.volumeInfo.publishedDate,
                        price: Math.floor( Math.random() * (30 - 10) + 10 ) + 0.99,
                        subject: '',
                        product_category_id: 2,
                        product_category: 'Books',
                        image_url: b.volumeInfo.imageLinks ? b.volumeInfo.imageLinks.thumbnail : '',
                        image_url_sml: b.volumeInfo.imageLinks ? b.volumeInfo.imageLinks.small : ''
                    };
                    // console.log('book ->', books);
                    res.status(200).json( book );

            }).catch(err => {
                console.error(err);
                res.status(404).send('Book not found');
            });

        } else if ( category === 'posters' ) {
            
            db.read_poster( [product_id] ).then( poster => {
                if ( poster.length ) {

                    // console.log( 'poster ->', poster[0] );
                    res.status(200).json( poster[0] );

                } else res.status(404).json('Poster not found');
            }).catch( err => {
                console.log('getProduct', err);
                res.status(500).send(err);
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