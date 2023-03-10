import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import EmployeesForm from "./components/Employees/EmployeesForm";
import TasksForm from "./components/Tasks/TasksForm";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Routes>
          <Route path="/" element={<EmployeesForm />} />
          <Route path="/tasks" element={<TasksForm />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
