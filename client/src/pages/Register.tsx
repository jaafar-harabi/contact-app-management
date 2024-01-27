import React, { useState } from 'react'
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
import {NavLink} from 'react-router-dom'
import {z,ZodType} from "zod";
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


  type formData={
    name:string,
    email:string,
    password:string,
    confirmPassword:string
  }
  

const Register = () => {
  const navigate=useNavigate()
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

    const schema : ZodType<formData> = z.object({
        name: z.string().min(2).max(30),
        email: z.string().email(),
        password:z.string().min(5).max(20),
        confirmPassword:z.string().min(5).max(20)


    }).refine((data)=> data.password === data.confirmPassword,{
        message:"password do not match",
        path:["confirmPassword"]
    })

    const {register,handleSubmit,formState:{errors} } = useForm<formData>({resolver:zodResolver(schema)})

    const submitData=async(e:any)=>{
     
        try{
         
          const res = await axios.post('api/v1/user/register',{name,email,password})
          if (res.data && res.data.success ){
            toast.success(res.data.message)
            
            navigate('/login')
          }
          else{
            toast.error(res.data.message)
            navigate('/register')
          }


          
        }catch(err){
          console.log(err)
        }

    }
  return (
    <>
    <Toaster />
    <Card color="transparent" shadow={false} className='items-center mt-20' >
       
    
    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(submitData)} >
      <div className="mb-4 flex flex-col gap-6">
        <Input size="lg" label="Name"  {...register("name")} value={name} onChange={(e)=>{setName(e.target.value)}} />
        {errors.name && <span> {errors.name.message} </span>}
        <Input size="lg" label="Email" {...register("email")} value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        {errors.email && <span> {errors.email.message} </span>}
        <Input type="password" size="lg" label="Password" {...register("password")} value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        {errors.password && <span> {errors.password.message} </span>}
        <Input type="password" size="lg" label="Confirm Password" {...register("confirmPassword")}/>
        {errors.confirmPassword && <span> {errors.confirmPassword.message} </span>}
      </div>
      
      <Button className="mt-6" fullWidth type='submit'>
        Register
      </Button>
      <Typography color="gray" className="mt-4 text-center font-normal">
        Already have an account?{" "}
        <NavLink
          to="/login"
          className="font-medium text-blue-500 transition-colors hover:text-blue-700"
        >
          Sign In
        </NavLink>
      </Typography>
    </form>
  </Card>
  </>
  )
}

export default Register