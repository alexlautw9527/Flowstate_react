import axios from 'axios'
import { useState, useEffect } from 'react'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import { domainUrl } from '../config'


export default function TodoScreen() {
    const header = {
        headers: {
            Authorization: window.sessionStorage.getItem('token')
        }
    }

    const [todoArr, setTodoArr] = useState([])


    const unfinishedTodoNum = todoArr.length ? todoArr.filter(e => e.completed_at === null).length : 0

    const getTodoArr = async () => {
        const response = await axios.get(`${domainUrl}/todos`, header)
        setTodoArr(response.data.todos)
    }

    const clearAllDoneTodo = async () => {
        const deleteTodoAsyncArr = todoArr.filter(e => e.completed_at !== null).map(e => {
            return axios.delete(`${domainUrl}/todos/${e.id}/`, header)
        })

        let deleteResponse = await axios.all(deleteTodoAsyncArr)
        const getResponse = await axios.get(`${domainUrl}/todos`, header)
        setTodoArr(getResponse.data.todos)

    }

    useEffect(() => {
        getTodoArr()
    }, [])

    return (
        <>
            <div className='container mb-10'>
                <div className="bg-primary  rounded-2xl	rounded-br-[80px] lg:rounded-br-[120px]  justify-center p-10 lg:p-20   relative w-full lg:w-3/5 mx-auto">
                    <div className='flex items-center'>
                        <div className='hidden rounded-full bg-red-700 w-5 h-5 lg:inline-block absolute left-8'></div>
                        <div className="bg-[#d7d7d7] min-h-[200px] w-full">
                            <AddTodo setTodoArr={setTodoArr}></AddTodo>
                            {todoArr.length > 0 ?
                                (
                                    <>
                                        <TodoList todoArr={todoArr} setTodoArr={setTodoArr}></TodoList>
                                        <div className='font-pixel text-right pr-5 '>
                                            <div className='cursor-pointer inline-block hover:font-bold hover:text-secondary' onClick={clearAllDoneTodo}>clear all done?</div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p className='text-center p-10 font-pixel text-xl'>add some todo!</p>
                                    </>)
                            }
                        </div>
                    </div>
                    <div className='absolute text-secondary font-pixel bottom-2 lg:bottom-7'>{unfinishedTodoNum} todo to finish</div>

                </div>
            </div>
        </>
    )
}