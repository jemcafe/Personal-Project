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
const srchProductsCntrl = require('./controllers/searchProducts_controller');
const postsCntrl = require('./controllers/posts_controller');
const postersCntrl = require('./controllers/posters_controller');
const followsCntrl = require('./controllers/follows_controller');
const cartCntrl = require('./controllers/cart_controller');
const usersCntrl = require('./controllers/users_controller');
const stripeCntrl = require('./controllers/stripe_controller');

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
    // Posts
    app.post('/api/new-post', postsCntrl.createPost);
    app.put('/api/edit-post/:id', postsCntrl.updatePost);
    app.delete('/api/delete-post/:id', postsCntrl.deletePost);
    app.get('/api/post/:id', postsCntrl.getPost);
    app.get('/api/posts/:userid', postsCntrl.getPosts);
    // Posters
    app.post('/api/new-poster', postersCntrl.createPoster);
    app.put('/api/edit-poster/:id', postersCntrl.updatePoster);
    app.delete('/api/delete-poster/:id', postersCntrl.deletePoster);
    app.get('/api/posters/:userid', postersCntrl.getPosters);
    app.get('/api/recent-posters/:userid', postersCntrl.getRecentPosters);
    // Follow
    app.get('/api/follows/:userid', followsCntrl.getFollows);
    app.get('/api/followers/:userid', followsCntrl.getFollowers);
    // Cart
    app.post('/api/add-item', cartCntrl.addItem);
    app.delete('/api/remove-item/:id', cartCntrl.removeItem);
    app.patch('/api/update-quantity/:id', cartCntrl.updateQuantity);
    app.get('/api/cart', cartCntrl.getCart);
    app.delete('/api/remove-all-items', cartCntrl.removeAllItems);

// Users ( For finding specific user profiles )
    app.get('/api/user/:username', usersCntrl.getUser);
    app.get('/api/users', usersCntrl.getUsers);

// Products
    // Categories
    app.get('/api/product-categories', srchProductsCntrl.getProductCategories);
    app.get('/api/product-subcategories', srchProductsCntrl.getProductSubcategories);
    // Search
    app.get('/api/search/games', srchProductsCntrl.getGames);
    app.get('/api/search/books', srchProductsCntrl.getVolumes);
    app.get('/api/search/posters', srchProductsCntrl.getPosters);
    // Ratings
    app.get('/api/book-ratings', srchProductsCntrl.getBookRatings);

// Stripe payment
    app.post('/save-stripe-token', stripeCntrl.paymentApi);


// This is for getting the 3rd party api data to my database
app.get('/api/getgames', srchProductsCntrl.getGamesForDatabase);
app.get('/api/getBooks', srchProductsCntrl.getBooksForDatabase);


const port = process.env.SERVER_PORT || 3030;
app.listen( port, () => console.log('Listening on port: ' + port) );