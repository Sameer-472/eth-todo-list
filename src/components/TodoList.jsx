import React from 'react'
import { TodoContext } from "../context/TodoContext";
import { useContext } from "react";

const TodoList = () => {
  const { connectWallet, counter ,  accounts, TodoContract  , taskCount , createTask , todoTask} = useContext(TodoContext);
//   console.log(todoTask)
//   console.log(counter)

  return (
    <>
        {/* <ul>
            {task.map((item)=>{
                <li>{item}</li>
            })}
        </ul> */}
    </>
    )
}

export default TodoList