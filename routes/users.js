// Used Brad Traversy node.js and passport video to learn https://github.com/bradtraversy/node_passport_login/blob/master


//bring in express
const express = require('express');
//to use express need a router
const router = express.Router();
//bring in bcryptjs
const bcrypt = require('bcryptjs');
//bring in passport
const passport = require('passport');

//bring in our model so we can call methods on User
const User = require('../models/Users');

//LOGIN PAGE
//renders login.ejs file in views folder
router.get('/login', (req, res) => res.render('login'));

//REGISTER PAGE
//enders subscribe.ejs file in views folder
router.get('/subscribe', (req, res) => res.render('subscribe'));

//REGISTER HANDLE
router.post('/subscribe', (req, res) => {
  //test
  console.log(req.body);
  //pull things out of request.body
  // const {name, email, password, password2 } = req.body
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;
  const adult = Boolean(req.body.adult);
  //validation
  //initialize an array called errors
  let errors = []
  
  //check required fields (VALIDATION)
  //if no name, email, passowrd or password2 filled in take errors and push onto it a message that says please fill in all fields
  if(!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields'});
  }

  //check passwords match
  //if password does not equal password2 take errors and push on to it a message that says password do not match
  if(password !== password2) {
    errors.push({ msg: 'Passwords do not match'});
  }

  //check password is at least 6 characters long
  //if password length is not at least 6 characters long take errors and push on to it a message that says Password must be at least 6 characters long
  if(password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters long'});
  }
  //if errors.length is greater than 0, that means we have an issue and we want to rerender the registration form and pass in variables. It will loop through and pass errors as well as look at the variables values to ensure entire form is not cleared when there is an error
  if(errors.length > 0) {
    res.render('subscribe', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    // Validation passed then..
    //Make sure the user is not already registerd
    //findOne is a mongoose model that finds one record with the query email = email. Returns a promise .then that gives us the user and we want to check for that user. If there is a user we want to rerender the register form and send an error
    User.findOne({ email: email })
      .then(user => {
        if(user) {
          //user exisits
          errors.push({msg: "Email is already registered"})
          res.render('subscribe', {
            errors,
            name,
            email,
            password,
            password2
          });
      } else {
        //if there isn't a user, then we need to create a new one and use bcrypt to encrypt the password
        //when you have a model and you want to create a new user, you want to use the new keyword. Then you want to pass in the values
        const newUser = new User({
          name,
          email,
          password,
          adult
        });
        //test
        console.log(newUser)
        //Hash password so password is encrypted, not in plain text
        //genSalt is a bcrypt function that passes in a salt argument
        bcrypt.genSalt(10, (error, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          //set password to hashed
          newUser.password = hash;
          //save user (gives us a promise)
          newUser.save()
            // if user gets saved, redirect to login page
            .then(user => {
              // creates success message
              req.flash('success_msg', 'You are now registered and can login');
              //redirects to login page
              res.redirect('/users/login');
            })
            // if it gives us an error, console.log it
            .catch(err => console.log(err));
        }))
      }
  });
}
});

//LOGIN HANDLE MIDDLEWARE
//handle a post request for users/login after login form submission
//passport.authenticate a local strategy. If login is a success, redirect to thankyou page. If login a failure, redirect back to login page with a flash message.
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/thankyou',
    failureRedirect: '/users/login',
    failureFlash: true
  }) (req, res, next);
});

//LOGOUT HANDLE
//logging out with calling request.logout using the passport middleware for the function. Then send flash message and a redirect
router.get('/logout', (req, res) => {
req.logout();
req.flash('success_msg', 'You are logged out');
res.redirect('/users/login')
});

//EXPORT MODULE
module.exports = router;