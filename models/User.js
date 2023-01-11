const mongoose = require('mongoose');
//암호화를 위해 bcrypt 임포트
const bcrypt = require('bcrypt');
//salt를 이용하여 비밀번호를 암호화. salt생성
const saltRounds = 10;


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

userSchema.pre('save', function(next){
    var user = this;
    //비밀번호 암호화는 비밀번호가 변경 될 때만 실행되어야 하므로
    //if문으로 구분해줌
    if(user.isModified('password')){
        //비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                // hash = 암호화된 비밀번호 
                if(err) return next(err)
                user.password = hash
                next();
            });
        });   
    } 
})

const User = mongoose.model('User', userSchema)

//외부에서 사용할 수 있게 exports
module.exports={User}