const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://bee93:honeybee20!@reactex.fb4kacq.mongodb.net/ReactEx?retryWrites=true&w=majority', {
    useNewUrlParser : true, 
    useUnifiedTopology:true, 
    // useCreateIndex:true, 
    // useFindAndModify:false
}).then(()=>console.log('MongoDB Connected...'))
.catch((e)=>console.log(e))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})