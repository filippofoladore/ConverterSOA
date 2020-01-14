const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const env = require('dotenv')

//validazione input
const Joi = require('@hapi/joi')

const registerValidation = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
})

const loginValidation = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
})


router.post('/register', async (req, res) => {
    //validazione
    try {
        const { err } = await registerValidation.validateAsync(req.body);
    }
    catch (err) { return res.status(400).send(err.details[0].message) }

    //check se user esiste già
    const esisteMail = await User.findOne({ email: req.body.email })
    if (esisteMail) return res.status(400).send("L'email esiste già")

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    //inserisci utente
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
    try {
        const newUser = await user.save()
        res.redirect(200, 'http://localhost:3001/loginView')
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res) => {
    //validazione
    try {
        const { err } = await loginValidation.validateAsync(req.body);
    }
    catch (err) { return res.status(400).send(err.details[0].message) }

    //check admin
    if (req.body.email == process.env.ADMINEMAIL && req.body.password == process.env.ADMINPASSWORD) {
        const user = await User.findOne({ email: req.body.email })
        const token = jwt.sign({ _id: user._id, admin: false }, process.env.TOKEN, { expiresIn: '7200000' })
        res.cookie('admin', true, { expires: new Date(Date.now() + 7200000), httpOnly: false });
        res.cookie('token', token, { expires: new Date(Date.now() + 7200000), httpOnly: false })
        res.cookie('logged', true, { expires: new Date(Date.now() + 7200000), httpOnly: false });
        res.redirect(200, 'http://localhost:3001/')
    } else {
        //controlla email
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).send("Email o password non corretta.")

        //controlla password
        const passwordValida = await bcrypt.compare(req.body.password, user.password)
        if (!passwordValida) return res.status(400).send("Email o password non corretta.")

        //crea token
        const token = jwt.sign({ _id: user._id, admin: false }, process.env.TOKEN, { expiresIn: '7200000' })
        //token header per il test in Postman
        res.header('token', token)
        //cookie valido per 20secondi
        //res.cookie('token', token ,{ expires: new Date(Date.now() + 20000), httpOnly: true })
        //cookie valido per 2ore
        res.cookie('admin', false, { expires: new Date(Date.now() + 7500000), httpOnly: false });
        res.cookie('token', token, { expires: new Date(Date.now() + 7500000), httpOnly: false })
        res.cookie('logged', true, { expires: new Date(Date.now() + 7500000), httpOnly: false });
        res.redirect(200, 'http://localhost:3001/')
    }

})

router.get('/logout', function(req, res){
    res.clearCookie('admin')
    res.clearCookie('token')
    res.clearCookie('logged')
    res.redirect('http://localhost:3001')
})


module.exports = router;