import axios from "axios";
import { useState, useEffect, ReactNode } from "react";
import AddTodo from "@components/AddTodo";
import TodoListContent from "@components/TodoListContent";
import { DOMAIN_URL } from "config";

interface TodoScreenWrapperProps {
  unfinishedTodoNum: number;
  children: ReactNode;
}

function TodoScreenWrapper({
  unfinishedTodoNum,
  children,
}: TodoScreenWrapperProps) {
  return (
    <div className="container mb-10">
      <div className="bg-primary  rounded-2xl	rounded-br-[80px] lg:rounded-br-[120px]  justify-center p-10 lg:p-20   relative w-full lg:w-3/5 mx-auto">
        <div className="flex items-center">
          <div className="hidden rounded-full bg-red-700 w-5 h-5 lg:inline-block absolute left-8" />
          <div className="bg-[#d7d7d7] min-h-[200px] w-full">{children}</div>
        </div>
        <div className="absolute text-secondary font-pixel bottom-2 lg:bottom-7">
          {unfinishedTodoNum} todo to finish
        </div>
      </div>
    </div>
  );
}

function TodoListMain() {
  const ajaxHeader = {
    headers: {
      Authorization: window.sessionStorage.getItem("token"),
    },
  };

  enum PaginationState {
    ALL = "all",
    TODO = "todo",
    DONE = "done",
  }

  interface ITodo {
    completed_at: Date | null;
  }
  const [todoArr, setTodoArr] = useState<ITodo[]>([]);
  const [addTodoInputText, setAddTodoInputText] = useState<string>("");
  const [paginationState, setPaginationState] = useState<PaginationState>(
    PaginationState.ALL
  );

  const unfinishedTodoNum =
    todoArr.length > 0
      ? todoArr.filter((ele) => ele.completed_at === null).length
      : 0;

  async function handleGetTodoArr() {
    const getResponse = await axios.get(`${DOMAIN_URL}/todos`, ajaxHeader);
    setTodoArr(getResponse.data.todos);
  }

  async function handleClickPagination(
    event: React.MouseEvent<HTMLDivElement>
  ) {
    const category = (event.target as HTMLDivElement).dataset
      .category as PaginationState;

    setPaginationState(category);
  }

  async function handleToggleTodo(todoID: string) {
    const patchResponse = await axios.patch(
      `${DOMAIN_URL}/todos/${todoID}/toggle`,
      {},
      ajaxHeader
    );
    const getTodoResponse = await axios.get(`${DOMAIN_URL}/todos`, ajaxHeader);
    patchResponse && setTodoArr(getTodoResponse.data.todos);
  }

  async function handleDeleteTodo(todoID: string) {
    const deleteResponse = await axios.delete(
      `${DOMAIN_URL}/todos/${todoID}/`,
      ajaxHeader
    );
    const getTodoResponse = await axios.get(`${DOMAIN_URL}/todos`, ajaxHeader);
    deleteResponse && setTodoArr(getTodoResponse.data.todos);
  }

  async function handleClearAllDoneTodo() {
    const PromiseArr = todoArr
      .filter((e) => e.completed_at !== null)
      .map((ele) => axios.delete(`${DOMAIN_URL}/todos/${ele.id}/`, ajaxHeader));

    const deleteResponse = await axios.all(PromiseArr);
    const getResponse = await axios.get(`${DOMAIN_URL}/todos`, ajaxHeader);
    deleteResponse ? setTodoArr(getResponse.data.todos) : console.log(33);
  }

  async function handleAddTodo() {
    const todoPostData = {
      todo: {
        content: addTodoInputText,
      },
    };
    const postResponse = await axios.post(
      `${DOMAIN_URL}/todos`,
      todoPostData,
      ajaxHeader
    );
    const getResponse = await axios.get(`${DOMAIN_URL}/todos`, ajaxHeader);
    postResponse && setTodoArr(getResponse.data.todos);
    setAddTodoInputText("");
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAddTodoInputText(value);
  };

  useEffect(() => {
    handleGetTodoArr();
  }, []);

  return (
    <TodoScreenWrapper unfinishedTodoNum={unfinishedTodoNum}>
      <AddTodo
        onAddTodo={handleAddTodo}
        onInputChange={setAddTodoInputText}
        addTodoInputText={addTodoInputText}
      />
      {todoArr.length > 0 ? (
        <>
          <TodoListContent
            onClickPagination={handleClickPagination}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
            todoArr={todoArr}
            paginationState={paginationState}
          />
          <div className="font-pixel text-right pr-5 ">
            <div
              className="cursor-pointer inline-block hover:font-bold hover:text-secondary"
              onClick={handleClearAllDoneTodo}
            >
              clear all done?
            </div>
          </div>
        </>
      ) : (
        <p className="text-center p-10 font-pixel text-xl">add some todo!</p>
      )}
    </TodoScreenWrapper>
  );
}

export default TodoListMain;
