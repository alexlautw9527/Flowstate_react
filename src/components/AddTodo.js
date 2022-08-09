import addButton from '../img/plus.svg';
import { domainUrl, token } from '../config'
import { useState } from 'react';
import axios from 'axios';


export default function AddTodo({ setTodoArr }) {
    const header = {
        headers: {
            Authorization: window.sessionStorage.getItem('token')
        }
    }

    const [inputText, setInputText] = useState("")


    const AddNewTodo = async () => {
        const todoObj = {
            "todo": {
                "content": inputText
            }
        }
        const AddResponse = await axios.post(`${domainUrl}/todos`, todoObj, header)
        setInputText("")

        const response = await axios.get(`${domainUrl}/todos`, header)
        setTodoArr(response.data.todos)
    }

    return (
        <>
            <div className='relative'>
                <input type="text" placeholder="add your new todo" className="pl-3 font-pixel py-3 w-full block border rounded bg-secondary"
                    value={inputText}
                    onChange={e => setInputText(e.target.value)} />
                <img src={addButton} alt="AddTodo" className='w-10 absolute top-1/2  right-3 transform  -translate-y-1/2 cursor-pointer'
                    onClick={() => { AddNewTodo() }} />
            </div>

        </>
    )
}