import React, { useEffect, useState } from "react";

//------------------------ Creating the context ------------------------
export const EmployeeContext = React.createContext({
  allEmployees: [],
  addToEmployeesData: () => {},
  editEmployee: () => {},
  deleteEmployee: () => {},
});

const EmployeesContextProvider = ({ children }) => {
  //------------------------ Declare the state ------------------------
  const [allEmployees, setAllEmployees] = useState([]);

  /* Explanation
          Get the current employeesData from the local storage
          Set the state (parses the data from a string to object, or display an empty array if there is no data)
  
          Note: This is a useEffect hook that means this is a side effect to the main functionality of the component.
          You can set this hook to be initialized only once by setting the second parameter to [].
      */
  useEffect(() => {
    const employeesDataJson = localStorage.getItem("employeesData");
    setAllEmployees(JSON.parse(employeesDataJson) || []);
  }, []);

  //------------------------ Create Employee ------------------------
  /*Explanation
          Set the new state (spread the array allEmployees and add the new employee to it)
          Parse the array to string format
          Update the local storage
      */
  const addToEmployeesData = (newEmployee) => {
    const newEmployees = [newEmployee, ...allEmployees];
    setAllEmployees(newEmployees);
    const employeesDataJson = JSON.stringify(newEmployees);
    localStorage.setItem("employeesData", employeesDataJson);
  };

  //------------------------ Edit Employee ------------------------
  const editEmployee = (employee) => {
    const filteredArray = allEmployees.filter(
      (item) => item.id !== employee.id
    );
    const newEmployees = [employee, ...filteredArray];
    setAllEmployees(newEmployees);
    const employeesDataJson = JSON.stringify(newEmployees);
    localStorage.setItem("employeesData", employeesDataJson);
  };

  //------------------------ Delete Employee ------------------------
  /* Explanation
          Set the new state (remove the item from the state)
          Parse the array from object to string
          Update the local storage
      */
  const deleteEmployee = (employee) => {
    setAllEmployees(allEmployees.filter((item) => item !== employee));
    const employeesDataJson = JSON.stringify(allEmployees);
    localStorage.setItem("employeesData", employeesDataJson);
  };

  return (
    <EmployeeContext.Provider
      value={{
        allEmployees: allEmployees,
        addToEmployeesData: addToEmployeesData,
        editEmployee: editEmployee,
        deleteEmployee: deleteEmployee,
      }}
    >
      {/*Passe down all of the functions*/}
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeesContextProvider;
