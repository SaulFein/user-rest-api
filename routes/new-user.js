'use strict';
// let jwt = require('jsonwebtoken');
let User = require('../models/user');

module.exports = (router) => {
  router.post('/new-user', (req, res) => {
    // res.json(req.body);
    var newUser = new User(req.body);
    console.log(newUser);
    newUser.save((err, user) => {
      if (err) res.json({err: 'errors'});
      res.json(user);
    });
  });
};


//curl -H "Content-Type: application/json" -X POST -d '{"name":"user6","password":"123"}' http://localhost:3000/public/new-user

//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NmYxZWUwOWRiY2M1MmQ2MzI1ZDhjM2IiLCJpYXQiOjE0NTg2OTU3Mjh9.U7Jb5pOEDUU4YFInRuolaHVwkbym_Lh28m5iJ7Ox1Pc

//curl -X GET -H 'Authorization token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NmYxZWUwOWRiY2M1MmQ2MzI1ZDhjM2IiLCJpYXQiOjE0NTg2OTU3Mjh9.U7Jb5pOEDUU4YFInRuolaHVwkbym_Lh28m5iJ7Ox1Pc' http://localhost:3000/public/login
