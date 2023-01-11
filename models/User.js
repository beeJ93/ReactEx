const mongoose = require('mogoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        maxlenght:50
    },
    email:{
        type:String,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        minlenght:5
    },
    lastname:{
        type:String,
        maxlenght:50
    },
    role:{
        type:Number,
        default:0
    },
    image:String,
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }
})

const User = mongoose.model('User', userSchema)

//외부에서 사용할 수 있게 exports
module.exports={User}