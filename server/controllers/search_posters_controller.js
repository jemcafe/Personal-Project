const posterCategories = require('../db_temp/posterCategories');
const posters = require('../db_temp/posters');

module.exports = {
    getCategories ( req, res, next ) {
        const categories = ['All', ...posterCategories];
        res.status(200).json( categories );
    },
    getPosters ( req, res, next ) {
        const { category } = req.query;

        let data = posters;
        // Can be searched by category but not by search input yet
        data = data.filter( e => e.category === category );

        res.status(200).send( data );
    }
}