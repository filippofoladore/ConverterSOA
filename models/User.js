const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String, required: true, min: 6, max: 255 },
    email: { type: String, required: true, min: 6, max: 255 },
    password: { type: String, required: true, min: 6, max: 1024 },
    admin: {type: Boolean},
    dataCreazione: { type: Date, default: Date.now }
}, { timestamps: true })

module.exports = mongoose.model('User', schema);