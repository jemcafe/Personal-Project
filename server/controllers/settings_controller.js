const bcrypt = require('bcrypt');
const saltRounds = 8;

module.exports = {
    updateAvatar ( req, res, next ) {
        const db = req.app.get('db');
        const { avatar } = req.body;
        const { session } = req;

        // Checks the protocol. If the rest of the url does not point to a actual source, the default image is used.
        const avatarCheck = !avatar 
                            ? 'http://busybridgeng.com/wp-content/uploads/2017/05/generic-avatar.png' 
                            : avatar.slice(0,8) === 'https://' || avatar.slice(0,7) === 'http://'
                            ? avatar 
                            : 'http://busybridgeng.com/wp-content/uploads/2017/05/generic-avatar.png'

        db.update_avatar( [avatarCheck, session.user.id] )
        .then( user => {
            session.user.avatar = user[0].avatar;
            res.status(200).json( session.user );
        }).catch(err => {
            console.log('updateAvatar', err);
            res.status(500).json(err);
        });
    },

    updateHeaderBkgdImg ( req, res, next ) {
        const db = req.app.get('db');
        const { session } = req;
        const { header_bkgd_img } = req.body;

        db.update_headerBkgdImg( [header_bkgd_img, session.user.id] )
        .then( user => {
            session.user.header_bkgd_img = user[0].header_bkgd_img;
            res.status(200).json( session.user );
        }).catch(err => {
            console.log('updateHeaderBkgd', err);
            res.status(500).json(err);
        });
    },

    updatePassword ( req, res, next ) {
        const db = req.app.get('db');
        const { session } = req;
        const { oldPwd, newPwd, confirmedPwd } = req.body;

        db.find_user( [session.user.username] ).then( users => {
            if ( users.length ) {

                if ( !oldPwd.length ) {        // old password was not submitted
                    res.status(412).json('old password');
                } else if ( !newPwd.length ) { // new password was not submitted
                    res.status(412).json('new password');
                } else {

                    bcrypt.compare( oldPwd, users[0].password ).then( passwordMatch => {
                        if ( !passwordMatch ) {                 // old passwords don't match
                            res.status(403).json('old password');
                        } else if ( newPwd !== confirmedPwd ) { // New passwords don't match ( new password not confirmed )
                            res.status(404).json('New password not confirmed');
                        } else {

                            bcrypt.hash( newPwd, saltRounds ).then( hashedPassword => {
                                db.update_password( [hashedPassword, session.user.id] )
                                .then(() => {

                                    res.status(200).json('Password changed');

                                }).catch(err => {
                                    console.log(err);
                                    res.status(500).json('Password is not changed');
                                });
                            }).catch(err => console.log(err));
                                
                        }
                    });

                }

            } else res.status(404).json('User not found');
        }).catch(err => {
            console.log('updatePassword', err);
            res.status(500).json(err);
        });
    },

    deleteAccount ( req, res, next) {
        const db = req.app.get('db');
        const { session } = req;

        db.delete_user_account( [session.user.id] ).then( () => {
            req.session.destroy();
            res.status(200).json('Account deleted');
        }).catch(err => {
            console.log('deleteAccount', err);
            res.status(500).json(err);
        });
    }
}