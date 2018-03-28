module.exports = {
    addItem ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;
        const { product_id, name, price, product_category_id, quantity, image_url } = req.body;

        if ( session.user.id ) {

            db.read_cart( [session.user.id] ).then( cart => {

                let itemFound = false;
                let newQuantity = quantity;

                for ( let i = 0; i < cart.length; i++ ) {
                    // The product_id comparison uses a loose equal because the product id could be an integer or a string (Google Books). The product_id is a varchar.
                    if ( product_id == cart[i].product_id && product_category_id === cart[i].product_category_id ) {

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
                    db.create_cart_item( [product_id, name, price, product_category_id, newQuantity, image_url, session.user.id] )
                    .then( item => {
                        res.status(200).json( item );
                    }).catch( err => {
                        console.log(err);
                        res.status(500).send('Item not added');
                    });
                }

            }).catch( err => {
                console.log('cart', err);
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
                console.log('cart removeItem', err);
                res.status(500).send('Item not deleted');
            });

        } else {
            res.status(404).send('No user');
        }
    },

    // updateQuantity ( req, res ) {
    //     const db = req.app.set('db');
    //     const { session } = req;
    //     const { id } = req.params;
    //     const { quantity } = req.body;

    //     if ( session.user.id ) {

    //         db.update_cart_item_quantity( [id, quantity, session.user.id] )
    //         .then( item => {
    //             res.status(200).json( item );
    //         }).catch( err => {
    //             console.log(err);
    //             res.status(500).send('Quantity not updated');
    //         });

    //     } else {
    //         res.status(404).send('No user');
    //     }
    // },

    getCart ( req, res ) {
        const db = req.app.set('db');
        const { session } = req;

        if ( session.user.id ) {

            db.read_cart( [session.user.id] ).then( cart => {
                res.status(200).json( cart );
            }).catch( err => {
                console.log('cart getCart', err);
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

            db.delete_cart_items( [session.user.id] ).then( () => {
                res.status(200).json( [] );
            }).catch( err => {
                console.log('cart removeAllItems', err);
                res.status(500).send('Items not deleted');
            });

        } else {
            res.status(404).send('No user');
        }
    }
}