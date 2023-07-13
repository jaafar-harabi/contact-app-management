const user = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const login = async(req,res)=>{
    try{
        const verifMail= await user.findOne({email:req.body.email})
        if (!verifMail){
            return res.send({message:'invalid email or password',success:false})
        }

        const verifPass = bcrypt.compareSync(req.body.password,verifMail.password)
        if (!verifPass){
            return res.send({message:'invalid email or password'})
        }

        const token = jwt.sign({_id:verifMail._id,name:verifMail.name},process.env.key_secret)
        res.send({token:token,_id:verifMail._id,name:verifMail.name,success:true,message:'Login success'})
        
    }catch(err){
        console.log(err)
    }
}

const register = async(req,res)=>{
    try{
        const verifMail= await user.findOne({email:req.body.email})
        if (verifMail){
            return res.send({message:'Email already exist',success:false})
        }

        const data = new user(req.body)
        data.password=bcrypt.hashSync(req.body.password,10)
        await data.save()
        res.send({message:'Register success',success:true})

    }catch(err){
        console.log(err)
    }
}


module.exports={login,register}