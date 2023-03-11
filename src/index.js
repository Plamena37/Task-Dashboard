import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import EmployeesContextProvider from "./context/EmployeesContextProvider";
import TasksContextProvider from "./context/TasksContextProvider";
import ManagersContextProvider from "./context/ManagersContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <EmployeesContextProvider>
    <TasksContextProvider>
      <ManagersContextProvider>
        <App />
      </ManagersContextProvider>
    </TasksContextProvider>
  </EmployeesContextProvider>
  // </React.StrictMode>
);
