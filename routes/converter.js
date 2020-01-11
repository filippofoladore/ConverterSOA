const router = require('express').Router();
const fs = require('fs');
const env = require('dotenv')
const CloudmersiveConvertApiClient = require('cloudmersive-convert-api-client');
const defaultClient = CloudmersiveConvertApiClient.ApiClient.instance;
const verifica = require('./verificaJWT')

var Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = process.env.API_CONVERT;

router.get('/', verifica, (req, res) => {
    res.json({ contents: [{ user: req.user, password: req.user.name }, { title: "DOC to PDf", link: "localhost:3000/converter/doctopdf" }, { title: "PDF to DOC", link: "localhost:3000/converter/pdftodoc" }] })
})

router.get('/doctopdf', verifica, function (req, res) {
    var apiInstance = new CloudmersiveConvertApiClient.ConvertDocumentApi();
    const filePath = '/Users/Filippo/Documents/ConverterSOA/files/doctopdf.docx'
    const fileDest = '/Users/Filippo/Documents/ConverterSOA/files/newPDFDocument.pdf'
    var inputfile = Buffer.from(fs.readFileSync(filePath).buffer)

    var callback = function (error, data, response) {
        if (error) {
            console.log(error)
        } else {
            console.log('Writing on file...')
            fs.writeFile(fileDest, data, cb)
        }
    }

    function cb() {
        console.log('Downloading file...')
        res.download(fileDest)
    }

    apiInstance.convertDocumentDocxToPdf(inputfile, callback)

})

router.get('/pdftodoc', verifica, function (req, res) {
    var apiInstance = new CloudmersiveConvertApiClient.ConvertDocumentApi();
    const filePath = '/Users/Filippo/Documents/ConverterSOA/files/pdftodoc.pdf'
    const fileDest = '/Users/Filippo/Documents/ConverterSOA/files/newDOCDocument.docx'
    var inputfile = Buffer.from(fs.readFileSync(filePath).buffer)

    var callback = function (error, data, response) {
        if (error) {
            console.log(error)
        } else {
            console.log('Writing on file...')
            fs.writeFile(fileDest, data, cb)
        }
    }

    function cb() {
        console.log('Downloading file...')
        res.download(fileDest)
    }

    apiInstance.convertDocumentPdfToDocx(inputfile, callback)
})

module.exports = router;