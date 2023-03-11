import { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import { TextField, Button } from "@mui/material";
import { ManagersContext } from "../../context/ManagersContextProvider";
import { EmployeeContext } from "../../context/EmployeesContextProvider";
import { TasksContext } from "../../context/TasksContextProvider";
import EditManagerPopUp from "./EditManagerPopUp";
import "./AllManagers.css";

const AllManagers = () => {
  const { allManagers, deleteManager } = useContext(ManagersContext);
  const { allEmployees } = useContext(EmployeeContext);
  const { allTasks } = useContext(TasksContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [selectedManager, setSelectedManager] = useState({
    id: "",
    fullName: "",
    email: "",
    taskWorking: "",
    employeeWorking: "",
  });
  const [popUpActive, setPopUpActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // HANDLING DELETE LOGIC
  const handleDelete = (item) => {
    const action = (key) => (
      <>
        <Button
          color="secondary"
          size="small"
          onClick={() => {
            deleteManager(item);
            closeSnackbar(key);
          }}
        >
          YES
        </Button>
        <Button
          color="secondary"
          size="small"
          onClick={() => {
            closeSnackbar(key);
          }}
        >
          NO
        </Button>
      </>
    );

    enqueueSnackbar("Proceed to delete?", {
      variant: "warning",
      preventDuplicate: true,
      persist: true,
      action,
    });
  };

  const clearPopUpActive = () => {
    setPopUpActive(false);
  };

  const handleEditManager = (item) => {
    setPopUpActive(!popUpActive);
    setSelectedManager({
      ...item,
      id: item.id,
      fullName: item.fullName,
      email: item.email,
      taskWorking: item.taskWorking,
      employeeWorking: item.employeeWorking,
    });
  };

  let assigneeName;
  const findAssigneeName = (itemId) => {
    allEmployees.map((employee) => {
      if (employee.id == itemId) {
        assigneeName = employee.fullName;
      }
    });
  };

  let taskName;
  const findTaskName = (itemId) => {
    allTasks.map((task) => {
      if (task.id == itemId) {
        taskName = task.title;
      }
    });
  };

  const renderAllManagers = () => {
    let filteredAllManagers = allManagers;

    filteredAllManagers = allManagers.filter((item) =>
      item.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredAllManagers.map((item) => (
      <div key={item.id} className="manager__item hover--effect">
        {findTaskName(item.taskWorking)}
        {findAssigneeName(item.employeeWorking)}
        <h3>Name: {item.fullName}</h3>
        <p>Email: {item.email}</p>
        {/* <p>Working on: {item.taskWorking}</p> */}
        <p>Working on: {taskName}</p>
        <p>Working with: {assigneeName}</p>

        <section className="wrapper__buttons">
          <button
            className="btn edit__btn"
            onClick={() => handleEditManager(item)}
          >
            Edit
          </button>

          <button
            className="btn delete__btn"
            onClick={() => handleDelete(item)}
          >
            Delete
          </button>
        </section>
      </div>
    ));
  };

  const noManagersMessage = (
    <div className="message__container">
      <span>Sorry you haven't added any managers yet.</span>
    </div>
  );

  return (
    <div className="wrapper">
      <div className="foreground__container">
        <h1 className="secondary__title">Your Managers</h1>

        <div className="wrapper custom__slider">
          <div className="filter__and__delete__container">
            {allManagers.length !== 0 && (
              <TextField
                id="search"
                name="search"
                label="Search.."
                variant="outlined"
                type="text"
                className="search__bar"
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            )}
          </div>

          <div className="all__managers__container">
            {/*Displays the saved managers*/}
            {allManagers.length === 0 ? noManagersMessage : renderAllManagers()}
          </div>
        </div>
        {popUpActive && (
          <EditManagerPopUp
            manager={selectedManager}
            popUpActive={popUpActive}
            clear={clearPopUpActive}
          />
        )}
      </div>
    </div>
  );
};

export default AllManagers;
