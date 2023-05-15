import React from "react";
import addButton from "../img/plus.svg";

type AddTodoProps = {
  onAddTodo: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addTodoInputText: string;
};

function AddTodo({ onAddTodo, onInputChange, addTodoInputText }: AddTodoProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="add your new todo"
        className="pl-3 font-pixel py-3 w-full block border rounded bg-secondary"
        value={addTodoInputText}
        onChange={onInputChange}
      />
      <img
        src={addButton}
        alt="AddTodo"
        className="w-10 absolute top-1/2  right-3 transform  -translate-y-1/2 cursor-pointer"
        onClick={() => {
          onAddTodo();
        }}
      />
    </div>
  );
}

export default AddTodo;
