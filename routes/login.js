'use strict';
// let jwt = require('jsonwebtoken');
let User = require('../models/user');
let auth = require('../lib/authenticate');

module.exports = (router) => {
  router.get('/login', auth);
  router.post('/login', (req, res) => {
    console.log(req.headers.authorization);
    let authorizationArray = req.headers.authorization.split(' ');
    let method = authorizationArray[0];
    let base64ed = authorizationArray[1];
    let authArray = new Buffer(base64ed, 'base64').toString().split(':');
    let name = authArray[0];
    let password = authArray[1];
    console.log(authArray);
    console.log(method);
    console.log(name);
    // parse based on basic or whatever method
    User.findOne({name: name}, (err, user) => {
      console.log('in user find');
      if (err) res.json({err: 'errors'});
        let valid = user.compareHash(password)
      if (!valid) {
        return res.json({status: 'failure'})
      }
      // generate and return the token
      res.json({token: user.generateToken()});
    });
  });
};

// curl -X POST -u user6:123 http://localhost:3000/public/login

//curl -X GET -H 'authorization: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NmYyZTg2ZjNlZjk1YTcyMzk0NDk5NzAiLCJpYXQiOjE0NTg3NTk4MTN9.FnrgIQ3xDcuWdFOlktrJj5VnR10n2bHjjcG9Qa0vASI' http://localhost:3000/public/login
