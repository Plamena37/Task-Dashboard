import { useSnackbar } from "notistack";
import AddTaskIcon from "@mui/icons-material/AddTask";
import {
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useContext, useState } from "react";
import Layout from "../Layout/Layout";
import { TasksContext } from "../../context/TasksContextProvider";
import { EmployeeContext } from "../../context/EmployeesContextProvider";
import AllTasks from "./AllTasks";

const TasksForm = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { allEmployees } = useContext(EmployeeContext);
  const { addToTasksData } = useContext(TasksContext);

  const [taskData, setTaskData] = useState({
    id: uuidv4(),
    title: "",
    description: "",
    assignee: "",
    dueDate: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    //Prevents the page from reloading
    event.preventDefault();

    if (
      taskData.title === "" ||
      taskData.description === "" ||
      taskData.assignee === "" ||
      taskData.dueDate === ""
    ) {
      //Check if the form is empty
      enqueueSnackbar("Please fill all of the fields before submitting!", {
        variant: "info",
        preventDuplicate: true,
      });
    } else {
      setTaskData(taskData);
      //Sets the new task
      addToTasksData(taskData);
      enqueueSnackbar("Task added!", {
        variant: "success",
      });
    }

    //Clear the form after submission.
    setTaskData({
      id: uuidv4(),
      title: "",
      description: "",
      assignee: "",
      dueDate: "",
    });
  };

  return (
    <Layout>
      <div className="employees__layout">
        <div className="form__header">
          <h2 className="form__primary__heading">Add new Task</h2>
          <AddTaskIcon className="form__icon" />
        </div>

        <form className="form__employees" onSubmit={handleSubmit}>
          <TextField
            id="title"
            name="title"
            value={taskData.title}
            label="Title"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            id="description"
            name="description"
            value={taskData.description}
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
              value={taskData.assignee}
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
            value={taskData.dueDate}
            InputLabelProps={{ shrink: true }}
            label="Due Date"
            variant="outlined"
            type="date"
            onChange={handleChange}
          />

          <Button
            // style={{
            //   padding: "1rem 0.6rem",
            //   borderRadius: "0.3rem",
            //   width: "100%",
            //   fontSize: "1.2rem",
            //   fontWeight: 600,
            //   cursor: "pointer",
            // }}
            startIcon={<AddTaskIcon />}
            variant="contained"
            color="primary"
            type="submit"
          >
            Add
          </Button>
        </form>

        <AllTasks />
      </div>
    </Layout>
  );
};

export default TasksForm;
