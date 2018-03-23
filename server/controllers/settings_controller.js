const bcrypt = require('bcrypt');
const saltRounds = 8;

module.exports = {
    updateAvatar ( req, res, next ) {
        const db = req.app.get('db');
        const { avatar } = req.body;
        const { session } = req;

        const avatarCheck = avatar ? avatar : 'http://busybridgeng.com/wp-content/uploads/2017/05/generic-avatar.png';

        db.update_avatar( [avatarCheck, session.user.id] )
        .then( user => {

            session.user.imageurl = user[0].imageurl;
            res.status(200).json( session.user );

        }).catch(err => console.log(err));
    },

    updateHeaderBkgdImg ( req, res, next ) {
        const db = req.app.get('db');
        const { session } = req;
        const { headerBkgdImgUrl } = req.body;

        db.update_headerBkgdImg( [headerBkgdImgUrl, session.user.id] )
        .then( user => {

            session.user.headerbkgdimgurl = user[0].headerbkgdimgurl;
            res.status(200).json( session.user );

        }).catch(err => console.log(err));
    },

    updatePassword ( req, res, next ) {
        const db = req.app.get('db');
        const { session } = req;
        const { oldPwd, newPwd, confirmedPwd } = req.body;

        db.find_user( [session.user.username] ).then( users => {

            if (users.length) {

                bcrypt.compare( oldPwd, users[0].password ).then( passwordMatch => {
                    if ( passwordMatch ) {
                        if ( newPwd === confirmedPwd ) {


                            bcrypt.hash( newPwd, saltRounds ).then( hashedPassword => {
                                db.update_password( [hashedPassword, session.user.id] )
                                .then(() => {

                                    res.status(200).json('Password changed');

                                }).catch(err => {
                                    console.log(err);
                                    res.status(500).json('Password is not changed');
                                });
                            }).catch(err => console.log(err));
                            
                            
                        } else res.status(404).json('New password not confirmed');
                    } else res.status(403).json('Wrong password');
                });

            } else res.status(404).json('User not found');

        }).catch(err => console.log(err));
    },

    deleteAccount ( req, res, next) {
        const db = req.app.get('db');
        const { session } = req;
    }
}