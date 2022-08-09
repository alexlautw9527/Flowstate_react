import trashcan from '../img/can.png';
import { domainUrl } from '../config'
import axios from 'axios';
import { useState } from 'react';

function TodoListItem({ content, completed_at, todo_id, setTodoArr }) {
    const header = {
        headers: {
            Authorization: window.sessionStorage.getItem('token')
        }
    }

    const toggleTodo = async () => {
        const toggleResponse = await axios.patch(`${domainUrl}/todos/${todo_id}/toggle`, {}, header)
        const getTodoResponse = await axios.get(`${domainUrl}/todos`, header)
        setTodoArr(getTodoResponse.data.todos)
    }

    const deleteTodo = async () => {
        const toggleResponse = await axios.delete(`${domainUrl}/todos/${todo_id}/`, header)
        const getTodoResponse = await axios.get(`${domainUrl}/todos`, header)
        setTodoArr(getTodoResponse.data.todos)
    }

    return (
        <>
            <li>
                <div className="">
                    <div className="flex items-center mr-4 mb-2">
                        <input type="checkbox" onChange={toggleTodo} id={todo_id} name="" value="" className="opacity-0 absolute h-8 w-8 cursor-pointer" />
                        <div className="bg-white border-2 rounded-md border-gameboy w-8 h-8 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-gameboy ">


                            {completed_at && <i className='fa-solid fa-check text-gameboy'></i>}
                        </div>
                        <label htmlFor={todo_id} className="cursor-pointer">{content}</label>
                        <img src={trashcan} alt="" srcSet="" onClick={deleteTodo} className='w-10 ml-auto opacity-0 hover:opacity-100 cursor-pointer' />
                    </div>

                </div>
            </li>
        </>
    )
}

function TodoListPagination({ paginationState, setPaginationState }) {

    const changePagination = (e) => {
        const category = e.target.dataset.category
        setPaginationState(category)
        console.log(category)
    }


    return (
        <>
            <div className='bg-[#A10036] font-pixel mb-5 text-secondary flex'>
                <div className='relative basis-1/3 h-14 text-center cursor-pointer flex items-center justify-center hover:border-b-4' data-category="all" onClick={e => { changePagination(e) }}>
                    ALL
                </div>
                <div className='relative basis-1/3 h-14 text-center cursor-pointer flex items-center justify-center hover:border-b-4' data-category="todo" onClick={e => { changePagination(e) }}>
                    TODO
                </div>
                <div className='relative basis-1/3 h-14 text-center cursor-pointer flex items-center justify-center hover:border-b-4' data-category="done" onClick={e => { changePagination(e) }}>
                    DONE
                </div>
            </div>
        </>
    )
}

export default function TodoList({ todoArr, setTodoArr }) {


    const [paginationState, setPaginationState] = useState("all")


    function renderListItem() {
        let filteredArr = todoArr

        if (paginationState === 'todo') {
            filteredArr = todoArr.filter(e => e.completed_at === null)
        } else if (paginationState === 'done') {
            filteredArr = todoArr.filter(e => e.completed_at !== null)
        }

        const listItem = filteredArr.map((ele) => {
            return (
                <TodoListItem
                    key={ele.id}
                    setTodoArr={setTodoArr}
                    content={ele.content}
                    todo_id={ele.id}
                    completed_at={ele.completed_at}>

                </TodoListItem>
            )
        })
        return listItem
    }

    return (
        <>
            <TodoListPagination paginationState={paginationState} setPaginationState={setPaginationState}></TodoListPagination>
            <ul className="px-3">
                {renderListItem()}
            </ul>
        </>
    )
}