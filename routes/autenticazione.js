const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
        res.send(newUser)
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

    //controlla email
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("Email o password non corretta.")

    //controlla password
    const passwordValida = await bcrypt.compare(req.body.password, user.password)
    if (!passwordValida) return res.status(400).send("Email o password non corretta.")

    //crea token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN)
    res.header('token', token).send(token)
  
})


module.exports = router;