import {useEffect,useState,createContext,useContext} from 'react'
const AuthContext=createContext()



const AuthProvider = ({children}) => {
  const [auth,setAuth]=useState({
    id:null,
    name:'',
    token:''
  })

  useEffect(()=>{
    const data=localStorage.getItem('auth')
    if(data){
      const parseData= JSON.parse(data)
      setAuth({...auth,id:parseData._id,name:parseData.name,token:parseData.token})
    }

  },[])
  return (
    <AuthContext.Provider value={[auth,setAuth]} >
      {children}
    </AuthContext.Provider>
    
  )
}
const useAuth=()=>useContext(AuthContext)

export {useAuth,AuthProvider}