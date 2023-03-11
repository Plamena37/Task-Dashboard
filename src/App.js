import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import EmployeesForm from "./components/Employees/EmployeesForm";
import TasksForm from "./components/Tasks/TasksForm";
import Dashboard from "./components/Dashboard/Dashboard";
import ManagersForm from "./components/Managers/ManagersForm";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Routes>
          <Route path="/" element={<EmployeesForm />} />
          <Route path="/tasks" element={<TasksForm />} />
          <Route path="/managers" element={<ManagersForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
