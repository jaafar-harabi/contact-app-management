import React, { useEffect, useState } from 'react'

import { useAuth } from '../context/Context'
import axios from 'axios'
import {
  Card,
  Input,

  Button,
  Typography,
} from "@material-tailwind/react";
import {DeleteOutlined,EditOutlined} from '@ant-design/icons'
import toast from 'react-hot-toast';


const Contact = () => {
  const [auth,setAuth]=useAuth()
  const [name,setName]=useState('')
  const [number,setNumber]=useState('')
  const [fetchData,setfetchData]=useState([])

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      
      const res=await axios.post('api/v1/contact/',{name,number,user:auth.id}) 
      if (res.data.success){
        toast.success("The contact has been added to the list")
        setName('')
        setNumber('')
        getAll()
      }
      else{
        toast.error("Something wrong")
      }
    }catch(err){
      console.log(err)
    }
  }

  const getAll=async()=>{
    
    const config = {
      headers: {
        Authorization: process.env.auth,
      },
    };
    try{
      
        const res = await axios.get(`api/v1/contact/${auth.id}`,config)
        if (res){
          setfetchData(res.data)
          
          
          
      }

      
      
    }catch(err){
      console.log(err)
    }
  }

  const del=async(id)=>{
    try{
      const res=await axios.delete(`api/v1/contact/${id}`)
      if (res){
        getAll()
      }
      
    }catch(err){
      console.log(err)
    }
  }
  const update=async(id)=>{
    const newName=prompt('Enter new contact name')
      const newNumber=prompt('Enter new contact phone number')
    try{
      
      const res = await axios.put(`api/v1/contact/${id}`,{name:newName,number:newNumber,user:auth.id})
      if (res.data && res.data.success){
        toast.success('Successfully updated')
        getAll()
      }
      else{
        toast.error('Something wrong')
      }

    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    getAll()

  },[])
  return (
    <>
      <div className='container grid lg:grid-cols-2 md:grid-cols-1  gap-2  sm:grid-cols-1  '  >
        <div  > 
          <Card color="transparent" shadow={false} className='items-center mt-20'>
    
    
              <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit} >
                <div className="mb-4 flex flex-col gap-6">
                  <Input size="lg" label="Contact ame"  value={name} onChange={(e)=>{setName(e.target.value)}} />
                 <Input size="lg" label="Contact phone " value={number}  onChange={(e)=>{setNumber(e.target.value)}} />
                </div>
      
               <Button className="mt-6" fullWidth type='submit'>
                  Add
                </Button>
              </form>

            </Card> 
        </div>
        
        <div className='mt-28 ' >
        
        <Card className="overflow-scroll h-full w-full ">
            <table className="w-full min-w-max table-auto text-center bg-gray-100 ">
              <thead>
                <tr>
            
                    <th  className="border-b border-blue-gray-100 bg-blue-300 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className=" leading-none opacity-70 text-black text-lg font-bold"
                      >
                        #
                      </Typography>
                   </th>
                    <th  className="border-b border-blue-gray-100 bg-blue-300 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className=" leading-none opacity-70 text-black text-lg font-bold"
                      >
                        Name
                      </Typography>
                    </th>
                    <th  className="border-b border-blue-gray-100 bg-blue-300 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className=" leading-none opacity-70 text-black text-lg font-bold"
                      >
                        Phone number
                      </Typography>
                      </th>
                    <th  className="border-b border-blue-gray-100 bg-blue-300 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className=" leading-none opacity-70 text-black text-lg font-bold"
                      >
                        Options
                      </Typography>
                    </th>
              
          </tr>
        </thead>
        <tbody className='bg-white'>
          {fetchData.map((data,index)=>(
            <tr key={data._id} >
                <td >
                  <Typography variant="small" color="blue-gray" className="font-normal text-md hover:text-lg hover:font-bold">
                      {index+1}
                  </Typography>
                </td>

                <td >
                  <Typography variant="small" color="blue-gray" className="font-normal text-md hover:text-lg hover:font-bold">
                      {data.name}
                  </Typography>
                </td>

                <td >
                  <Typography variant="small" color="blue-gray" className="font-normal text-md hover:text-lg hover:font-bold">
                      {data.number}
                  </Typography>
                </td>

                <td >
                  
                      <DeleteOutlined onClick={()=>{del(data._id)}} className='mr-4 text-red-900 text-lg hover:text-2xl' />
                      <EditOutlined onClick={()=> {update(data._id)}} className='text-blue-500 text-lg hover:text-2xl' />
                  
                </td>
                
              </tr>

          ))}
          
              
            
        </tbody>
      </table>
    </Card>
  
        </div>

      </div>

    </>
  )
}

export default Contact