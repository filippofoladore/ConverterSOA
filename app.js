var path = require('path')
const express = require('express')
const app = express();
const env = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require("cookie-parser");
const checkAdmin = require('./routes/adminCheck')
const User = require('./models/User')


app.use(cookieParser());

env.config()
app.use(express.json())
const routeUser = require('./routes/autenticazione')
const routeConverter = require('./routes/converter')
app.use('/user', routeUser)
app.use('/converter', routeConverter)

//settaggio view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'public')))

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to MongoDB.'))

app.get('/', function (req, res) {
    res.render('index.html');
})

app.get('/loginView', function (req, res) {
    res.render('loginView.html')
})

app.get('/registerView', function (req, res) {
    res.render('registerView.html')
})

app.get('/manage', checkAdmin, function (req, res) {
    res.render('manage.html')
})

app.get('/getNodes', checkAdmin, function (req, res) {
    User.find({ _id: { $ne: process.env.ADMINID } },
        (err, result) => {
            if (err) { console.log(err) }
            res.json(result)
        }
    );
})

app.post('/getAdminValue', function (req, res) {
    User.findOne({ "_id": req.body._id }, 'admin', function (err, doc) {
        if (err) {
            res.send("Qualcosa è andato storto")
        } else {
            res.send(doc)
        }
    })
})

//settaggio porta
app.listen(3001, () => console.log('Server started on port 3000.'));



