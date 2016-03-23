'use strict'
let jwt = require('jsonwebtoken')
let User = require('../models/user')

module.exports = (router) => {
  router.post('/new-user', (req, res) => {
    // res.json(req.body);
    var newUser = new User(req.body);
    console.log(newUser);
    newUser.save((err, user) => {
      res.json(user);
    })
  })
}


//curl -H "Content-Type: application/json" -X POST -d '{"name":"user3","password":"123"}' http://localhost:3000/public/new-user
