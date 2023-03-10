import { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import { TextField, Button } from "@mui/material";
import { TasksContext } from "../../context/TasksContextProvider";
import EditTaskPopUp from "./EditTaskPopUp";
import { EmployeeContext } from "../../context/EmployeesContextProvider";

const AllTasks = () => {
  const { allTasks, deleteTask } = useContext(TasksContext);
  const { allEmployees } = useContext(EmployeeContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [selectedTask, setSelectedTask] = useState({
    id: "",
    title: "",
    description: "",
    assignee: "",
    dueDate: "",
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
            deleteTask(item);
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

  const handleEditTask = (item) => {
    setPopUpActive(!popUpActive);
    setSelectedTask({
      ...item,
      id: item.id,
      title: item.title,
      description: item.description,
      assignee: item.assignee,
      dueDate: item.dueDate,
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

  const renderAllTasks = () => {
    let filteredAllTasks = allTasks;

    filteredAllTasks = allTasks.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredAllTasks.map((item) => (
      <div key={item.id} className="note-item">
        {findAssigneeName(item.assignee)}
        <h3>Title: {item.title}</h3>
        <p>Description: {item.description}</p>
        {/* <p>Assignee: {item.assignee}</p> */}
        <p>Assignee: {assigneeName}</p>
        <p>Due to Date: {item.dueDate}</p>

        <section>
          <button
            className="note-item-option-buttons view-button"
            onClick={() => handleEditTask(item)}
          >
            Edit
          </button>

          <button
            className="note-item-option-buttons delete-button"
            onClick={() => handleDelete(item)}
          >
            Delete
          </button>
        </section>
      </div>
    ));
  };

  const noTasksMessage = (
    <div className="message-container">
      <span>Sorry you haven't added any tasks yet.</span>
    </div>
  );

  return (
    <div className="background">
      <div className="foreground-container">
        <h1 className="notes-title">Your Tasks</h1>

        <div className="wrapper custom-slider">
          <div className="filter-and-delete-container">
            {allTasks.length !== 0 && (
              <TextField
                id="search"
                name="search"
                label="Search.."
                variant="outlined"
                type="text"
                className="search-bar"
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            )}
          </div>

          <div className="all-notes-container">
            {/*Displays the saved tasks*/}
            {allTasks.length === 0 ? noTasksMessage : renderAllTasks()}
          </div>
        </div>
        {popUpActive && (
          <EditTaskPopUp
            task={selectedTask}
            popUpActive={popUpActive}
            clear={clearPopUpActive}
          />
        )}
      </div>
    </div>
  );
};

export default AllTasks;
