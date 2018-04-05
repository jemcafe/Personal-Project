module.exports = {
    createComment (req, res, next) {
        const db = req.app.get('db');
        const { session } = req;
        const { text, post_id } = req.body;
        const datePosted = new Date();

        if ( session.user.id ) {
            
            db.create_comment([text, datePosted, post_id, session.user.id])
            .then( comment => {
                res.status(200).json(comment);
            }).catch(err => {
                console.log(err);
                res.status(500).send(err);
            });

        } else res.status(404).send('No user');
    },

    updateComment (req, res, next) {
        const db = req.app.get('db');
        const { session } = req;
        const { id, text } = req.body;

        if ( session.user.id ) {

            db.update_comment([id, text, session.user.id]).then( comment => {
                res.status(200).json(comment);
            }).catch(err => {
                console.log(err);
                res.status(500).send(err);
            });

        } else res.status(404).send('No user');
    },

    deleteComment (req, res, next) {
        const db = req.app.get('db');
        const { session } = req;
        const { id } = req.params;

        if ( session.user.id ) {

            db.delete_comment([id, session.user.id]).then( comment => {
                res.status(200).json('Comment deleted');
            }).catch(err => {
                console.log(err);
                res.status(500).send(err);
            });

        } else res.status(404).send('No user');
    },

    getComments (req, res, next) {
        const db = req.app.get('db');
        const { session } = req;
        const { post_id } = req.params;

        if ( session.user.id ) {

            db.read_user_comments([post_id, session.user.id]).then( comments => {
                res.status(200).json(comments);
            }).catch(err => {
                console.log(err);
                res.status(500).send(err);
            });

        } else res.status(404).send('No user');
    }
}