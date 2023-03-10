import React, { useEffect, useState } from "react";

//------------------------ Creating the context ------------------------
export const TasksContext = React.createContext({
  allTasks: [],
  addToTasksData: () => {},
  editTask: () => {},
  deleteTask: () => {},
});

function TasksContextProvider(props) {
  //------------------------ Declare the state ------------------------
  const [allTasks, setAllTasks] = useState([]);

  /* Explanation
          Gets the current notesData from the local browser storage
          Set the state (parses the data from a string to obj, or display an empty array if there is no data)
  
          Note: This is a useEffect hook that means this is a side effect to the main functionality of the component.
          You can set this hook to be initialized only once by setting the second parameter to [].
      */
  useEffect(() => {
    const tasksDataJson = localStorage.getItem("tasksData");
    setAllTasks(JSON.parse(tasksDataJson) || []);
  }, []);

  //------------------------ Create Task ------------------------
  /*Explanation
          Set the new state (spread the array allTasks and add the new note to it)
          Parse the array to string format
          Update the local storage
      */
  const addToTasksData = (newTask) => {
    const newTasks = [newTask, ...allTasks];
    setAllTasks(newTasks);
    const tasksDataJson = JSON.stringify(newTasks);
    localStorage.setItem("tasksData", tasksDataJson);
  };

  //------------------------ Edit Task ------------------------
  function editTask(task) {
    const filteredArray = allTasks.filter((item) => item.id !== task.id);
    const newTasks = [task, ...filteredArray];
    setAllTasks(newTasks);
    const tasksDataJson = JSON.stringify(newTasks);
    localStorage.setItem("tasksData", tasksDataJson);
  }

  //------------------------ Delete Task ------------------------
  /* Explanation
          Set the new state (removes the item from the state)
          Parse the array from obj to string
          Update the local storage
      */
  function deleteTask(task) {
    setAllTasks(allTasks.filter((item) => item !== task));
    const tasksDataJson = JSON.stringify(allTasks);
    localStorage.setItem("tasksData", tasksDataJson);
  }

  return (
    <TasksContext.Provider
      value={{
        allTasks: allTasks,
        addToTasksData: addToTasksData,
        editTask: editTask,
        deleteTask: deleteTask,
      }}
    >
      {/*Passes down all of the functions*/}
      {props.children}
    </TasksContext.Provider>
  );
}

export default TasksContextProvider;
