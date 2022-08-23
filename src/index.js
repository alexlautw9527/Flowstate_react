
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react'
import './index.css';
import Header from './components/Header.js'
import TodoListMain from './components/TodoListMain'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { DOMAIN_URL } from './config'
import axios from 'axios';


const root = ReactDOM.createRoot(document.getElementById('root'));


function App() {
  const [token, setToken] = useState(window.sessionStorage.getItem("token"))
  const userNickname = window.sessionStorage.getItem("nickname")

  const [isSignInSuccess, setIsSignInSuccess] = useState(null)
  const [signInDataObj, setSignInDataObj] = useState(
    {
      "user": {
        email: "",
        password: "",
      }
    })

  function handleInputChange(setStateFn) {
    return (event, updateProperty) => {
      const updateValue = event.target.value
      setStateFn(prevObj => {
        return {
          user: {
            ...prevObj.user,
            [updateProperty]: updateValue
          }
        }
      })
    }
  }


  async function handleSignInClick() {
    try {
      const signInResponse = await axios.post(`${DOMAIN_URL}/users/sign_in`, signInDataObj)

      if (signInResponse.status === 200) {
        const token = signInResponse['headers']['authorization']
        setToken(token)
        window.sessionStorage.setItem("token", token);
        window.sessionStorage.setItem("nickname", signInResponse["data"]["nickname"]);
        setIsSignInSuccess(true)
      } else {
        setIsSignInSuccess(false)
      }
    } catch {
      setIsSignInSuccess(false)
    }
  }

  async function handleSignOutClick() {
    const ajaxHeader = {
      headers: {
        Authorization: window.sessionStorage.getItem('token')
      }
    }
    const signOutResponse = await axios.delete(`${DOMAIN_URL}/users/sign_out`, ajaxHeader)
    if (signOutResponse.status === 200) {
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('nickname')
      setToken(null)
    }
  }

  return (
    <div className='bg-gameboy min-h-[100vh]'>
      <Header
        userNickname={userNickname}
        token={token}
        onSignOutClick={handleSignOutClick}
        href='/sign_up'>Sign up</Header>
      {
        token ? (
          <>
            <TodoListMain></TodoListMain>
          </>
        ) : (
          <SignIn
            onSignInClick={handleSignInClick}
            onInputChange={handleInputChange(setSignInDataObj)}
            isSignInSuccess={isSignInSuccess}
          />
        )
      }
    </div>
  )
}

root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="sign_up" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
)
