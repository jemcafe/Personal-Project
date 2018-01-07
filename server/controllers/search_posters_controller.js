const posterCategories = require('../db_temp/posterCategories');

module.exports = {
    getCategories ( req, res, next ) {
        const categories = ['All', ...posterCategories];
        res.status(200).json( categories );
    }
}