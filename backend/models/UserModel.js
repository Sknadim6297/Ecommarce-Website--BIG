const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }, 
    password: {
        type: String,
        required: true
    },
    profilePic:{
        type:String
    },
    role : {
        type : String,
    }
},
{
    timestamps:true
});

const userModel=mongoose.model('User',UserSchema);
module.exports=userModel;