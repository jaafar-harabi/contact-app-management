const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
require('./config/connect')
const path = require('path')






const contactRouter=require('./routes/contact')
const userRouter=require('./routes/user')

app.use(cors())
app.use(express.json())
app.use('/api/v1/contact',contactRouter)
app.use('/api/v1/user',userRouter)
app.use(express.static(path.join(__dirname, './client/build')))
app.use('*',function(req,res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})



app.listen(process.env.port,()=>{console.log(`connected to port ${process.env.port}`)})