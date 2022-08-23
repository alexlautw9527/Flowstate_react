import trashcan from '../img/can.png';

function TodoListItem({ content, completedAt, todoID, onToggleTodo, onDeleteTodo }) {

  return (
    <>
      <li>
        <div className="">
          <div className="flex items-center mr-4 mb-2">
            <input
              type="checkbox"
              onChange={e => { onToggleTodo(todoID) }}
              id={todoID}
              className="opacity-0 absolute h-8 w-8 cursor-pointer"
            />
            <div className="bg-white border-2 rounded-md border-gameboy w-8 h-8 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-gameboy ">
              {completedAt && <i className='fa-solid fa-check text-gameboy'></i>}
            </div>
            <label htmlFor={todoID} className="cursor-pointer">
              {content}
            </label>
            <img src={trashcan} alt="" srcSet="" onClick={e => { onDeleteTodo(todoID) }} className='w-10 ml-auto opacity-0 hover:opacity-100 cursor-pointer' />
          </div>

        </div>
      </li>
    </>
  )
}

function TodoListPagination({ onClickPagination }) {

  return (
    <>
      <div className='bg-[#A10036] font-pixel mb-5 text-secondary flex'>
        <div className='relative basis-1/3 h-14 text-center cursor-pointer flex items-center justify-center hover:border-b-4' data-category="all" onClick={e => { onClickPagination(e) }}>
          ALL
        </div>
        <div className='relative basis-1/3 h-14 text-center cursor-pointer flex items-center justify-center hover:border-b-4' data-category="todo" onClick={e => { onClickPagination(e) }}>
          TODO
        </div>
        <div className='relative basis-1/3 h-14 text-center cursor-pointer flex items-center justify-center hover:border-b-4' data-category="done" onClick={e => { onClickPagination(e) }}>
          DONE
        </div>
      </div>
    </>
  )
}

function TodoListContent({ onClickPagination, onToggleTodo, onDeleteTodo, todoArr, paginationState }) {



  function mapTodoListItem(paginationState) {
    let filteredArr = [...todoArr]
    if (paginationState === 'todo') {
      filteredArr = filteredArr.filter(e => e.completed_at === null)
    } else if (paginationState === 'done') {
      filteredArr = filteredArr.filter(e => e.completed_at !== null)
    }

    const todoListItemArr = filteredArr.map((ele) => {
      return (
        <TodoListItem
          key={ele.id}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
          content={ele.content}
          todoID={ele.id}
          completedAt={ele.completed_at}
        />
      )
    })
    return todoListItemArr
  }

  return (
    <>
      <TodoListPagination
        onClickPagination={onClickPagination}
      />
      <ul className="px-3">
        {mapTodoListItem(paginationState)}
      </ul>
    </>
  )
}

export default TodoListContent