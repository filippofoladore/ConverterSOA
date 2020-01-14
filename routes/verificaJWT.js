const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const cookie = req.cookies
    const token = cookie.token
    //prendiamo il token dall'header e se non esiste (quindi chi sta cercando di accedere non ha effettuato il login) return errore 
   
    if (!token) return res.status(401).send('Accesso proibito')

    // //se ha un token bisogna verificarlo
    try {
        //si compara il token dell'header con il segreto
        const verificato = jwt.verify(token, process.env.TOKEN)
        //restituisce l'id
        req.user = verificato
        next()
    } catch (error) {
        res.status(400).send('Token non valido.')
    }
}

// il token viene assegnato alla fine del login all'utente nell'header
// la funzione middleware "verifica" viene aggiunta alle route protette