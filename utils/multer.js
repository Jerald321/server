const multer = require("multer")
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Set upload directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + path.extname(file.originalname));
    }
});

const upload = multer({
     storage: storage,
     limits:{
        fileSize: 23*1000*1000
     },
     fileFilter:function(req,file,cb){
        let filetype = /jpeg|jpg|png/;
        let mimetype= filetype.test(file.mimetype)
        let extname =filetype.test( path.extname(file.originalname).toLowerCase())
     

     if(mimetype && extname){
       return cb(null,true)
     }

     cb(new Error("Invalid file type. Only JPEG, JPG, and PNG are allowed."));
    }
     }).single("image");

module.exports=  upload