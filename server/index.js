require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session');

// Middleware
const checkForSession = require('./middlewares/checkForSession');

// Controllers
const authCntrl = require('./controllers/auth_controller');
const searchGamesCntrl = require('./controllers/search_games_controller');
const searchBooksCntrl = require('./controllers/search_books_controller');
const searchPostersCntrl = require('./controllers/search_posters_controller');

const app = express();

app.use( bodyParser.json() );
app.use( cors() );
app.use( session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use( checkForSession );


// Requests
app.post('/api/signin', authCntrl.signin);
app.post('/api/register', authCntrl.register);
app.post('/api/signout', authCntrl.signout);
app.get('/api/user', authCntrl.getUser);

app.get('/api/games/genres', searchGamesCntrl.getGenres);
app.get('/api/books/subjects', searchBooksCntrl.getSubjects);
app.get('/api/posters/categories', searchPostersCntrl.getCategories);

app.get('/api/search/games', searchGamesCntrl.getGames);
app.get('/api/search/books', searchBooksCntrl.getVolumes);


const port = process.env.PORT || 3000;
app.listen( port, () => { console.log('Listening on port: ' + port) } );