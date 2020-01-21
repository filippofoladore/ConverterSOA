const User = require('../models/User')

module.exports = function (req, res, next) {
    const admin = req.cookies.userID
    if (admin == undefined) res.redirect('http://localhost:3001/')
    if (admin == null) res.redirect('http://localhost:3001/')

    User.findOne({ "_id": admin }, 'admin', function (err, doc) {
        if (err) {
            res.send("Qualcosa è andato storto")
        } else {
            var check = doc.admin
            if (!check) {
                res.redirect('http://localhost:3001/')
            } else {
                next()
            }
        }
    })
}