import { useContext, useState } from "react";
import { TasksContext } from "../../context/TasksContextProvider";
import { EmployeeContext } from "../../context/EmployeesContextProvider";
import {
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create";
import "./EditTaskPopUp.css";

const EditTaskPopUp = ({ task, popUpActive, clear }) => {
  const [editedTask, setEditedTask] = useState({
    id: task.id,
    title: task.title,
    description: task.description,
    assignee: task.assignee,
    dueDate: task.dueDate,
  });
  const { editTask } = useContext(TasksContext);
  const { allEmployees } = useContext(EmployeeContext);

  const handleChange = (event) => {
    const { value, name } = event.target;

    setEditedTask({
      ...editedTask,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editTask(editedTask);
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
          id="title"
          name="title"
          value={editedTask.title}
          label="Title"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="description"
          name="description"
          value={editedTask.description}
          label="Description"
          variant="outlined"
          onChange={handleChange}
          multiline
          rows={4}
        />

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">Assignee</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="assignee"
            name="assignee"
            value={editedTask.assignee}
            label="Assignee"
            onChange={handleChange}
          >
            {allEmployees.map((employee) => (
              <MenuItem key={employee.id} value={employee.id}>
                {employee.fullName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="dueDate"
          name="dueDate"
          value={editedTask.dueDate}
          InputLabelProps={{ shrink: true }}
          label="Due Date"
          variant="outlined"
          type="date"
          onChange={handleChange}
        />

        <button className="save-changes-button">
          <CreateIcon />
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditTaskPopUp;
