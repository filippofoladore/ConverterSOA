const express = require('express')
const app = express();
const env = require('dotenv')
const mongoose = require('mongoose')

env.config()
app.use(express.json())
const routeAutenticazione = require('./routes/autenticazione')
const routeConverter = require('./routes/converter')
app.use('/user', routeAutenticazione)
app.use('/converter', routeConverter)

//online
// mongoose.connect(process.env.DB,  { useNewUrlParser: true, useUnifiedTopology: true  }  , () => console.log('Connected to MongoDB.'))

//offline
mongoose.connect('mongodb://localhost/users')
let db = mongoose.connection

db.once('open', function () {
    console.log('Connected to MongoDB.')
})
db.on('error', function (err) {
    console.log(err)
})


app.get('/', function (req, res) {
    res.send('Hello, welcome')
})

//settaggio porta
app.listen(3001, () => console.log('Server started on port 3000.'));


