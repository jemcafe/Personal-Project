module.exports = {
    getUser ( req, res ) {
        const db = req.app.get('db');
        const { username } = req.params;

        db.find_user( [username] ).then( user => {

            if ( user.length ) {
                const userData = {
                    id: user[0].id,
                    username: user[0].username,
                    name: user[0].name,
                    imageurl: !user[0].imageurl ? 'http://busybridgeng.com/wp-content/uploads/2017/05/generic-avatar.png' : user[0].imageurl,
                    headerbkgdimgurl: user[0].headerbkgdimgurl,
                    profileurl: user[0].profileurl
                }
                res.status(200).json( userData );
            } else {
                res.status(401).json( 'User not found' );
            }

        }).catch( err => {
            console.log(err)
            res.status(500).send(err);
        });
    },
    getUsers ( req, res ) {
        const db = req.app.get('db');

        db.read_users().then( users => {
            const usersData = users.map( user => {
                return { 
                    id: user.id,
                    username: user.username,
                    name: user.name,
                    imageurl: !user.imageurl ? 'http://busybridgeng.com/wp-content/uploads/2017/05/generic-avatar.png' : user.imageurl,
                    headerbkgdimgurl: user.headerbkgdimgurl,
                    profileurl: user.profileurl
                }
            });
            res.status(200).json( usersData );
        }).catch( err => {
            console.log(err)
            res.status(500).send(err);
        });
    },

}