////-----------------------------------//-----------------------------------//-----------------------------------//-----------------------------------
//This start can be changed or removed so you can start working on your project, (CSRF TESTING IS JUST A SAFETY TOKEN TEST FOR POSTING)
////-----------------------------------//-----------------------------------//-----------------------------------//-----------------------------------

//-----------------------------------
// npm start - Starting nodemon
// npm run weboad = Stating webpack compiler
//-----------------------------------


//Dotenv security key Mongo;
require('dotenv').config();

//Create e start express + MongoDB;
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Connection bd Mongo
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    app.emit('Done.');
}).catch(e => console.log('Error connecting database.'));

//Create others dependencies ( express-session, helmet, csrf, path )
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flashMsg = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');

//My middlewares
const { middleware, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

//Use helmet
app.use(helmet());

//Use and config express urlencoded/static
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

//Config express-session
const sessionOptions = session({
    secret: process.env.SECRETSESSION,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, //7 Days save
        httpOnly: true
    }
})

//Use options session-express e inicialize connect-flash dependencie
app.use(sessionOptions);
app.use(flashMsg());

//Set views e views engine ( EJS )
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

//Use csrf security
app.use(csrf());

//Use my middlewares
app.use(middleware, checkCsrfError, csrfMiddleware);

//Use routes on my app
app.use(routes);

//Initialize when the signal sounds
app.on('Done.', () => {
    app.listen(3000, () => {
        console.log('http://localhost:3000');
        console.log('Server running on port: 3000!');
    })
})