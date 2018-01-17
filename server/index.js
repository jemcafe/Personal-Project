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
const postsCntrl = require('./controllers/posts_controller');
const srchProductsCntrl = require('./controllers/search_products_controller');

const app = express();

app.use( bodyParser.json() );
app.use( cors() );
app.use( session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
massive( process.env.CONNECTION_STRING ).then( db => app.set('db', db) ).catch( err => console.log( 'error', err ) );

app.use( checkForSession );


// Auth
app.post('/api/login', authCntrl.login);
app.post('/api/register', authCntrl.register);
app.post('/api/logout', authCntrl.logout);
app.get('/api/user', authCntrl.getUser);

// User posts
app.post('/api/newpost', postsCntrl.createPost);
// app.put('/api/editpost/:id', postsCntrl.editPost);
app.delete('/api/delete-post/:id', postsCntrl.deletePost);
// app.get('/api/post/:id', postsCntrl.getPost);
// app.get('/api/posts', postsCntrl.getPosts);

// Product Categories
app.get('/api/game-platforms', srchProductsCntrl.getPlatforms);
app.get('/api/book-subjects', srchProductsCntrl.getSubjects);
app.get('/api/poster-categories', srchProductsCntrl.getCategories);
// Products Search
app.get('/api/search/games', srchProductsCntrl.getGames);
app.get('/api/search/books', srchProductsCntrl.getVolumes);
app.get('/api/search/posters', srchProductsCntrl.getPosters);


const port = process.env.SERVER_PORT || 3030;
app.listen( port, () => console.log('Listening on port: ' + port) );