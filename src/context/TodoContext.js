import React, { Children, createContext, useState, useEffect } from "react";
import { ethers, Signer } from 'ethers';
import { contractAddress, contractABI } from "../utils/constant";

export const TodoContext = createContext();

const { ethereum } = window;

const TodoContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  return contract
  // console.log({ provider, signer, contract });
}

const TodoProvider = ({ children }) => {
  const [accounts, setAccounts] = useState("");
  const [todoTask, settodoTask] = useState([])
  const [counter, setCounter] = useState(0)
  
  const getTask = async () => {
    try {
      const todoContract = TodoContract();
      const tasks = await todoContract.getTask()
      const filterTask = tasks.map((item)=> ({
        id: item.id.toNumber() ,
        content: item.content , 
        completed: item.completed
      }));  
      settodoTask(filterTask)
      // console.log(todo)
    } catch (error) {
      console.log(error)
    }
  }
  const checkWalletIsConnected = async () => {
    if (!ethereum) return window.alert("Please install metamask");
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    console.log(accounts);
    try {
      if (accounts.length) {
        setAccounts(accounts[0])
        getTask()
        
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  
  const connectWallet = async () => {
    if (ethereum) {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      console.log(accounts);
      setAccounts(accounts[0])
    }
    else {
      window.alert("please intall metamask")
    }
  }

  const taskCount = async () => {
    const todoContract = TodoContract();
    const taskCount = await todoContract.getTask();
    // const counter = 
    setCounter(Number(taskCount))

    // console.log(Number(taskCount));
  }

  const createTask = async (content) => {
    console.log(taskCount);
    const todoContract = TodoContract();
    const createTask = await todoContract.createTask(content, true);
  }


  useEffect(() => {
    checkWalletIsConnected();
    getTask()

  }, [])



  return (
    <>
      <TodoContext.Provider value={{ connectWallet, accounts, TodoContract, taskCount, createTask, todoTask, getTask }}>
        {children}
      </TodoContext.Provider>
    </>
  )
}

export default TodoProvider