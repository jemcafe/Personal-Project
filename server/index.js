require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const sessions = require('sessions');

const app = express();
app.use( bodyParser.json() );
app.use( cors() );





const port = process.env.PORT;
app.listen( port, () => { console.log('Listening on port: ' + port) } );