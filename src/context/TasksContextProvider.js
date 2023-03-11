import React, { useEffect, useState } from "react";

//------------------------ Creating the context ------------------------
export const TasksContext = React.createContext({
  allTasks: [],
  addToTasksData: () => {},
  editTask: () => {},
  deleteTask: () => {},
});

const TasksContextProvider = ({ children }) => {
  //------------------------ Declare the state ------------------------
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    const tasksDataJson = localStorage.getItem("tasksData");
    setAllTasks(JSON.parse(tasksDataJson) || []);
  }, []);

  const addToTasksData = (newTask) => {
    const newTasks = [newTask, ...allTasks];
    setAllTasks(newTasks);
    const tasksDataJson = JSON.stringify(newTasks);
    localStorage.setItem("tasksData", tasksDataJson);
  };

  //------------------------ Edit Task ------------------------
  const editTask = (task) => {
    const filteredArray = allTasks.filter((item) => item.id !== task.id);
    const newTasks = [task, ...filteredArray];
    setAllTasks(newTasks);
    const tasksDataJson = JSON.stringify(newTasks);
    localStorage.setItem("tasksData", tasksDataJson);
  };

  //------------------------ Delete Task ------------------------
  const deleteTask = (task) => {
    setAllTasks(allTasks.filter((item) => item !== task));
    const tasksDataJson = JSON.stringify(allTasks);
    localStorage.setItem("tasksData", tasksDataJson);
  };

  return (
    <TasksContext.Provider
      value={{
        allTasks: allTasks,
        addToTasksData: addToTasksData,
        editTask: editTask,
        deleteTask: deleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContextProvider;
