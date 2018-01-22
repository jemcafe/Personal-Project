module.exports = {
    addItem ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;

        if ( session.user.id ) {

        

        } else {
            res.status(404).send('No user');
        }
    },

    removeItem ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { id } = req.params;

        if ( session.user.id ) {

            db.delete_cart_item( [session.user.id] ).then( cart => {
                res.status(200).json( cart );
            }).catch( err => {
                console.log(err);
                res.status(500).send('Unable to get cart');
            });

        } else {
            res.status(404).send('No user');
        }
    },

    getCart ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { id } = req.params;

        if ( session.user.id ) {

            db.read_cart( [session.user.id] ).then( cart => {
                res.status(200).json( cart );
            }).catch( err => {
                console.log(err);
                res.status(500).send('Unable to get cart');
            });

        } else {
            res.status(404).send('No user');
        }
    }
}