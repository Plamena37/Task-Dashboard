import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import EmployeesForm from "./components/Employees/EmployeesForm";
import TasksForm from "./components/Tasks/TasksForm";
import Dashboard from "./components/Dashboard/Dashboard";
import ManagersForm from "./components/Managers/ManagersForm";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

// Create a custom theme for the Material UI components
const theme = createTheme({
  palette: {
    primary: {
      main: "#24a278",
    },
  },
});

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<EmployeesForm />} />
            <Route path="/tasks" element={<TasksForm />} />
            <Route path="/managers" element={<ManagersForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
