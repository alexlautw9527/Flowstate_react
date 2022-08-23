import Header from './Header.js'
import { DOMAIN_URL } from '../config'
import axios from 'axios';
import { useState } from 'react'

function FormInput({ children, htmlFor, inputType, onInputChange, value }) {
  const inputValue = value['user'][htmlFor]
  return (
    <div className="mb-5">
      <label htmlFor={htmlFor} className="font-pixel block">
        <p>{children}</p>
        <input
          type={inputType}
          id={htmlFor}
          name={htmlFor}
          className='block w-full'
          onChange={e => { onInputChange(e, htmlFor) }}
          value={inputValue}>
        </input>
      </label>
    </div>
  )
}

function SignUp() {
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(null)
  const [signUpDataObj, setSignUpDataObj] = useState({
    "user": {
      email: "",
      nickname: "",
      password: "",
      reEnterPassword: ""
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

  async function handleSignUpClick() {
    const { email, nickname, password } = signUpDataObj['user']
    const signUpPostData = {
      user: {
        email,
        nickname,
        password
      }
    }
    try {
      const signUpResponse = await axios.post(`${DOMAIN_URL}/users/`, signUpPostData)
      signUpResponse.status === 201 ? setIsSignUpSuccess(true) : setIsSignUpSuccess(false)
    } catch {
      setIsSignUpSuccess(false)
    } finally {
      setSignUpDataObj({
        "user": {
          email: "",
          nickname: "",
          password: "",
          reEnterPassword: ""
        }
      })
    }
  }

  return (
    <div className='bg-gameboy min-h-[100vh]'>
      <Header href='/'>Log in</Header>
      <div className="font-pixel container">
        <h1 className="mb-10 text-5xl text-center">Sign up?</h1>

        <div className="w-full md:w-1/3 mx-auto flex flex-col">
          <FormInput htmlFor="email" inputType="email" onInputChange={handleInputChange(setSignUpDataObj)} value={signUpDataObj}> EMAIL </FormInput>
          <FormInput htmlFor="nickname" inputType="text" onInputChange={handleInputChange(setSignUpDataObj)} value={signUpDataObj} > NICKNAME </FormInput>
          <FormInput htmlFor="password" inputType="password" onInputChange={handleInputChange(setSignUpDataObj)} value={signUpDataObj}> PASSWORD </FormInput>
          <FormInput htmlFor="reEnterPassword" inputType="password" onInputChange={handleInputChange(setSignUpDataObj)} value={signUpDataObj}> RE-ENTER PASSWORD </FormInput>

          <p className="mb-5">
            {
              typeof isSignUpSuccess === "boolean" ? (
                isSignUpSuccess === true ? 'Sign Up successfully.' : 'Failed, please check.'
              ) : ""
            }
          </p>

          <div
            onClick={handleSignUpClick}
            className="border-2 border-primary inline-block p-3 text-center mx-auto cursor-pointer hover:text-secondary hover:bg-primary">Enter</div>
        </div>
      </div>
    </div>
  )
}

export default SignUp

