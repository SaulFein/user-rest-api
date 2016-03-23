'use strict'
let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let mongoose = require('mongoose')

let publicRouter = express.Router()
let apiRouter = express.Router()

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/db');



require('./routes/login')(publicRouter) //dependency injection
require('./routes/new-user')(publicRouter)

app.use(bodyParser.json())
app.use('/public', publicRouter)
//app.use('/api', require('./lib/authenticate'))
//app.use('/api', apiRouter)

app.listen(3000, () => {
  console.log('server up');
})

//curl -X POST -H 'Authorization: basic name:password' http://localhost:3000/public/login

//curl -X POST -u myusername:mypassword http://localhost:3000/public/login
