var express = require('express')
// const fs = require('fs')
var bodyParser = require('body-parser')

var router = require('./routers/newsRouter')

var app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(router)


app.listen(3000, () => {
  console.log('port created successfully!')
})