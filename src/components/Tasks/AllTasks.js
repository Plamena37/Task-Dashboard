import { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import { TextField, Button } from "@mui/material";
import { TasksContext } from "../../context/TasksContextProvider";
import EditTaskPopUp from "./EditTaskPopUp";
import { EmployeeContext } from "../../context/EmployeesContextProvider";
import "./AllTasks.css";

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
      <div key={item.id} className="task__item hover--effect">
        {findAssigneeName(item.assignee)}
        <h3 className="task__info task__name">{item.title}</h3>
        <p className="task__desc">{item.description}</p>
        <p className="task__info">
          Assignee: <span className="task__data">{assigneeName}</span>
        </p>
        <p className="task__info">
          Due to Date: <span className="task__data">{item.dueDate}</span>
        </p>

        <section className="wrapper__buttons">
          <button
            className="btn edit__btn"
            onClick={() => handleEditTask(item)}
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

  const noTasksMessage = (
    <div className="message__container">
      <span>Sorry you haven't added any tasks yet.</span>
    </div>
  );

  return (
    <div className="wrapper">
      <div className="foreground__container">
        <h1 className="secondary__title">Your Tasks</h1>

        <div className="wrapper custom__slider">
          <div className="filter__and__delete__container">
            {allTasks.length !== 0 && (
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

          <div className="all__tasks__container">
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
