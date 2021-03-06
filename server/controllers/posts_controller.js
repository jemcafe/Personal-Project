module.exports = {
    createPost ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { title, text, image_url } = req.body;

        const date = new Date();
        const dd = date.getDate();
        const mm = date.getMonth() + 1; // Months start at 0
        const yyyy = date.getFullYear();
        const date_posted = `${date.getMonth() + 1} / ${date.getDate()} / ${date.getFullYear()}`;

        if ( session.user.id ) {

            db.create_post( [title, text, image_url, date_posted, session.user.id] )
            .then( post => {
                res.status(200).json( post );
            }).catch( err => {
                console.log('createPost', err);
                res.status(500).send('Not posted');
            });

        } else {
            res.status(404).send('No user');
        }
    },

    updatePost ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { id } = req.params;
        const { title, text, image_url } = req.body;

        if ( session.user.id ) {

            db.update_post( [id, title, text, image_url, session.user.id] )
            .then( post => {
                res.status(200).json( post );
            }).catch( err => {
                console.log('updatePost', err);
                res.status(500).send('Not edited');
            });

        } else {
            res.status(404).send('No user');
        }
    },

    deletePost ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { id } = req.params;

        if ( session.user.id ) {

            db.delete_post( [id, session.user.id] ).then( () => {
                // Nothing happens to the data
                res.status(200).send('Post deleted');
            }).catch( err => {
                console.log('deletePost', err);
                res.status(500).send('Post not deleted');
            });

        } else {
            res.status(404).send('No user');
        }
    },

    getPosts ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        
        db.read_user_posts( [session.user.id] ).then( posts => {
            res.status(200).json( posts );
        }).catch( err => {
            console.log('getPosts', err);
            res.status(500).send('Unable to get posts');
        });
    },

    getPost (req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { id } = req.params;

        if ( session.user.id ) {

            db.read_user_post( [id, session.user.id] ).then( post => {
                res.status(200).json( post );
            }).catch( err => {
                console.log('getPost', err);
                res.status(500).send('Unable to get post');
            });

        } else {
            res.status(404).send('No user');
        }
    }
}