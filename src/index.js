
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react'
import './index.css';
import Header from './components/Header.js'
import TodoScreen from './components/TodoScreen'
import Login from './components/Login';
import SignUp from './components/SignUp';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById('root'));


function App() {
  const [token, setToken] = useState(window.sessionStorage.getItem("token"))
  const [userNickname, setUserNickname] = useState(window.sessionStorage.getItem("nickname"))


  return (
    <div className='bg-gameboy min-h-[100vh]'>
      <Header userNickname={userNickname} setToken={setToken} href={'/sign_up'}>Sign up</Header>
      {
        token ? (
          <>

            <TodoScreen></TodoScreen>
          </>
        ) : (<Login setToken={setToken} ></Login>)
      }
    </div>
  )
}


root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/sign_up" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
);
