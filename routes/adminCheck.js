module.exports = function (req, res, next) {
    const admin = req.cookies.admin
    //prendiamo il token dall'header e se non esiste (quindi chi sta cercando di accedere non ha effettuato il login) return errore 
    if (admin == 'false' || admin == undefined) {
        res.redirect('http://localhost:3001/')
    } else {
        next()
    }

}