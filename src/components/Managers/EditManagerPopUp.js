import { useContext, useState } from "react";
import { TasksContext } from "../../context/TasksContextProvider";
import { EmployeeContext } from "../../context/EmployeesContextProvider";
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create";
import "./EditManagerPopUp.css";
import { ManagersContext } from "../../context/ManagersContextProvider";

const EditManagerPopUp = ({ manager, popUpActive, clear }) => {
  const [editedManager, setEditedManager] = useState({
    id: manager.id,
    fullName: manager.fullName,
    email: manager.email,
    taskWorking: manager.taskWorking,
    employeeWorking: manager.employeeWorking,
  });
  const { editManager } = useContext(ManagersContext);
  const { allEmployees } = useContext(EmployeeContext);
  const { allTasks } = useContext(TasksContext);

  const handleChange = (event) => {
    const { value, name } = event.target;

    setEditedManager({
      ...editedManager,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editManager(editedManager);
    clear();
  };

  return (
    <div className={popUpActive ? "pop-up-container active" : "hidden"}>
      <div className="exit-button-container">
        <button className="exit-button">
          <CloseIcon onClick={clear} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="note">
        <TextField
          id="fullName"
          name="fullName"
          value={editedManager.fullName}
          label="Full Name"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="email"
          name="email"
          value={editedManager.email}
          label="Email"
          variant="outlined"
          onChange={handleChange}
          type="email"
        />

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">
            Working on task:
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="taskWorking"
            name="taskWorking"
            value={editedManager.taskWorking}
            label="Working on task:"
            onChange={handleChange}
          >
            {allTasks.map((task) => (
              <MenuItem key={task.id} value={task.id}>
                {task.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">Working with:</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="employeeWorking"
            name="employeeWorking"
            value={editedManager.employeeWorking}
            label="Working with:"
            onChange={handleChange}
          >
            {allEmployees.map((employee) => (
              <MenuItem key={employee.id} value={employee.id}>
                {employee.fullName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <button className="save-changes-button">
          <CreateIcon />
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditManagerPopUp;
