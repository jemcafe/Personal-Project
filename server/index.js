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
const searchGamesCntrl = require('./controllers/search_games_controller');
const searchBooksCntrl = require('./controllers/search_books_controller');
const searchPostersCntrl = require('./controllers/search_posters_controller');

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
// app.post('/api/newpost', postsCntrl.createPost);
// app.put('/api/editpost/:id', postsCntrl.editPost);
// app.delete('/api/deletepost', postsCntrl.deletePost);
// app.get('/api/posts', postsCntrl.getPosts);

// Site Search
app.get('/api/game-platforms', searchGamesCntrl.getPlatforms);
app.get('/api/book-subjects', searchBooksCntrl.getSubjects);
app.get('/api/poster-categories', searchPostersCntrl.getCategories);

app.get('/api/search/games', searchGamesCntrl.getGames);
app.get('/api/search/books', searchBooksCntrl.getVolumes);
app.get('/api/search/posters', searchPostersCntrl.getPosters);


const port = process.env.SERVER_PORT || 3030;
app.listen( port, () => console.log('Listening on port: ' + port) );