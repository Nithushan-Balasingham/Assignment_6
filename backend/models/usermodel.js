const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter the First Name"]
    },
    email:{
        type:String,
        required:[true,"Please Enter the Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter the Password"]
    },
},{
    timestamps:true
})
module.exports = mongoose.model("User",userSchema)