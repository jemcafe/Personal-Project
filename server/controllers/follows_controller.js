module.exports = {
    follow ( req, res ) {
        const db = req.app.get('db');
        const { session } = req;
        const { profileUserId } = req.body;

        db.create_follow( [profileUserId, session.user.id] ).then( follow => {
            res.status(200).json( follow );
        }).catch( err => {
            console.log(err)
            res.status(500).send(err);
        });
    },

    unfollow ( req, res ) {
        const db = req.app.get('db');
        const { session } = req;
        const { id } = req.params;

        db.delete_follow( [id, session.user.id] ).then( follow => {
            res.status(200).json('Follow removed');
        }).catch( err => {
            console.log(err)
            res.status(500).send(err);
        });
    },

    getFollows ( req, res ) {
        const db = req.app.get('db');
        const { username } = req.params;

        db.read_user_follows( [username] ).then( follows => {
            res.status(200).json( follows );
        }).catch( err => {
            console.log(err)
            res.status(500).send(err);
        });
    },

    getFollowers ( req, res ) {
        const db = req.app.get('db');
        const { username } = req.params;

        db.read_user_followers( [username] ).then( followers => {
            res.status(200).json( followers );
        }).catch( err => {
            console.log(err);
            res.status(500).send(err);
        });
    }
}