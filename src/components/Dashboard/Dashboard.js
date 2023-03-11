import Layout from "../Layout/Layout";
import { useContext, useState, useEffect } from "react";
import { TasksContext } from "../../context/TasksContextProvider";
import { EmployeeContext } from "../../context/EmployeesContextProvider";
import { ManagersContext } from "../../context/ManagersContextProvider";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import ListIcon from "@mui/icons-material/List";
import "./Dashboard.css";

const Dashboard = () => {
  const { allEmployees } = useContext(EmployeeContext);

  const { allTasks } = useContext(TasksContext);

  const { allManagers } = useContext(ManagersContext);

  const [topFiveEmployees, setTopFiveEmployees] = useState([]);

  const employeesAndTasks = {};
  let sortedTasks = [];

  useEffect(() => {
    /*
    Here we map over the employees and tasks to find which employee on which task is 
    working and to get his name.

    Then we check in the "employeesAndTasks" object if we have an employee with that name as a key. 
    If we don't we create one and assign him a value of 1 (for one task),
    if we already have, we add +1 to the other tasks.
    */
    allEmployees.map((employee) => {
      allTasks.map((task) => {
        if (employee.id == task.assignee) {
          let employeeName = employee.fullName;

          if (!employeesAndTasks[employeeName]) {
            employeesAndTasks[employeeName] = 1;
          } else if (employeesAndTasks[employeeName]) {
            employeesAndTasks[employeeName] += 1;
          }
        }
      });
    });

    /*
    We loop over the "employeesAndTasks" object and push and array with the name and 
    tasks and we get [["Plamena", 1], ["Hristo", 3]]
   */
    for (const [employee, task] of Object.entries(employeesAndTasks)) {
      sortedTasks.push([employee, task]);
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
      let [employee, taskCount] = employeeArray;

      return (
        <li className="top__employees__list">
          <span className="top__employees">{employee}</span>, finished{" "}
          <span className="top__employees">{taskCount}</span> tasks 🎉🎉🎉
        </li>
      );
    });
  };

  let openTasks = allTasks.map((task) => {
    return (
      <li className="open__tasks__list hover--effect">
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
            <h2 className="section__heading">Top 5 Employees</h2>
            <VolunteerActivismIcon className="section__icon" />
          </div>
          <ul className="top__employees__container">
            {topFiveEmployees.length === 0
              ? "No employees"
              : renderTopFiveEmployees()}
          </ul>
        </section>

        <section className="wrapper container">
          <div className="section__header">
            <h2 className="section__heading">Open Tasks</h2>
            <ListIcon className="section__icon" />
          </div>
          <ul className="open__tasks__container">{openTasks}</ul>
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;
