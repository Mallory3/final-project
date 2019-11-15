// Used Brad Traversy node.js and passport video to learn https://github.com/bradtraversy/node_passport_login/blob/master


//bring in express
const express = require('express');
//bring in express layouts
const expressLayouts = require('express-ejs-layouts');
//bring in mongoose
const mongoose = require('mongoose')
//bring in flash
const flash = require('connect-flash')
//bring in session
const session = require('express-session')
//bring in passport
const passport = require('passport');
//require path module to deal with file paths
const path = require('path');


//initialize app variable with express
const app = express();

//PASSPORT CONFIG 
require('./config/passport')(passport);

//CONNECT TO DB
//need the mongoose code higher up, it is used to connect to db 

//envoke dotenv
require('dotenv').config(); 

//from TONY'S boilerplate code
//const uri takes DB_CONNECTION credidentials from .env file (used because github ignores it)
const db = process.env.DB_CONNECTION;
mongoose.connect(db,{ useUnifiedTopology: true,useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


//EJS Middleware
//expressLayouts needs to be above set viewengine or it wont work
app.use(expressLayouts);
//set viewengine to EJS
app.set('view engine', 'ejs');

//BODYPARSER
//we can now get data from our form with req.body
app.use(express.urlencoded({ extended: false}));

// EXPRESS SESSION MIDDLEWARE
//aquired from express session github
//TROUBLESHOOT: seems to not remember login status? If you refresh the browser you are prompted to login again. Perhaps a conflict with cashe middleware that protects authenticated pages?
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

//PASSPORT MIDDLEWARE
//from passportjs.com website
app.use(passport.initialize());
app.use(passport.session());

//CONNECT FLASH MIDDLEWARE
//gives us access to request.flash
app.use(flash());

//GLOBAL VARIABLES
// adding middleware so different flash messages can be different colors
//takes in three arguments, request response and next
app.use((req, res, next) => {
  // set global variables
  // custom middleware with global variables. We can call the success_msg and error_msg which will come from flash
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  //shows flash for login error
  res.locals.error = req.flash('error');
  next();
});

//CACHE MIDDLEWARE
//TROUBLESHOOTING
//Created middleware function with tutor(Linden) to solve issue of being able to hit the back button after logging out and access the thankyou page prior to reloading. Middleware function applies to the header of all pages, as seen in the Network tab in dev tools.
//from https://stackoverflow.com/questions/20429592/no-cache-in-a-nodejs-server
const nocache = (req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}
//envoke cache middleware
app.use(nocache);


//ROUTES
//add a route to pertain to .js files in routes folder
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/', require('./routes/article'));

//serve static assets
app.use(express.static(path.join(__dirname, 'assets')));

//catch all 404 errors 
app.use((req, res, next) => {
  res.status(404);
  res.send('404: File Not Found');
  next()
});

//create a PORT to run our app on
//process.env.PORT incase we deploy, otherwise port 3000 on our local host
const PORT = process.env.PORT || 3000;

//run a server, pass in port and console.log to make sure its running
app.listen(PORT, console.log(`Server started on port ${PORT}`));

//TO DO: Dive deeper into bootstrap and learn more about customizing styles on bootswatch.com as I was really enjoying playing with it; bring in a working mobile menu from bootswatch; learn how to create a middleware function that remembers the users IP/browser history and can keep them logged in when they revisit the page (expanding on the npm session module); extract all code from bootswatch and build a tool box with it that is independent from the bootswatch theme for css customization (I used js files to create and append elements (my API and images))

