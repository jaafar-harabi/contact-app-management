const contact=require('../models/contact')

const add=async(req,res)=>{
    try{
        const newCreate=new contact({name:req.body.name,number:req.body.number,user:req.body.user})
        await newCreate.save()
        res.status(201).send({message:'Contact add it',success:true})

    }catch(err){
        console.log(err)
    }
}

const getById=async(req,res)=>{
    try{
        const data=await contact.find({user:req.params.id}).populate('user')
        res.send(data)

    }catch(err){
        console.log(err)
    }
}

const del=async(req,res)=>{
    try{
        const data = await contact.findByIdAndDelete({_id:req.params.id})
        res.send(data)
    }catch(err){
        console.log(err)
    }
}

const update=async(req,res)=>{
    try{
        const data = await contact.findByIdAndUpdate({_id:req.params.id},req.body)
        await data.save()
        res.send({message:'update success',success:true})
    }catch(err){
        console.log(err)
    }
}




module.exports={add,getById,del,update}