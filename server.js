const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require("body-parser");
const multer  = require('multer');
const path = require('path');

app.use(bodyParser.urlencoded({extended: true}));
app.set('test connect');
app.set('view engine', 'ejs');


mongoose.connect('mongodb+srv://alex:12345qwerty@cluster0.ugkt3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const notesSchema = {
    FirstName:String,
    LastName:String,
    email:String,
    image: String,

}

const Note = mongoose.model("Note", notesSchema);

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(null,file.filename + '-' + Date.now()+ path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).single('file');

app.get('/', (req, res) => {
    Note.find({}, function(err,notes){
        res.render('index', {
            notesList:notes,
        })
    })
});

app.post('/uploads', upload, function (req, res, next) {
    var imagefile=req.file.filename;
    var success = req.file.filename + " uploaded successfully ";

    var imageDetails= new uploadModel({
        imagename:imagefile
    });
    imageDetails.save(function (err,doc) {
        if(err) throw err;
    })
    imageData.exec(function (err,data) {
        if(err) throw err;
        res.render('upload file', {title: 'upload file', records:data });
    })

});

app.get('/upload',function (req,res,next) {
    imageData.exec(function (err, data) {
        if (err) throw err;
        res.render('upload file', {title: 'upload file', records: data});

    })
})

app.post('/', upload, (req,res,next) => {
    let newNote = new Note({
        FirstName:req.body.FirstName,
        LastName:req.body.LastName,
        email:req.body.email,
        image:req.file.filename,
    })
    newNote.save();
    res.redirect('/');
});

app.listen(3000, function () {
    console.log('server is running ')
});
