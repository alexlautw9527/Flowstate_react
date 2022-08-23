import addButton from '../img/plus.svg';

function AddTodo({ onAddTodo, onInputChange, addTodoInputText }) {
  return (
    <>
      <div className='relative'>
        <input type="text" placeholder="add your new todo" className="pl-3 font-pixel py-3 w-full block border rounded bg-secondary"
          value={addTodoInputText}
          onChange={event => onInputChange(event['target']['value'])} />
        <img src={addButton} alt="AddTodo" className='w-10 absolute top-1/2  right-3 transform  -translate-y-1/2 cursor-pointer'
          onClick={(event) => { onAddTodo() }} />
      </div>

    </>
  )
}

export default AddTodo