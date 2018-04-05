require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const massive = require('massive');

// Middlewares
const checkForSession = require('./middlewares/checkForSession');

// Controllers
const authCtrl = require('./controllers/auth_controller');
const searchCtrl = require('./controllers/search_controller');
const postsCtrl = require('./controllers/posts_controller');
const commentsCtrl = require('./controllers/comments_controller');
const postersCtrl = require('./controllers/posters_controller');
const followsCtrl = require('./controllers/follows_controller');
const cartCtrl = require('./controllers/cart_controller');
const settingsCtrl = require('./controllers/settings_controller');
const userProfileCtrl = require('./controllers/user_profile_controller');
const stripeCtrl = require('./controllers/stripe_controller');

const app = express();

app.use( express.static( `${__dirname}/../build` ) );  // Build
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

// Auth
    app.post('/api/login', authCtrl.login);
    app.post('/api/register', authCtrl.register);
    app.post('/api/logout', authCtrl.logout);
    app.get('/api/user', authCtrl.getUser);

// User 
    // Posts
    app.post('/api/post', postsCtrl.createPost);
    app.put('/api/post/:id/edit', postsCtrl.updatePost);
    app.delete('/api/post/:id/delete', postsCtrl.deletePost);
    app.get('/api/post/:id', postsCtrl.getPost);
    app.get('/api/posts', postsCtrl.getPosts);
    // Comments
    app.post('/api/comment', commentsCtrl.createComment);
    app.put('/api/comment/:id/edit', commentsCtrl.updateComment);
    app.delete('/api/comment/:id/delete', commentsCtrl.deleteComment);
    app.get('/api/post/:post_id/comments', commentsCtrl.getComments);
    // Posters
    app.post('/api/poster', postersCtrl.createPoster);
    app.put('/api/poster/:id/edit', postersCtrl.updatePoster);
    app.delete('/api/poster/:id/delete', postersCtrl.deletePoster);
    app.get('/api/posters', postersCtrl.getPosters);
    // Follows
    app.post('/api/follow', followsCtrl.follow);
    app.delete('/api/unfollow/:user_id', followsCtrl.unfollow);
    app.get('/api/follows', followsCtrl.getFollows);
    app.get('/api/followers', followsCtrl.getFollowers);
    // Cart
    app.post('/api/cart/add', cartCtrl.addItem);
    app.delete('/api/cart/remove/:id', cartCtrl.removeItem);
    // app.patch('/api/cart/update/quantity/:id', cartCtrl.updateQuantity);
    app.get('/api/cart', cartCtrl.getCart);
    app.delete('/api/cart/remove-all', cartCtrl.removeAllItems);
    // Settings
    app.put('/api/avatar/update', settingsCtrl.updateAvatar);
    app.put('/api/header-image/update', settingsCtrl.updateHeaderBkgdImg);
    app.put('/api/password/update', settingsCtrl.updatePassword);
    app.delete('/api/delete-account', settingsCtrl.deleteAccount);

// User Profiles
    app.get('/api/profile/:username', userProfileCtrl.getUser);
    app.get('/api/profile/:username/posts', userProfileCtrl.getPosts);
    app.get('/api/profile/:username/posters', userProfileCtrl.getPosters);
    app.get('/api/profile/:username/posters/recent', userProfileCtrl.getRecentPosters);
    app.get('/api/profile/:username/follows', userProfileCtrl.getFollows);
    app.get('/api/profile/:username/followers', userProfileCtrl.getFollowers);

// Search
    // Categories
    app.get('/api/product/categories', searchCtrl.getProductCategories);
    app.get('/api/product/subcategories', searchCtrl.getProductSubcategories);
    // Search
    app.get('/api/search/games', searchCtrl.getGames);
    app.get('/api/search/books', searchCtrl.getVolumes);
    app.get('/api/search/posters', searchCtrl.getPosters);
    app.get('/api/search/users', searchCtrl.getUsers);
    app.get('/api/product', searchCtrl.getProduct);

// Stripe payment
    app.post('/save-stripe-token', stripeCtrl.paymentApi);


// This is just for getting the 3rd party api data to my database, so searching and finding products is easier than search 3 seperate APIs (two 3rd parties and my own)
// app.get('/api/get-games', searchCtrl.getGamesForDatabase);
// app.get('/api/get-books', searchCtrl.getBooksForDatabase);

// Build
const path = require('path')
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

const port = process.env.SERVER_PORT || 3030;
app.listen( port, () => console.log(`Listening on port: ${port}`) );