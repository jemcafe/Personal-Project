module.exports = {
    createPoster ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { name, description, price, category, image } = req.body;

        const date = new Date();
        const dd = date.getDate();
        const mm = date.getMonth() + 1; // Months start at 0
        const yyyy = date.getFullYear();
        const currentDate = `${mm} / ${dd} / ${yyyy}`;

        if ( session.user.id ) {

            db.create_poster( [name, description, currentDate, price, category, 3, session.user.id, image] ).then( poster => {
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
        const { name, description, price, category, image } = req.body;

        if ( session.user.id ) {

            db.update_poster( [id, name, description, price, category, session.user.id, image] ).then( poster => {
                res.status(200).send( poster );
            }).catch( err => {
                console.log(err);
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

    readPoster ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { id } = req.params;

        if ( session.user.id ) {

            db.read_user_poster( [id, session.user.id] ).then( poster => {
                // Nothing happens to the data
                res.status(200).json( poster );
            }).catch( err => {
                console.log(err);
                res.status(404).send('No poster found');
            });

        } else {
            res.status(404).send('No user');
        }
    },

    readPosters ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;

        if ( session.user.id ) {

            db.read_user_posters( [session.user.id] ).then( posters => {
                // Nothing happens to the data
                res.status(200).json( posters );
            }).catch( err => {
                console.log(err);
                res.status(500).send('Poster not deleted');
            });

        } else {
            res.status(404).send('No user');
        }
    }
}