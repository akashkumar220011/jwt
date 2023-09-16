const mongoose = require("mongoose");
exports.connectMongoose = ()=> {
    mongoose.connect("mongodb://127.0.0.1:27017/ECOM")
    .then((e)=> console.log(`connected to mongoDB: ${e.connection.host}`))
    .catch((e)=>console.log(e));
};