const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')
app.use(express.json())
app.use(bodyparser.json());
app.use(cors())
mongoose.connect("mongodb://localhost:27017/Digimantraproject1")

//routes
app.use('/auth', require('./routes/auth'))
app.use('/contact', require('./routes/contact'))



app.listen(5000, ()=>{console.log("Server listing at port 5000")})