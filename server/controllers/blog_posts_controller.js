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

        res.status(200).json(  );
    },

    deletePost ( req, res ) {
        const { session } = req;

        res.status(200).json(  );
    },

    getPosts (req, res ) {
        const { session } = req;

        res.status(200).json(  );
    }
}