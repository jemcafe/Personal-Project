let id = 0;

module.exports = {
    createPost ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { title, message, image } = req.body;

        const currentDate = new Date();
        const dd = currentDate.getDate();
        const mm = currentDate.getMonth() + 1; // Months start at 0
        const yyyy = currentDate.getFullYear();
        currentDate = `${mm}/${dd}/${yyyy}`;

        if ( session.user.id ) {

            db.create_post( [title, message, image, currentDate, session.user.id] ).then( post => {
                res.status(200).json( post );
            }).catch( err => {
                console.log(err);
                res.status(500).send('Not posted');
            });

        } else {
            res.status(500).send('No user');
        }
    },

    editPost (req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { title, message, image } = req.body;
        const { id } = req.params;

        if ( session.user.id ) {

            db.update_post( [id, title, message, image, session.user.id] ).then( post => {
                res.status(200).json( post );
            }).catch( err => {
                console.log(err);
                res.status(500).send('Not edited');
            });

        } else {
            res.status(500).send('No user');
        }
    },

    deletePost ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { id } = req.params;

        if ( session.user.id ) {

            db.delete_post( [id, session.user.id] ).then( () => {
                // Nothing happens to the data
                res.status(200).send('Deleted');
            }).catch( err => {
                console.log(err);
                res.status(500).send('Not deleted');
            });

        } else {
            res.status(500).send('No user');
        }
    },

    getPost (req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { id } = req.params;

        if ( session.user.id ) {

            db.read_post( [id, session.user.id] ).then( post => {
                res.status(200).json( post );
            }).catch( err => {
                console.log(err);
                res.status(500).send('Unable to get post');
            });

        } else {
            res.status(500).send('No user');
        }
    },

    getPosts (req, res ) {
        const db = req.app.set('db');
        const { session } = req;

        db.read_posts( [session.user.id] ).then( posts => {
            res.status(200).json( posts );
        }).catch( err => {
            console.log(err);
            res.status(500).send('Unable to get posts');
        });
    }
}