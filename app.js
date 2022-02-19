  // Bugs:
  // How to fix autocomplete without clearing cache
  const express = require('express');
  const app = express();

  const bodyparser = require('body-parser');
  app.use(bodyparser.urlencoded({ extended: true }))
  app.use(bodyparser.json());

  const path = require('path')
      // console.log(path.join(__dirname,'/public'))
  app.set('view engine', 'pug')
  staticPath = path.join(__dirname, '/views')
      // app.use(express.static(staticPath))
  app.set('views', staticPath)
      //For applying style.css in pug files
  app.use(express.static(__dirname + '/public'));

  //                         //DB Connectitvity in database/db folder

  //Method -2
  const mongoose = require('mongoose');
  var url = 'mongodb://localhost:27017/forms';
  const { User } = require('./database/db');
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => { console.log("MongoDB Connection Successful") })
      .catch(() => { console.log("No DB Connection") })


  //ENDPOINTS

  app.post('/sign_up', (req, res) => {
      registerUser(req, res)
  })

  app.post('/login', (req, res) => {
      verifyUser(req, res);
      //res.render('home')
  })

  app.get('/', (req, res) => {
      //res.send("Working")
      res.render('home')
  })

  app.get('/signup', (req, res) => {
      res.render('signup')
  })

  app.get('/login', (req, res) => {
      res.render('login')
  })

  app.get('/signup_success', (req, res) => {
      res.render('signup_success')
  })

  //Server Listen
  app.listen(80, () => { console.log("Server listening at port 80") })

  //Functions
  async function verifyUser(req, res) {
      Email = req.body.email;
      Password = req.body.password;
      User.findOne({ email: Email }, (err, user) => {
          if (!err) {
              if (user) {
                  console.log("User Exists");
                  console.log(user.password);
                  if (user.password === Password) {
                      console.log("User Verified");
                      updateHomePage(user.name, err)
                      res.render('home')
                  } else {
                      console.log("Invalid password")
                      res.render('login')
                  }
              } else {
                  console.log("No such user exists")
                  res.render('signup')
              }
          } else
              console.log("Error is  " + err);
      })

  }

  function updateHomePage(userName, err) {

  }

  function registerUser(req, res) {
      let newUser = new User({
          name: req.body.name,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          password: req.body.password
      });
      newUser.save(function(err) {
          if (err)
              console.log("Error is " + err);
          else
              res.redirect('signup_success')
      })
  }