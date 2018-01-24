const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session');
require('dotenv').config();

// Middleware
const checkForSession = require('./middlewares/checkForSession');

// Controllers
const authCntrl = require('./controllers/auth_controller');
const srchProductsCntrl = require('./controllers/search_products_controller');
const postsCntrl = require('./controllers/posts_controller');
const postersCntrl = require('./controllers/posters_controller');
const cartCntrl = require('./controllers/cart_controller');

const app = express();

app.use( bodyParser.json() );
app.use( cors() );
app.use( session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use( checkForSession );
massive( process.env.CONNECTION_STRING ).then( db => app.set('db', db) ).catch( err => console.log( 'error', err ) );


// Auth
app.post('/api/login', authCntrl.login);
app.post('/api/register', authCntrl.register);
app.post('/api/logout', authCntrl.logout);
app.get('/api/user', authCntrl.getUser);

// User 
    // posts
    app.post('/api/new-post', postsCntrl.createPost);
    app.put('/api/edit-post/:id', postsCntrl.updatePost);
    app.delete('/api/delete-post/:id', postsCntrl.deletePost);
    app.get('/api/post/:id', postsCntrl.getPost);
    app.get('/api/posts', postsCntrl.getPosts);
    // posters
    app.post('/api/new-poster', postersCntrl.createPoster);
    app.put('/api/edit-poster/:id', postersCntrl.updatePoster);
    app.delete('/api/delete-poster/:id', postersCntrl.deletePoster);
    app.get('/api/posters', postersCntrl.readPosters);
    // Cart
    app.post('/api/add-item', cartCntrl.addItem);
    app.delete('/api/remove-item/:id', cartCntrl.removeItem);
    app.patch('/api/update-quantity/:id', cartCntrl.updateQuantity);
    app.get('/api/cart', cartCntrl.getCart);
    // app.delete('/api/remove-all-items', cartCntrl.removeAllItems);

// Products
    // Categories
    app.get('/api/product-categories', srchProductsCntrl.getProductCategories);
    app.get('/api/product-subcategories', srchProductsCntrl.getProductSubcategories);
    // Subcategories
    app.get('/api/game-platforms', srchProductsCntrl.getGamePlatforms);
    app.get('/api/book-subjects', srchProductsCntrl.getBookSubjects);
    app.get('/api/poster-categories', srchProductsCntrl.getPosterCategories);
    // Search
    app.get('/api/search/games', srchProductsCntrl.getGames);
    app.get('/api/search/books', srchProductsCntrl.getVolumes);
    app.get('/api/search/posters', srchProductsCntrl.getPosters);
    // Ratings
    app.get('/api/book-ratings', srchProductsCntrl.getBookRatings);

// This is for getting the 3rd party api data to my database
app.get('/api/getgames', srchProductsCntrl.getGamesForDatabase);
app.get('/api/getBooks', srchProductsCntrl.getBooksForDatabase);


const port = process.env.SERVER_PORT || 3030;
app.listen( port, () => console.log('Listening on port: ' + port) );