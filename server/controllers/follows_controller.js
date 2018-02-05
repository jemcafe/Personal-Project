module.exports = {
    getFollows ( req, res ) {
        const db = req.app.get('db');
        const { userid } = req.params;

        db.read_user_follows( [userid] ).then( follows => {
            res.status(200).json( follows );
        }).catch( err => {
            console.log(err)
            res.status(500).send(err);
        });
    },

    getFollowers ( req, res ) {
        const db = req.app.get('db');
        const { userid } = req.params;

        db.read_user_followers( [userid] ).then( followers => {
            res.status(200).json( followers );
        }).catch( err => {
            console.log(err)
            res.status(500).send(err);
        });
    }
}