const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors')

app.use(cors())
let RAMSTORAGE = []


// Put these statements before you define any routes.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/upload', upload.single('image'), function(req,res,next) {
    if(req.file){
        console.log('Harusnya udah ngeilat MIME originalnya')
        console.log(req.file)
        RAMSTORAGE.push({
            saved : req.file.filename,
            gambar : req.file.originalname.toLocaleLowerCase(),
            data : {...req.body}
        })
    }
    res.status(200).json({status : 'Success', Data : {...req.body, files : req.file}})
})

app.get('/download', function(req,res,next) {
    let file = RAMSTORAGE.find(e => e.gambar.toLocaleLowerCase() === req.query.filename)
    if(!file){
        // NOT FOUND
        return res.status(404).json({status: 'failed'})
    }
    res.download(`${__dirname}/uploads/${file.saved}`, file.gambar)
})

app.get('/list', function(req,res){
    res.status(200).json({status: 'Success', Data: RAMSTORAGE})
})

console.log('Listening on 8000')
app.listen(8000)
