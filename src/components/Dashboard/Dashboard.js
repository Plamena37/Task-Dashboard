import Layout from "../Layout/Layout";
import { useContext, useState, useEffect } from "react";
import { TasksContext } from "../../context/TasksContextProvider";
import { EmployeeContext } from "../../context/EmployeesContextProvider";
import { ManagersContext } from "../../context/ManagersContextProvider";
import "./Dashboard.css";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import ListIcon from "@mui/icons-material/List";

const Dashboard = () => {
  const { allEmployees } = useContext(EmployeeContext);
  const { allTasks } = useContext(TasksContext);
  const { allManagers } = useContext(ManagersContext);

  const [topFiveEmployees, setTopEmployees] = useState([]);

  const employeesAndTasks = {};
  let sortedTasks = [];

  useEffect(() => {
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

    for (const [employee, task] of Object.entries(employeesAndTasks)) {
      sortedTasks.push([employee, task]);
    }
    sortedTasks.sort((a, b) => b[1] - a[1]);
    setTopEmployees(sortedTasks.slice(0, 5));
  }, []);

  // const getEmployeesWithTheMostTasks = () => {
  //   allEmployees.map((employee) => {
  //     allTasks.map((task) => {
  //       if (employee.id == task.assignee) {
  //         let employeeName = employee.fullName;

  //         if (!employeesAndTasks[employeeName]) {
  //           employeesAndTasks[employeeName] = 1;
  //         } else if (employeesAndTasks[employeeName]) {
  //           employeesAndTasks[employeeName] += 1;
  //         }
  //       }
  //     });
  //   });

  //   for (const [employee, task] of Object.entries(employeesAndTasks)) {
  //     sortedTasks.push([employee, task]);
  //   }
  //   sortedTasks.sort((a, b) => b[1] - a[1]);

  //   setTopEmployees(sortedTasks.slice(0, 2));
  // };

  const renderResult = () => {
    return topFiveEmployees.map((el) => {
      let [employee, taskCount] = el;

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
            {allManagers.map((manager) =>
              manager.taskWorking == task.id ? (
                <span>{manager.fullName} </span>
              ) : (
                ""
              )
            )}
            ,{" "}
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
            {topFiveEmployees.length === 0 ? "No employees" : renderResult()}
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
