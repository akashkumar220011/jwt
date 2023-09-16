const express = require('express')
const user_route = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

//Configuring middleware for parsing json and url- encoded data
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));



//jab v koi data jaye public folder se api me to wo accessible honi chahiye
user_route.use(express.static('public'));

//Configuring Multer for file uploads
const multerStorage = multer.diskStorage({
    destination:function(req,file,cb){
        //Specify the destination folder for uploaded files
        cb(null,path.join(__dirname,'../public/userImages'),function(error,success){
            if(error) throw error
        });
    }, 
    filename:function(req,file,cb){
        //Generate a unique filename for the uploaded file 
        const name = Date.now()+'+'+file.originalname;
        cb(null, name, function(error1,success1){
            if(error1) throw error1
        })

    }
});

//Create a Multer instance with the defined storage configuration
const upload = multer({storage:multerStorage});
//Importing the user controller module
const user_controller = require("../controllers/userController");
//register url se jo image aaygi use hm get kra rhe h
user_route.post('/register',upload.single('image'),user_controller.register_user);

user_route.post('/login',user_controller.user_login);

module.exports = user_route;