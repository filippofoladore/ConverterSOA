const router = require('express').Router();
const fs = require('fs');
const env = require('dotenv')
const CloudmersiveConvertApiClient = require('cloudmersive-convert-api-client');
const defaultClient = CloudmersiveConvertApiClient.ApiClient.instance;
const verifica = require('./verificaJWT')
const bodyParser = require('body-parser')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const path = require('path')

var Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = process.env.API_CONVERT;
router.use(bodyParser());

router.get('/', verifica, (req, res) => {
    res.render('converter.html')
})

router.post('/doctopdf', multipartMiddleware, function (req, res) {
    var apiInstance = new CloudmersiveConvertApiClient.ConvertDocumentApi();

    const filePath = req.files.upload.path
    const download = 'doc_to_pdf_CONVERTED.pdf';
    var inputfile = Buffer.from(fs.readFileSync(filePath).buffer)

    var post = function (error, data, response) {
        if (error) { console.log(error) }
        else {
            console.log('Writing on file...')
            fs.writeFile(download, data, scarica)
        }
    }

    function scarica() {
        console.log('Downloading file...')
        try { res.download(download); }
        catch (err) { console.log(err) }
        setTimeout(() => {
            const p = path.join(__dirname, '../doc_to_pdf_CONVERTED.pdf')
            fs.unlink(p, (err) => {
                if (err) { console.log(err) }
            })
        }, 2000);

    }

    apiInstance.convertDocumentDocxToPdf(inputfile, post)
})

router.post('/pdftodoc', multipartMiddleware, function (req, res) {
    var apiInstance = new CloudmersiveConvertApiClient.ConvertDocumentApi();
    const filePath = req.files.upload.path
    const download = 'pdf_to_doc_CONVERTED.docx';
    var inputFile = Buffer.from(fs.readFileSync(filePath).buffer)

    var post = function (error, data, response) {
        if (error) { console.log(error) }
        else {
            console.log('Writing on file...')
            fs.writeFile(download, data, scarica)
        }
    }

    function scarica() {
        console.log('Downloading file...')
        try { res.download(download); }
        catch (err) { console.log(err) }
        setTimeout(() => {
            const p = path.join(__dirname, '../pdf_to_doc_CONVERTED.docx')
            fs.unlink(p, (err) => {
                if (err) { console.log(err) }
            })
        }, 2000);
    }

    apiInstance.convertDocumentPdfToDocx(inputFile, post)
})

router.post('/xlsxtopdf', multipartMiddleware, function (req, res) {
    var apiInstance = new CloudmersiveConvertApiClient.ConvertDocumentApi();
    const filePath = req.files.upload.path
    const download = 'xlsx_to_pdf_CONVERTED.pdf';
    var inputFile = Buffer.from(fs.readFileSync(filePath).buffer)

    var post = function (error, data, response) {
        if (error) { console.log(error) }
        else {
            console.log('Writing on file...')
            fs.writeFile(download, data, scarica)
        }
    }

    function scarica() {
        console.log('Downloading file...')
        try { res.download(download); }
        catch (err) { console.log(err) }
        setTimeout(() => {
            const p = path.join(__dirname, '../xlsx_to_pdf_CONVERTED.pdf')
            fs.unlink(p, (err) => {
                if (err) { console.log(err) }
            })
        }, 2000);
    }

    apiInstance.convertDocumentXlsxToPdf(inputFile, post);
})

router.post('/mergepdf', multipartMiddleware, function (req, res) {
    var apiInstance = new CloudmersiveConvertApiClient.MergeDocumentApi();
    const filePath_1 = req.files.upload[0].path
    const filePath_2 = req.files.upload[1].path
    const download = 'merged_pdf.pdf';
    var inputFile_1 = Buffer.from(fs.readFileSync(filePath_1).buffer)
    var inputFile_2 = Buffer.from(fs.readFileSync(filePath_2).buffer)

    var post = function (error, data, response) {
        if (error) { console.log(error) }
        else {
            console.log('Writing on file...')
            fs.writeFile(download, data, scarica)
        }
    }

    function scarica() {
        console.log('Downloading file...')
        try { res.download(download); }
        catch (err) { console.log(err) }
        setTimeout(() => {
            const p = path.join(__dirname, '../merged_pdf.pdf')
            fs.unlink(p, (err) => {
                if (err) { console.log(err) }
            })
        }, 2000);
    }

    apiInstance.mergeDocumentPdf(inputFile_1, inputFile_2, post);
})

router.post('/mergedoc', multipartMiddleware, function (req, res) {
    var apiInstance = new CloudmersiveConvertApiClient.MergeDocumentApi();
    const filePath_1 = req.files.upload[0].path
    const filePath_2 = req.files.upload[1].path
    const download = 'merged_doc.docx';
    var inputFile_1 = Buffer.from(fs.readFileSync(filePath_1).buffer)
    var inputFile_2 = Buffer.from(fs.readFileSync(filePath_2).buffer)

    var post = function (error, data, response) {
        if (error) { console.log(error) }
        else {
            console.log('Writing on file...')
            fs.writeFile(download, data, scarica)
        }
    }

    function scarica() {
        console.log('Downloading file...')
        try { res.download(download); }
        catch (err) { console.log(err) }
        setTimeout(() => {
            const p = path.join(__dirname, '../merged_doc.docx')
            fs.unlink(p, (err) => {
                if (err) { console.log(err) }
            })
        }, 2000);
    }

    apiInstance.mergeDocumentDocx(inputFile_1, inputFile_2, post);
})

router.post('/pptxtopdf', multipartMiddleware, function (req, res) {
    var apiInstance = new CloudmersiveConvertApiClient.ConvertDocumentApi();
    const filePath = req.files.upload.path
    const download = 'pptx_to_pdf_CONVERTED.pdf';
    var inputFile = Buffer.from(fs.readFileSync(filePath).buffer)

    var post = function (error, data, response) {
        if (error) { console.log(error) }
        else {
            console.log('Writing on file...')
            fs.writeFile(download, data, scarica)
        }
    }

    function scarica() {
        console.log('Downloading file...')
        try { res.download(download); }
        catch (err) { console.log(err) }
        setTimeout(() => {
            const p = path.join(__dirname, '../pptx_to_pdf_CONVERTED.pdf')
            fs.unlink(p, (err) => {
                if (err) { console.log(err) }
            })
        }, 2000);
    }

    apiInstance.convertDocumentPptxToPdf(inputFile, post);
})

router.post('/pdftopptx', multipartMiddleware, function (req, res) {
    var apiInstance = new CloudmersiveConvertApiClient.ConvertDocumentApi();
    const filePath = req.files.upload.path
    const download = 'pdf_to_pptx_CONVERTED.pptx';
    var inputFile = Buffer.from(fs.readFileSync(filePath).buffer)

    var post = function (error, data, response) {
        if (error) { console.log(error) }
        else {
            console.log('Writing on file...')
            fs.writeFile(download, data, scarica)
        }
    }

    function scarica() {
        console.log('Downloading file...')
        try { res.download(download); }
        catch (err) { console.log(err) }
        setTimeout(() => {
            const p = path.join(__dirname, '../pdf_to_pptx_CONVERTED.pptx')
            fs.unlink(p, (err) => {
                if (err) { console.log(err) }
            })
        }, 2000);
    }

    apiInstance.convertDocumentPdfToPptx(inputFile, post);
})


module.exports = router;