const User = require("../models/useModel");

//Importing the User model and bcryptjs library
const bcryptjs = require("bcryptjs");
//Function to securely hash a password
const securePassword = async(password)=>{
    try {
        //Hashing the password with a salt of 10 rounds
        const passwordHash = await bcryptjs.hash(password,10);
        return passwordHash;
    } catch(error){
        //Sending a 400 bad Request response if an error occurs
        res.status(400).send(error.message);
    }
}
//Controller function for registering user
const register_user = async(req, res)=>{
    try {
        //Securely hash the user's password
        const spassword = await securePassword(req.body.password);

        //Create a new ser instance using the User model
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:spassword,
            //Assuming you are using multer for file uploads and 'image' field is the filename
            image:req.file.filename,
            phone:req.body.phone,
            type:req.body.type
        });

        // Check if the user email is exists in database
        const userData = await User.findOne({email:req.body.email});
        if(userData){
            //Send a response indicating that the email is already in use
            res.status(200).send({success:false,msg:"This email is already exists"});
        }
        else{
            //save the new user data to the database
            const user_data = await user.save();
            //send a successful registration response with the user data
            res.status(200).send({success:true,data:user_data});
        }


    } catch (error) {
        // Send a 400 Bad Request response if an error occurs
        res.status(400).send(error.message)
    }
}

//login Method
const user_login = async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({ email:email});
        if(userData){
            const passwordMatch = await bcryptjs.compare(password,userData.password);
            if(passwordMatch){
                const userResult = {
                    _id:userData._id,
                    name:userData.name,
                    email:userData.email,
                    password:userData.password,
                    image:userData.image,
                    phone:userData.phone,
                    type:userData.type,
                }
                const response = {
                    success:true,
                    msg:"user Details",
                    data:userResult
                }
                res.status(200).send(response);
            }
            else{
                res.status(200).send({success:false, msg:"Login details are incorrect"});
            }
        }
        else{
            res.status(200).send({success:false, msg:"Login details are incorrect"});
        }
        
    } catch (error) {
        res.status(400).send(error.message)
    }

}

module.exports = {
    register_user,user_login
}