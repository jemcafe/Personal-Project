let id = 0;

module.exports = {
    createPost ( req, res ) {
        const { session } = req;
        const { title, message } = req.body;

        session.user.posts.push({
            title: title,
            message: message
        });

        res.status(200).json( session.user.posts[id] );
        id++;
    },

    editPost (req, res ) {
        const { session } = req;
        const { title, message } = req.body;

        session.user.posts[ req.params.id ] = {
            title: title,
            message: message
        };

        res.status(200).json( session.user.posts[ req.params.id ] );
    },

    deletePost ( req, res ) {
        const { session } = req;

        session.user.posts.splice( req.params.id, 1 );

        res.status(200).json( session.user );
    },

    getPosts (req, res ) {
        const { session } = req;

        res.status(200).json( session.user.posts );
    }
}