const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true    
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})

module.exports=mongoose.model('contact',contactSchema)