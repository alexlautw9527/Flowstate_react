import { useState } from "react"
import axios from 'axios';
import { domainUrl } from '../config'

function FormInput({ children, htmlFor, inputType, onChange, margin = false }) {
    return (
        <div className="mb-5">
            <label htmlFor={htmlFor} className="font-pixel block">
                <p>{children}</p>
                <input type={inputType} id={htmlFor} name={htmlFor} className='block w-full' onChange={e => { onChange(e, htmlFor) }}></input>
            </label>

        </div>
    )
}



export default function Login({ setToken }) {

    const [loginStatus, setLoginStatus] = useState("")
    const [loginData, setLoginData] = useState({})


    function setData(e, type) {
        let value = e.target.value
        let loginDataObj = {
            "user": {
                ...loginData.user
            }
        }
        loginDataObj['user'][type] = value
        setLoginData(loginDataObj)
    }

    async function postLogin() {

        try {
            const signInResponse = await axios.post(`${domainUrl}/users/sign_in`, loginData)

            if (signInResponse.status === 200) {
                const token = signInResponse['headers']['authorization']
                setToken(token)
                window.sessionStorage.setItem("token", token);
                window.sessionStorage.setItem("nickname", signInResponse["data"]["nickname"]);

                setLoginStatus('success')
            } else {
                setLoginStatus('login fail')
            }
            console.log(signInResponse.status)
        } catch {
            setLoginStatus('login fail')
        }



    }



    return (
        <div className="font-pixel container">
            <h1 className="mb-10 text-5xl text-center">Login?</h1>

            <div className="w-full md:w-1/3 mx-auto flex flex-col">

                <FormInput htmlFor="email" inputType="email" onChange={setData}> EMAIL </FormInput>
                <FormInput htmlFor="password" inputType="password" onChange={setData}> PASSWORD </FormInput>



                {loginStatus === 'login fail' && <p className="mb-5">Please check.</p>}

                <div onClick={postLogin}
                    className="border-2 border-primary inline-block p-3 text-center mx-auto cursor-pointer hover:text-secondary hover:bg-primary">Enter</div>
            </div>

        </div>

    )

}