import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import EmployeesContextProvider from "./context/EmployeesContextProvider";
import TasksContextProvider from "./context/TasksContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <EmployeesContextProvider>
      <TasksContextProvider>
        <App />
      </TasksContextProvider>
    </EmployeesContextProvider>
  </React.StrictMode>
);
