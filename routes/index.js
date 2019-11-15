// Used Brad Traversy node.js and passport video to learn https://github.com/bradtraversy/node_passport_login/blob/master

//bring in express
const express = require('express');
//to use express need a router
const router = express.Router();
//bring in authentication module
const { ensureAuthenticated } = require('../config/auth');


//whenever we want to create a route, use router.get
//creating homepage route that renders the welcome view
router.get('/', (req, res) => res.render('welcome'));

//Thankyou page
//path in ensureAuthenticated as a second parameter to ensure the route is protected by bringing in authentication middleware created in /config/auth.js. Add in { name: req.user.name } so when a user is logged in we can dynamically display their name
router.get('/thankyou', ensureAuthenticated, (req, res) => res.render('thankyou', {
  name: req.user.name
}));
//thankyou link if not authenticated for STYLING
// router.get('/thankyou', (req, res) => res.render('thankyou') )

//export module
module.exports = router;