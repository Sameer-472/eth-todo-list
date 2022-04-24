import React, {useState} from "react";
import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const Main = () => {
  const {
    connectWallet,
    accounts,
    TodoContract,
    todoTask,
    task,
    taskCount,
    createTask,
    getTask,
  } = useContext(TodoContext);

  const [text, settext] = useState("")


  const handleSubmit=(e)=>{
    e.preventDefault()
    createTask(text)
  }

  console.log(todoTask)

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => {settext(e.target.value)}} />
        <button type="submit">Add</button>
      </form>

      {!accounts ? (
        <button onClick={connectWallet}>Connect wallet</button>
      ) : null}
      {todoTask.map((item)=> {
        return(
          <ul>
            <li>{item.content}</li>
          </ul>
        )
      })}
    </>
  );
};

export default Main;
