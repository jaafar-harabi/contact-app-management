import React, { useState } from 'react'
import {
    Card,
    Input,

    Button,
    Typography,
  } from "@material-tailwind/react";
  import {NavLink,useNavigate} from 'react-router-dom'
  import axios from 'axios'
  import { useAuth } from '../context/Context';
  import toast from 'react-hot-toast';

 
 
const Login = () => {
  const [auth,setAuth]=useAuth()
  const navigate=useNavigate()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const handleSubmut=async(e)=>{
    e.preventDefault()
   
    try{
      const res=await axios.post('api/v1/user/login',{email,password})
      if (res.data && res.data.success){
        toast.success('Login success')
       
        setAuth({...auth,id:res.data._id,name:res.data.name,token:res.data.token})
        localStorage.setItem('auth',JSON.stringify(res.data))
        navigate('/')

      }
      else{
        toast.error("Invalid email or password")   
      }

    }catch(err){
      console.log(err)
    }
  }

  return (
    <>
      
    
    <Card color="transparent" shadow={false} className='items-center mt-20'>
    
    
    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmut} >
      <div className="mb-4 flex flex-col gap-6">
        <Input size="lg" label="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        <Input type="password" size="lg" label="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
      </div>
      
      <Button className="mt-6" fullWidth type='submit'>
        Login
      </Button>
      <Typography color="gray" className="mt-4 text-center font-normal">
        Don't have an account?{" "}
        <NavLink
          to="/register"
          className="font-medium text-blue-500 transition-colors hover:text-blue-700"
        >
          Register
        </NavLink>
      </Typography>
    </form>
  </Card>
  </>
  )
}

export default Login