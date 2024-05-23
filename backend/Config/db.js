const mongoose = require("mongoose");

const connectDB = async() =>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        if(connect) console.log("connected");
    }catch(err){
        console.log("Error: ",err.message);
    }
}

module.exports = connectDB;