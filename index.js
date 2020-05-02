const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const app = express()

let RAMSTORAGE = []


app.post('/upload', upload.single('image'), function(req,res,next) {
    console.log('Harusnya udah ngeilat MIME originalnya')
    console.log(req.file)
    RAMSTORAGE.push({saved : req.file.filename,name : req.file.originalname.toLocaleLowerCase()})
    res.status(200).json({status : 'Success'})
})

app.get('/download', function(req,res,next) {
    let file = RAMSTORAGE.find(e => e.name.toLocaleLowerCase() === req.query.filename)
    if(!file){
        // NOT FOUND
        return res.status(404).json({status: 'failed'})
    }
    res.download(`${__dirname}/uploads/${file.saved}`, file.name)
})
console.log('Listening on 8000')
app.listen(8000)
