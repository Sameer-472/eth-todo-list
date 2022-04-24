// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
contract TodoList {

    uint public taskCount = 0;
    struct Task {
        uint id;
        string content;
        bool completed;
    }

    // mapping(uint=> Task) public task;

    Task[] task;

    function createTask(string memory _content , bool  _completed) public {
        taskCount +=1;
        // task[taskCount] = Task(taskCount , _content , false);
        task.push(Task(taskCount , _content , _completed));
    }

    function getTask() public view returns (Task[] memory){
        return task;
    }

    function getCount() public view returns (uint){
        return taskCount;
    }
}
