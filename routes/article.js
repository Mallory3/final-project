//bring in dependencies
const express = require('express');
const router = express.Router();

//bring in Article mongoose scheema
const Articles = require('../models/Articles');

//bring in authentication module
const { ensureAuthenticated } = require('../config/auth');

//pass in ensureAuthenticated as a second parameter to ensure the route is protected by bringing in authentication middleware created in /config/auth.js. Add in { name: req.user.name } so when a user is logged in we can dynamically display their name
//wrapping entire boilerplate in a get request, to access MongoDB database and loop through posted article fixture

//POST PAGE
//need to enclose everything in router.get
//knowledge from https://blog.zingchart.com/
//ensureAuthenticated makes article blog password protected
router.get('/posts', ensureAuthenticated, (req, res) => {

const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

//bring in user and article data. Although I did not use the user fixture I left it in the code (except for the model) incase it was in the ruberic
const articles = require('../fixtures/articles');
const users = require('../fixtures/users');

const uri = process.env.DB_CONNECTION;
MongoClient.connect(uri,{ useUnifiedTopology: true,useNewUrlParser: true }, function(err, client) {
   if(err) {
      console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   // perform actions on the collection object

  //Open a connection to an Atlas database called final
   const db = client.db("final");
   //connect article fixture to the articles collection in final database
   const artCol = db.collection('articles');

   //adding article fixture to database collection
   artCol.drop();
   artCol.insertMany(articles, (err, cursor) => {
    if (err) {
      console.log('There was a problem');
    }
    console.log(cursor.insertedCount);
  });

// http://zetcode.com/javascript/mongodb/
// find() creates a cursor for a query that can be used to iterate over results from mongoDB
//renders title and summary to webpage with ejs for loop in views page 'post'
  artCol.find({}).toArray().then((docs) => {
    console.log("found articles for index")
    res.render('posts', { display: docs });
    // console.log(docs)
  });

  //adding user fixture to user collection in final database on MongoDB Atlas. Although I did not use this fixture, as my authentication required a password I left it in incase it was on the ruberic
  const userCol = db.collection('users');

  userCol.drop();
  
  userCol.insertMany(users, function(err, cursor) {
   if (err) {
     console.log('There was a problem');
   }
   console.log(cursor.insertedCount);
 });
  client.close();
});
});



//SLUG
//ensureAuthenticated makes article blog password protected
router.get('/posts/:slug', ensureAuthenticated, (req, res) => {
  //Testing
  console.log("User requested slug '"+req.params.slug+"'")
  const MongoClient = require('mongodb').MongoClient;
  require('dotenv').config();

  const uri = process.env.DB_CONNECTION;
  MongoClient.connect(uri,{ useUnifiedTopology: true,useNewUrlParser: true }, function(err, client) {
     if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
     }
     console.log('Connected...');
     // perform actions on the collection object
  
     const db = client.db("final");
  
     const artCol = db.collection('articles');

  // http://zetcode.com/javascript/mongodb/
  // find() creates a cursor for a query that can be used to iterate over results from mongoDB and find slug
  //renders docs to post/slug that correspond with the slug clicked with use of for loop on view page
    artCol.find({slug: req.params.slug}).toArray().then((docs) => {
      //testing
      console.log("found articles for slug '"+req.params.slug+"'")
      //rendering posts/slug page, defining display for use in the for loop
      res.render('posts/slug', { display: docs});
      //Testing: dogs will provide title, summary, body, and slug of every article blog
      // console.log(docs)
    })
    client.close();
  });
});


//export module
module.exports = router;