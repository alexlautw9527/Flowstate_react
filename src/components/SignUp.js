import { useState } from "react"
import axios from 'axios';
import { domainUrl } from '../config'
import Header from './Header.js'

function FormInput({ children, htmlFor, inputType, onChange }) {
    return (
        <div className="mb-5">
            <label HtmlFor={htmlFor} className="font-pixel block">
                <p>{children}</p>
                <input type={inputType} id={htmlFor} name={htmlFor} className='block w-full' onChange={e => { onChange(e, htmlFor) }}></input>
            </label>

        </div>
    )
}



export default function SignUp() {

    const [signUpStatus, setSignUpStatus] = useState("")

    const [signUpData, setSignUpData] = useState({})

    function setData(e, type) {
        let value = e.target.value
        let DataObj = {
            "user": {
                ...signUpData.user
            }
        }
        DataObj['user'][type] = value
        setSignUpData(DataObj)

    }

    async function postSignUp() {
        const { email, nickname, password } = signUpData.user
        const postSignUpData = {
            user: {
                email,
                nickname,
                password
            }
        }
        try {
            const signUpResponse = await axios.post(`${domainUrl}/users/`, postSignUpData)

            if (signUpResponse.status === 201) {
                setSignUpStatus('success')
            } else {
                setSignUpStatus('signUp fail')
            }
            console.log(signUpResponse.status)
        } catch {
            setSignUpStatus('signUp fail')
        }



    }



    return (

        <div className='bg-gameboy min-h-[100vh]'>
            <Header href={'/'}>Log in</Header>
            <div className="font-pixel container">
                <h1 className="mb-10 text-5xl text-center">Sign up?</h1>

                <div className="w-full md:w-1/3 mx-auto flex flex-col">

                    <FormInput htmlFor="email" inputType="email" onChange={setData}> EMAIL </FormInput>
                    <FormInput htmlFor="nickname" inputType="text" onChange={setData}> NICKNAME </FormInput>
                    <FormInput htmlFor="password" inputType="password" onChange={setData}> PASSWORD </FormInput>
                    <FormInput htmlFor="reenterPassword" inputType="password" onChange={setData}> RENTER PASSWORD </FormInput>


                    <p className="mb-5">
                        {signUpStatus === 'success' ? 'Sign Up successfully' : ''}
                        {signUpStatus === 'signUp fail' ? 'Failed, please check' : ''}
                    </p>


                    <div
                        onClick={postSignUp}
                        className="border-2 border-primary inline-block p-3 text-center mx-auto cursor-pointer hover:text-secondary hover:bg-primary">Enter</div>
                </div>

            </div>
        </div>

    )

}