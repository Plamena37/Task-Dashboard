import { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import { TextField, Button } from "@mui/material";
import { TasksContext } from "../../context/TasksContextProvider";
import EditTaskPopUp from "./EditTaskPopUp";
import { EmployeeContext } from "../../context/EmployeesContextProvider";
import CelebrationIcon from "@mui/icons-material/Celebration";
import Tooltip from "@mui/material/Tooltip";
import "./AllTasks.css";

const AllTasks = () => {
  const [selectedTask, setSelectedTask] = useState({
    id: "",
    title: "",
    description: "",
    assignee: "",
    dueDate: "",
  });

  const { allTasks, deleteTask } = useContext(TasksContext);

  const { allEmployees } = useContext(EmployeeContext);

  const [popUpActive, setPopUpActive] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [changeStyle, setChangeStyle] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // ***************** Handle Delete Function with Notistack Pop Up *****************
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

  // ***************** Closes the Pop Up *****************
  const clearPopUpActive = () => {
    setPopUpActive(false);
  };

  // ***************** Handle Edit Function *****************
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

  /* In local storage in tasksData we save the assignee with
  // his id and not his name and here to retrieve the name we map over the  
  // employees array to find the employee with the same id as in the task 
  */
  let assigneeName;
  const findAssigneeName = (taskAssigneeId) => {
    allEmployees.map((employee) => {
      if (employee.id == taskAssigneeId) {
        assigneeName = employee.fullName;
      }
    });
  };

  // ***************** Render All Tasks Function *****************
  const renderAllTasks = () => {
    let filteredAllTasks = allTasks;

    filteredAllTasks = allTasks.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredAllTasks.map((item) => (
      <div
        key={item.id}
        className={`task__item ${
          changeStyle ? "change-style__task" : ""
        } hover--effect`}
      >
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

  // ***************** Show a message when there are no tasks *****************
  const noTasksMessage = (
    <div className="message__container">
      <span>Sorry you haven't added any tasks yet.</span>
    </div>
  );

  // ***************** Change Style on Components *****************
  const handleChangeStyle = () => {
    setChangeStyle((prevState) => !prevState);
  };

  return (
    <div className="wrapper">
      <div className="foreground__container">
        <h1 className="secondary__title">Your Tasks</h1>
        <div className="btn__change__container">
          <Tooltip title="Must have at least one task" placement="top">
            <button
              className="btn btn--change-style"
              onClick={handleChangeStyle}
            >
              click me <CelebrationIcon />
            </button>
          </Tooltip>
        </div>

        <div className="wrapper custom__slider">
          <div className="filter__and__delete__container">
            {/* Show search bar only if we have 1 or more tasks */}
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
            {/*Display the saved tasks*/}
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
