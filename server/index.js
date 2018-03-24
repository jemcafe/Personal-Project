const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const massive = require('massive');
// const multer = require('multer');  // local storage
// const AWS = require('aws-sdk');
require('dotenv').config();

// Middlewares
const checkForSession = require('./middlewares/checkForSession');

// Controllers
const authCntrl = require('./controllers/auth_controller');
const searchCntrl = require('./controllers/search_controller');
const postsCntrl = require('./controllers/posts_controller');
const postersCntrl = require('./controllers/posters_controller');
const followsCntrl = require('./controllers/follows_controller');
const cartCntrl = require('./controllers/cart_controller');
const settingsCntrl = require('./controllers/settings_controller');
const userProfileCntrl = require('./controllers/user_profile_controller');
const stripeCntrl = require('./controllers/stripe_controller');

const app = express();

// app.use( express.static( `${__dirname}/../build` ) );  // Needed for hosting. Points to the build folder.
app.use( bodyParser.json() );
app.use( cors() );
app.use( session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use( checkForSession );
massive( process.env.CONNECTION_STRING )
    .then(db => app.set('db', db))
    .catch(err => console.log('DB error', err));

// AWS
// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION,
// });
// const s3 = new AWS.S3();
// var upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 } // bytes
// }).single('image');
// app.post('/api/upload');

// Auth
    app.post('/api/login', authCntrl.login);
    app.post('/api/register', authCntrl.register);
    app.post('/api/logout', authCntrl.logout);
    app.get('/api/user', authCntrl.getUser);

// User 
    // Posts
    app.post('/api/post', postsCntrl.createPost);
    app.put('/api/post/:id/edit', postsCntrl.updatePost);
    app.delete('/api/post/:id/delete', postsCntrl.deletePost);
    app.get('/api/post/:id', postsCntrl.getPost);
    app.get('/api/posts', postsCntrl.getPosts);
    // Posters
    app.post('/api/poster', postersCntrl.createPoster);
    app.put('/api/poster/:id/edit', postersCntrl.updatePoster);
    app.delete('/api/poster/:id/delete', postersCntrl.deletePoster);
    app.get('/api/posters', postersCntrl.getPosters);
    // Follows
    app.post('/api/follow', followsCntrl.follow);
    app.delete('/api/unfollow/:userId', followsCntrl.unfollow);
    app.get('/api/follows', followsCntrl.getFollows);
    app.get('/api/followers', followsCntrl.getFollowers);
    // Cart
    app.post('/api/cart/add', cartCntrl.addItem);
    app.delete('/api/cart/remove/:id', cartCntrl.removeItem);
    app.patch('/api/cart/update/quantity/:id', cartCntrl.updateQuantity);
    app.get('/api/cart', cartCntrl.getCart);
    app.delete('/api/cart/remove-all', cartCntrl.removeAllItems);
    // Settings
    app.put('/api/avatar/update', settingsCntrl.updateAvatar);
    app.put('/api/header-image/update', settingsCntrl.updateHeaderBkgdImg);
    app.put('/api/password/update', settingsCntrl.updatePassword);
    app.delete('/api/delete-account', settingsCntrl.deleteAccount);

// User Profiles
    app.get('/api/profile/:username', userProfileCntrl.getUser);
    app.get('/api/profile/:username/posts', userProfileCntrl.getPosts);
    app.get('/api/profile/:username/posters', userProfileCntrl.getPosters);
    app.get('/api/profile/:username/posters/recent', userProfileCntrl.getRecentPosters);
    app.get('/api/profile/:username/follows', userProfileCntrl.getFollows);
    app.get('/api/profile/:username/followers', userProfileCntrl.getFollowers);

// Search
    // Categories
    app.get('/api/product/categories', searchCntrl.getProductCategories);
    app.get('/api/product/subcategories', searchCntrl.getProductSubcategories);
    // Search
    app.get('/api/search/games', searchCntrl.getGames);
    app.get('/api/search/books', searchCntrl.getVolumes);
    app.get('/api/search/posters', searchCntrl.getPosters);
    app.get('/api/search/users', searchCntrl.getUsers);

// Stripe payment
    app.post('/save-stripe-token', stripeCntrl.paymentApi);


// This is just for getting the 3rd party api data to my database, so searching and finding products is easier than search 3 seperate APIs (two 3rd parties and my own)
// app.get('/api/get-games', searchCntrl.getGamesForDatabase);
// app.get('/api/get-books', searchCntrl.getBooksForDatabase);


const port = process.env.SERVER_PORT || 3030;
app.listen( port, () => console.log(`Listening on port: ${port}`) );