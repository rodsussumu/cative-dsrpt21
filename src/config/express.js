const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
routes(app)

module.exports = app;