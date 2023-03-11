import Layout from "../Layout/Layout";
import { useContext, useState, useEffect } from "react";
import { TasksContext } from "../../context/TasksContextProvider";
import { EmployeeContext } from "../../context/EmployeesContextProvider";
import { ManagersContext } from "../../context/ManagersContextProvider";

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
        <p>
          Employee: {employee}, Tasks: {taskCount} 🎉🎉🎉
        </p>
      );
    });
  };

  let openTasks = allTasks.map((task) => {
    return (
      <>
        <h4>Task: {task.title}</h4>
        <p>
          Main Team:{" "}
          {allManagers.map((manager) =>
            manager.taskWorking == task.id ? (
              <span>{manager.fullName} </span>
            ) : (
              ""
            )
          )}
          {allManagers.map((manager) =>
            allEmployees.map((employee) => {
              if (
                manager.taskWorking == task.id &&
                manager.employeeWorking == employee.id
              ) {
                return <span>{employee.fullName} </span>;
              }
            })
          )}
          {allEmployees.map((employee) => {
            if (task.assignee == employee.id) {
              return (
                <p>
                  Additional Workers: <span>{employee.fullName}</span>
                </p>
              );
            }
          })}
        </p>
      </>
    );
  });

  return (
    <Layout>
      {topFiveEmployees.length === 0 ? "No employees" : renderResult()}
      <section>
        <h2>Open Tasks</h2>

        {openTasks}
      </section>
    </Layout>
  );
};

export default Dashboard;
