const express = require('express')
const app = express()
const port = 5000
//body-parser 와 User 가져오기
const bodyParser = require('body-parser')
const config = require('./config/key')
const {User} = require("./models/User")

//body-parser 옵션주기
//Clinet가 보낸 application/x-www-form-urlencoded로 된 데이터를 분석해서 가져올 수 있도록 함
app.use(bodyParser.urlencoded({extended:true}))
//application/json 형태의 데이터 가져올 수 있게 함
app.use(bodyParser.json())

//mongoDB 연결
const mongoose = require('mongoose')
mongoose.set("strictQuery", false);
mongoose.connect(config.mongoURI, {
    useNewUrlParser : true, 
    useUnifiedTopology:true, 
    // useCreateIndex:true, 
    // useFindAndModify:false
}).then(()=>console.log('MongoDB Connected...'))
.catch((err)=>console.log(err))


//
app.get('/', (req, res) => {
  res.send('Hello dddddWorld!')
})

app.post('/register', (req, res)=>{
  //회원가입 할 때 필요한 정보들을 Client에서 가져오면 그것들을 데이터베이스에 넣어줌
  //만들어둔 유저모델을 가져옴 json 형태로 받은 데이터 들어있음
  //{
  //     id: "hello"
  //     password: "123"
  //}
  const user = new User(req.body)
  
  user.save((err, userInfo)=>{
    if(err) return res.json({success:false, err})
    return res.status(200).json({
      success:true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})