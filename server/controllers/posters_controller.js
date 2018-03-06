module.exports = {
    createPoster ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { name, description, price, postercategoryid, imageurl } = req.body;

        const date = new Date();
        const dd = date.getDate();
        const mm = date.getMonth() + 1; // Months start at 0
        const yyyy = date.getFullYear();
        const currentDate = `${mm} / ${dd} / ${yyyy}`;

        // const categoryId = category === 'Digital Art' ? 1 : category === 'Traditional Art' ? 2 : 3;

        if ( session.user.id ) {

            db.create_poster( [name, description, currentDate, price, postercategoryid, 3, session.user.id, imageurl] ).then( poster => {
                res.status(200).json( poster );
            }).catch( err => {
                console.log(err);
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
        const { name, description, price, postercategoryid, imageurl } = req.body;
        
        if ( session.user.id ) {

            db.update_poster( [id, name, description, price, postercategoryid, session.user.id, imageurl] ).then( poster => {
                res.status(200).send( poster );
            }).catch( err => {
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
                console.log(err);
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
            console.log(err);
            res.status(500).send('Poster not deleted');
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
            console.log(err);
            res.status(500).send('Poster not deleted');
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
                console.log(err);
                res.status(404).send('No poster found');
            });

        } else {
            res.status(404).send('No user');
        }
    }
}