let id = 0;

module.exports = {
    createPost ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { uid, title, message, image } = req.body;

        const currenttDate = new Date();
        const dd = currenttDate.getDate();
        const mm = currenttDate.getMonth() + 1; // Months start at 0
        const yyyy = currenttDate.getFullYear();
        currentDate = `${mm}/${dd}/${yyyy}`;

        if ( session.user.id ) {
            db.create_post( [title, message, image, currentDate, session.user.id] ).then(
                //Nothing happens to the data
            ).catch( err => {
                console.log(err);
                res.status(500).send('Not posted');
            });
            res.status(200).send('Posted');
        } else {
            res.status(500).send('No user');
        }
    },

    editPost (req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { title, message } = req.body;

        session.user.posts[ req.params.id ] = {
            title: title,
            message: message
        };

        res.status(200).json( session.user.posts[ req.params.id ] );
    },

    deletePost ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { id } = req.params;

        if ( session.user.id ) {
            db.delete_post( [id, session.user.id] ).then(
                // Nothing happens to the data
            ).catch( err => {
                console.log(err);
                res.status(500).send('Not deleted');
            });
            res.status(200).json('Deleted');
        } else {
            res.status(500).send('No user');
        }
    },

    getPosts (req, res ) {
        const db = req.app.set('db');
        const { session } = req;

        res.status(200).json( session.user.posts );
    }
}