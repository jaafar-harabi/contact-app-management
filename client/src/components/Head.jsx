import { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { NavLink,useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "../context/Context";

const Head = () => {
  const navigate=useNavigate()
    const [auth,setAuth]=useAuth()
    const [openNav, setOpenNav] = useState(false);

    const logout=()=>{
      navigate('/')
      toast.success('Logout success')
      setAuth({...auth,id:null,name:'',token:''})
      localStorage.removeItem('auth')
      
      
    }
 
  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      
        <NavLink to='/' className="flex items-center text-xl hover:text-2xl text-blue-gray-700 hover:text-blue-500">
          Home
        </NavLink>
      

    {!auth.id ? (
        <>
        
        
            <NavLink to='/login' className="flex items-center text-xl hover:text-2xl text-blue-gray-700 hover:text-blue-500">
            Login
          </NavLink>
   
        
     
      
        <NavLink to='/register' className="flex items-center text-xl hover:text-2xl text-blue-gray-700 hover:text-blue-500">
          Register
        </NavLink>
     
     </>

    ):     
    <>
            
                <NavLink to='/contact' className="flex items-center text-blue-gray-700 hover:text-blue-500 text-xl hover:text-2xl">
                MyContact
              </NavLink>
            
                <NavLink  className="flex items-center text-blue-gray-700 hover:text-blue-500 text-xl hover:text-2xl " onClick={logout} >
                logout
              </NavLink>
          </>}
      
    </ul>
  );
  return (
    <>
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium hover:text-2xl hover:text-blue-500 text-xl"
        >
          JAAFAR-APP
        </Typography>
        
        <div className="hidden lg:block">{navList}</div>
        
        
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          
        </div>
      </Collapse>
    </Navbar>
            <Toaster/>
    </>
  )
}

export default Head