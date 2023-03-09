import "./App.css";
import Employees from "./components/Employees/Employees";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Routes>
          <Route path="/" element={<Employees />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
