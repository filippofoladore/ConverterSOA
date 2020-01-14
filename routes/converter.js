const router = require('express').Router();
const fs = require('fs');
const env = require('dotenv')
const CloudmersiveConvertApiClient = require('cloudmersive-convert-api-client');
const defaultClient = CloudmersiveConvertApiClient.ApiClient.instance;
const verifica = require('./verificaJWT')
const bodyParser = require('body-parser')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = process.env.API_CONVERT;
router.use(bodyParser());

router.get('/', verifica, (req, res) => {
    res.render('converter.html')
})

router.post('/', (req, res) => {
    console.log(req.files)
    console.log('ciao')
})

router.post('/doctopdf', multipartMiddleware, function (req, res) {
    var apiInstance = new CloudmersiveConvertApiClient.ConvertDocumentApi();
    // const filePath = '/Users/Filippo/Documents/ConverterSOA/files/doctopdf.docx'
    // const fileDest = '/Users/Filippo/Documents/ConverterSOA/files/newPDFDocument.pdf'

    const filePath = req.files.upload.path
    const download = 'C:\Users\Filippo\Downloads\doctopdf.pdf';
    var inputfile = Buffer.from(fs.readFileSync(filePath).buffer)
    // const download = '';
    var callback = function (error, data, response) {
        if (error) {
            console.log(error)
        } else {
            console.log('Writing on file...')
            fs.writeFile(download, data, cb)
        }
    }

    function cb() {
        console.log('Downloading file...')
        res.download(download)
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