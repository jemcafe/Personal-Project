module.exports = {
    createPost ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { title, text, image } = req.body;

        const date = new Date();
        const dd = date.getDate();
        const mm = date.getMonth() + 1; // Months start at 0
        const yyyy = date.getFullYear();
        const currentDate = `${mm} / ${dd} / ${yyyy}`;

        if ( session.user.id ) {

            db.create_post( [title, text, image, currentDate, session.user.id] ).then( post => {
                res.status(200).json( post );
            }).catch( err => {
                console.log(err);
                res.status(500).send('Not posted');
            });

        } else {
            res.status(500).send('No user');
        }
    },

    editPost ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { title, text, image } = req.body;
        const { id } = req.params;

        if ( session.user.id ) {

            db.update_post( [id, title, text, image, session.user.id] ).then( post => {
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

        if ( session.user.id ) {
            
            db.read_posts( [session.user.id] ).then( posts => {
                res.status(200).json( posts.reverse() );
            }).catch( err => {
                console.log(err);
                res.status(500).send('Unable to get posts');
            });

        } else {
            res.status(500).send('No user');
        }
    }
}