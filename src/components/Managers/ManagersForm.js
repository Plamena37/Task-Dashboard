import { useSnackbar } from "notistack";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
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
import { ManagersContext } from "../../context/ManagersContextProvider";
import AllManagers from "./AllManagers";
import "./ManagersForm.css";

const ManagersForm = () => {
  const [managerData, setManagerData] = useState({
    id: uuidv4(),
    fullName: "",
    email: "",
    taskWorking: "",
    employeeWorking: "",
  });

  const { allEmployees } = useContext(EmployeeContext);

  const { allTasks } = useContext(TasksContext);

  const { allManagers, addToManagersData } = useContext(ManagersContext);

  const { enqueueSnackbar } = useSnackbar();

  // ***************** Handle Change Function *****************
  const handleChange = (event) => {
    const { value, name } = event.target;

    setManagerData({
      ...managerData,
      [name]: value,
    });
  };

  // ***************** Handle Submit Function *****************
  const handleSubmit = (event) => {
    //Prevents the page from reloading
    event.preventDefault();

    if (
      managerData.fullName === "" ||
      managerData.email === "" ||
      managerData.taskWorking === "" ||
      managerData.employeeWorking === ""
    ) {
      //Check if the form is empty
      enqueueSnackbar("Please fill all of the fields before submitting!", {
        variant: "info",
        preventDuplicate: true,
      });
    } else {
      setManagerData(managerData);
      //Sets the new task
      addToManagersData(managerData);
      enqueueSnackbar("Task added!", {
        variant: "success",
      });
    }

    //Clear the form after submission.
    setManagerData({
      id: uuidv4(),
      fullName: "",
      email: "",
      taskWorking: "",
      employeeWorking: "",
    });
  };

  return (
    <Layout>
      <section className="background">
        <div className="section__header">
          <h2 className="section__heading">Add Manager</h2>
          <ManageAccountsIcon className="section__icon" />
        </div>

        <form className="form__managers wrapper--white" onSubmit={handleSubmit}>
          <TextField
            id="fullName"
            name="fullName"
            value={managerData.fullName}
            label="Full Name"
            variant="outlined"
            onChange={handleChange}
          />

          <TextField
            id="email"
            name="email"
            value={managerData.email}
            label="Email"
            variant="outlined"
            type="email"
            onChange={handleChange}
          />

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">
              Working on task:
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="taskWorking"
              name="taskWorking"
              value={managerData.taskWorking}
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
              value={managerData.employeeWorking}
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

          <Button
            startIcon={<ManageAccountsIcon />}
            variant="contained"
            color="primary"
            type="submit"
            className="submit__manager--btn"
          >
            Add
          </Button>
        </form>

        <AllManagers />
      </section>
    </Layout>
  );
};

export default ManagersForm;
