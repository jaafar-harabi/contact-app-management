import React from 'react'
import { useAuth } from '../context/Context'
import { Button } from "@material-tailwind/react";
import { NavLink } from 'react-router-dom';

const Home = () => {
    const [auth,setAuth]=useAuth()
  return (
    <>

    
    {!auth.id ? (
      <>
    <h1  className='text-center mt-40 text-2xl hover:rotate-2 hover:text-blue-500 hover:text-3xl '>Welcome To Contact App Mangement </h1>
    <div className="flex w-max gap-4 mr-auto ml-auto mt-10">
       <NavLink to='/login'><Button color="blue" > Sign in </Button> </NavLink>  
         <NavLink to='/register'><Button color="blue"> Register </Button></NavLink>
      
    </div>
    </>
    ):  
      <h1 className='text-center mt-40 text-2xl hover:rotate-2 hover:text-blue-500 hover:text-3xl '>  welcome {auth.name}  </h1>
      
      }
      
      </>
  )
  
}

export default Home