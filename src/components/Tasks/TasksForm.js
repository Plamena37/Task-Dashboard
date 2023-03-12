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
import "./TasksForm.css";

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

  // ***************** Handle Change Function *****************
  const handleChange = (event) => {
    const { value, name } = event.target;

    // Having controlled input
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  // ***************** Handle Submit Function *****************
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
      //Set the new task
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
      <section className="background">
        <div className="section__header">
          <h2 className="section__heading">Add Task</h2>
          <AddTaskIcon className="section__icon" />
        </div>

        <form className="form__tasks wrapper--white" onSubmit={handleSubmit}>
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
            rows={1}
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
            startIcon={<AddTaskIcon />}
            variant="contained"
            color="primary"
            type="submit"
            className="form__btn--tasks"
          >
            Add
          </Button>
        </form>

        <AllTasks />
      </section>
    </Layout>
  );
};

export default TasksForm;
