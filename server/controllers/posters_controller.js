module.exports = {
    createPoster ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { name, description, price, poster_category_id, image_url } = req.body;

        const date_posted = new Date(),
              product_category_id = 3,
              likes = 0;

        if ( session.user.id ) {

            db.create_poster( [name, description, date_posted, price, poster_category_id, product_category_id, image_url, likes, session.user.id] )
            .then( poster => {
                res.status(200).json( poster );
            }).catch( err => {
                console.log('creatPoster', err);
                res.status(500).send('Poster not created');
            });

        } else {
            res.status(404).send('No user');
        }
    },

    updatePoster ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { id } = req.params;
        const { name, description, price, poster_category_id, image_url } = req.body;
        
        if ( session.user.id ) {

            db.update_poster( [id, name, description, price, poster_category_id, image_url, session.user.id] )
            .then( poster => {
                res.status(200).send( poster );
            }).catch( err => {
                console.log('updatePoster', err);
                res.status(500).send('Poster not updated');
            });

        } else {
            res.status(404).send('No user');
        }
    },

    deletePoster ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { id } = req.params;

        if ( session.user.id ) {

            db.delete_poster( [id, session.user.id] ).then( () => {
                // Nothing happens to the data
                res.status(200).send('Poster deleted');
            }).catch( err => {
                console.log('deletePoster', err);
                res.status(500).send('Poster not deleted');
            });

        } else {
            res.status(404).send('No user');
        }
    },

    getPosters ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;

        db.read_user_posters( [session.user.id] ).then( posters => {
            res.status(200).json( posters );
        }).catch( err => {
            console.log('getPosters', err);
            res.status(500).send(err);
        });
    },

    getRecentPosters ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;

        db.read_user_posters( [session.user.id] ).then( posters => {

            let recentPosters = []; 
            if ( posters.length <= 3 ) {
                for ( let i = 0; i < posters.length; i++ ) { recentPosters.push(posters[i]) }
            } else {
                for ( let i = 0; i < 3; i++ ) { recentPosters.push(posters[i]) }
            }
            res.status(200).json( recentPosters );

        }).catch( err => {
            console.log('getRecentPosters', err);
            res.status(500).send(err);
        });
    },

    getPoster ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { id } = req.params;

        if ( session.user.id ) {

            db.read_user_poster( [id, session.user.id] ).then( poster => {
                res.status(200).json( poster );
            }).catch( err => {
                console.log('getPoster', err);
                res.status(404).send('No poster found');
            });

        } else {
            res.status(404).send('No user');
        }
    }
}