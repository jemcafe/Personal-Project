module.exports = {
    addItem ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { productId, name, price, productCategoryId, quantity, image } = req.body;

        if ( session.user.id ) {

            db.read_cart( [session.user.id] ).then( cart => {

                let itemFound = false;
                let newQuantity = quantity;

                for ( let i = 0; i < cart.length; i++ ) {
                    if ( productId === cart[i].productid && productCategoryId === cart[i].productcategoryid ) {

                        newQuantity += cart[i].quantity;

                        db.update_cart_item_quantity( [cart[i].id, newQuantity, session.user.id] )
                        .then( item => {
                            res.status(200).json( item );
                        }).catch( err => {
                            console.log(err);
                            res.status(500).send('Quantity not updated');
                        });

                        itemFound = true;
                    }
                }

                if ( !itemFound ) {
                    db.create_cart_item( [productId, name, price, productCategoryId, newQuantity, session.user.id, image] ).then( item => {
                        res.status(200).json( item );
                    }).catch( err => {
                        console.log(err);
                        res.status(500).send('Item not added');
                    });
                }

            }).catch( err => {
                console.log(err);
                res.status(500).send('Item not added');
            });

        } else {
            res.status(404).send('No user');
        }
    },

    removeItem ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { id } = req.params;

        if ( session.user.id ) {

            db.delete_cart_item( [id, session.user.id] ).then( item => {
                res.status(200).json('Item deleted');
            }).catch( err => {
                console.log(err);
                res.status(500).send('Item not deleted');
            });

        } else {
            res.status(404).send('No user');
        }
    },

    updateQuantity ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { id } = req.params;
        const { quantity } = req.body;

        if ( session.user.id ) {

            db.update_cart_item_quantity( [id, quantity, session.user.id] ).then( item => {
                res.status(200).json( item );
            }).catch( err => {
                console.log(err);
                res.status(500).send('Quantity not updated');
            });

        } else {
            res.status(404).send('No user');
        }
    },

    getCart ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;

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
    },

    removeAllItems ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;

        if ( session.user.id ) {

            db.delete_cart_items( [session.user.id] ).then( item => {
                res.status(200).json( [] );
            }).catch( err => {
                console.log(err);
                res.status(500).send('Items not deleted');
            });

        } else {
            res.status(404).send('No user');
        }
    }
}