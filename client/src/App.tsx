import React, {useEffect} from 'react';
import AnimatedCursor from "react-animated-cursor"
import {Routes,Route,Navigate } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Head from './components/Head';
import NotFound from './pages/NotFound';
import { useAuth } from './context/Context';

function App() {
  const [auth,setAuth]=useAuth()

  useEffect(()=>{

  },[auth])

  return (
    <>
    <Head/>
    <Routes>
      
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={!auth.id ? <Login/>: <Navigate to='/' /> } />
      <Route path='/register' element={!auth.id ? <Register/>: <Navigate to='/' />}  />
      <Route path='/contact' element={auth.id ? <Contact/> : <Navigate to='/'/>}  />
      <Route path='*' element={<NotFound/>} />

    </Routes>
     
     <AnimatedCursor 
     innerSize={8}
     outerSize={8}
     color='135,206,250'
     outerAlpha={0.2}
     innerScale={0.7}
     outerScale={5}
     clickables={[
       'a',
       'input[type="text"]',
       'input[type="email"]',
       'input[type="number"]',
       'input[type="submit"]',
       'input[type="image"]',
       'label[for]',
       'select',
       'textarea',
       'button',
       '.link'
     ]}
     />
    </>
     
   
  );
}

export default App;
