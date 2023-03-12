import Layout from "../Layout/Layout";
import { useContext, useState, useEffect } from "react";
import { TasksContext } from "../../context/TasksContextProvider";
import { EmployeeContext } from "../../context/EmployeesContextProvider";
import { ManagersContext } from "../../context/ManagersContextProvider";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import ListIcon from "@mui/icons-material/List";
import CelebrationIcon from "@mui/icons-material/Celebration";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import "./Dashboard.css";

const Dashboard = () => {
  const { allEmployees } = useContext(EmployeeContext);

  const { allTasks } = useContext(TasksContext);

  const { allManagers } = useContext(ManagersContext);

  const [topFiveEmployees, setTopFiveEmployees] = useState([]);

  const [changeStyle, setChangeStyle] = useState(false);

  const employeesAndTasks = {};
  let sortedTasks = [];
  let tasksFinishedThirtydaysAgo = [];

  useEffect(() => {
    /*
    Here we map over the employees and tasks to find which employee on which task is 
    working and get his name.

    Then we check in the "employeesAndTasks" object if we have an employee with that name as a key. 
    If we don't we create one and assign him a value of 1 (for one task) and assign the due date of the task,
    if we already have, we add +1 to the other tasks and again add the due date of the current task.
    */
    allEmployees.map((employee) => {
      allTasks.map((task) => {
        if (employee.id == task.assignee) {
          let employeeName = employee.fullName;

          if (!employeesAndTasks[employeeName]) {
            employeesAndTasks[employeeName] = {
              tasks: 1,
              date: task.dueDate,
            };
          } else if (employeesAndTasks[employeeName]) {
            employeesAndTasks[employeeName] = {
              tasks: employeesAndTasks[employeeName].tasks + 1,
              date: task.dueDate,
            };
          }
        }
      });
    });

    /*
    We loop over the "employeesAndTasks" object and push and array with the name, 
    tasks and due date. For example: [["Plamena", 1, "2023-04-29"], ["Hristo", 3, "2023-03-10"]]
   */
    for (const [employeeName, employeeDataObj] of Object.entries(
      employeesAndTasks
    )) {
      let employeeTasks = employeeDataObj.tasks;
      let employeeDueDate = employeeDataObj.date;

      sortedTasks.push([employeeName, employeeTasks, employeeDueDate]);
    }

    /*
    We sort in descending order according to the tasks and then we set the state
    with the first 5 from the sorted array
    */
    sortedTasks.sort((a, b) => b[1] - a[1]);
    setTopFiveEmployees(sortedTasks.slice(0, 5));
  }, []);

  // ***************** Render Top Five Employees Function *****************
  const renderTopFiveEmployees = () => {
    return topFiveEmployees.map((employeeArray) => {
      let [employee, taskCount, dueDate] = employeeArray;

      return (
        <li className="top__employees__list">
          <span className="top__employees">{employee}</span>, working on{" "}
          <span className="top__employees">{taskCount}</span>{" "}
          {taskCount === 1 ? "task" : "tasks"}🎉
        </li>
      );
    });
  };

  // ***************** Change Style on Components *****************
  const handleChangeStyle = () => {
    setChangeStyle((prevState) => !prevState);
  };

  // ***************** Handle the employees who have done the most tasks in the last 30 days *****************
  const handleTopFiveEmployees = () => {
    return topFiveEmployees.map((employeeArray) => {
      let [employee, taskCount, dueDate] = employeeArray;

      /*
      Here we get the current date, convert the "dueDate" from the tasks date, and create a new date based on
      today's date from which we subtract 30 days.
      Then we make a check if the "dueDate" is between the today's date or 30 days ago, and if so we push into
      new array the employee name and the tasks he made. 
      */
      let todaysDate = new Date();
      let convertDueDate = new Date(dueDate);
      let priorThirtyDaysDate = new Date(
        new Date().setDate(todaysDate.getDate() - 30)
      );

      let checkForDate =
        convertDueDate.getTime() < todaysDate.getTime() &&
        convertDueDate.getTime() >= priorThirtyDaysDate.getTime();

      if (checkForDate) {
        tasksFinishedThirtydaysAgo.push([employee, taskCount]);
      }
    });
  };
  handleTopFiveEmployees();

  // ***************** Render five Employees who completed tasks before 30 days *****************
  let employeesWhoCompletedTasksBefore30Days = tasksFinishedThirtydaysAgo.map(
    (employee) => {
      let [employeeName, tasks] = employee;

      return (
        <li className="top__employees__list">
          <span className="top__employees">{employeeName}</span> finished{" "}
          <span className="top__employees">{tasks} </span>
          {tasks === 1 ? "task " : "tasks "}
          in the last 30 days🎉
        </li>
      );
    }
  );

  let openTasks = allTasks.map((task) => {
    let taskDueDateString = task.dueDate;

    let todaysDate = new Date();
    let taskDueDate = new Date(taskDueDateString);

    // If the task's due date has already passed we return and don't show it
    if (taskDueDate.getTime() < todaysDate.getTime()) {
      return;
    }

    return (
      <li
        className={`open__tasks__list ${
          changeStyle ? "change-style" : ""
        } hover--effect`}
      >
        <h4 className="open__task__heading">{task.title}</h4>
        <p className="open__tasks__team">
          Main Team:{" "}
          <span className="oblique">
            {/* Here we map over the managers array to check if the current task has
            a manager working on it */}
            {allManagers.map((manager) =>
              manager.taskWorking == task.id ? (
                <span>{manager.fullName} </span>
              ) : (
                ""
              )
            )}
            ,{" "}
            {/* Here we map over the managers array to check if the manager is working 
            together with an employee on the current task */}
            {allManagers.map((manager) =>
              allEmployees.map((employee) => {
                if (
                  manager.taskWorking == task.id &&
                  manager.employeeWorking == employee.id
                ) {
                  return <span>{employee.fullName} </span>;
                }
              })
            )}{" "}
          </span>
          {/* Here we map over the employees array to check if the current task
          has any employee working on it */}
          {allEmployees.map((employee) => {
            if (task.assignee == employee.id) {
              return (
                <p className="open__tasks__team">
                  Additional Workers:{" "}
                  <span className="oblique">{employee.fullName}</span>
                </p>
              );
            }
          })}
        </p>
      </li>
    );
  });

  return (
    <Layout>
      <div className="background dashboard__container">
        <section className="wrapper container top__employees">
          <div className="section__header">
            <h2 className="section__heading">Employees Workflow</h2>
            <VolunteerActivismIcon className="section__icon" />
          </div>
          <ul className="top__employees__container">
            {topFiveEmployees.length === 0
              ? "No employees"
              : renderTopFiveEmployees()}
          </ul>
        </section>

        <section className="wrapper container top__employees">
          <div className="section__header">
            <h2 className="section__heading">
              Completed tasks in the last 30 days
            </h2>
            <PlaylistAddCheckIcon className="section__icon" />
          </div>
          <ul className="top__employees__container special">
            {employeesWhoCompletedTasksBefore30Days.length === 0
              ? "No tasks finished in the last 30 days"
              : employeesWhoCompletedTasksBefore30Days}
          </ul>
        </section>

        <section className="wrapper container">
          <div className="section__header">
            <h2 className="section__heading">Open Tasks</h2>
            <ListIcon className="section__icon" />
          </div>
          <div className="btn__change__container">
            <button
              className="btn btn--change-style"
              onClick={handleChangeStyle}
            >
              click me <CelebrationIcon />
            </button>
          </div>
          <ul className="open__tasks__container">{openTasks}</ul>
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;
