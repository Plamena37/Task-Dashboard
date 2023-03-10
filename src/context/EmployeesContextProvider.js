import React, { useEffect, useState } from "react";

//------------------------ Creating the context ------------------------
export const EmployeeContext = React.createContext({
  allEmployees: [],
  addToEmployeesData: () => {},
  editEmployee: () => {},
  deleteEmployee: () => {},
  clearAllEmployees: () => {},
});

function EmployeesContextProvider(props) {
  //------------------------ Declare the state ------------------------
  const [allEmployees, setAllEmployees] = useState([]);

  /* Explanation
          Gets the current notesData from the local browser storage
          Set the state (parses the data from a string to obj, or display an empty array if there is no data)
  
          Note: This is a useEffect hook that means this is a side effect to the main functionality of the component.
          You can set this hook to be initialized only once by setting the second parameter to [].
      */
  useEffect(() => {
    const employeesDataJson = localStorage.getItem("employeesData");
    setAllEmployees(JSON.parse(employeesDataJson) || []);
  }, []);

  //------------------------ Create Employee ------------------------
  /*Explanation
          Set the new state (spread the array allEmployees and add the new note to it)
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
  function editEmployee(employee) {
    const filteredArray = allEmployees.filter(
      (item) => item.id !== employee.id
    );
    const newEmployees = [employee, ...filteredArray];
    setAllEmployees(newEmployees);
    const employeesDataJson = JSON.stringify(newEmployees);
    localStorage.setItem("employeesData", employeesDataJson);
  }

  //------------------------ Delete Employee ------------------------
  /* Explanation
          Set the new state (removes the item from the state)
          Parse the array from obj to string
          Update the local storage
      */
  function deleteEmployee(employee) {
    setAllEmployees(allEmployees.filter((item) => item !== employee));
    const employeesDataJson = JSON.stringify(allEmployees);
    localStorage.setItem("employeesData", employeesDataJson);
  }

  // ------------------------ Delete all Notes ------------------------
  /* Explanation
          Check if the array is empty
          empty:
              - Displays an alert that shows there is no notes to delete
          not empty:
              - Clears the value of allEmployees array
              - Clears the local storage
      */
  function clearAllEmployees() {
    if (allEmployees.length === 0) {
      alert("There are no employees to delete..");
    } else {
      setAllEmployees([]);
      localStorage.clear();
    }
  }

  return (
    <EmployeeContext.Provider
      value={{
        allEmployees: allEmployees,
        addToEmployeesData: addToEmployeesData,
        editEmployee: editEmployee,
        deleteEmployee: deleteEmployee,
        clearAllEmployees: clearAllEmployees,
      }}
    >
      {/*Passes down all of the functions*/}
      {props.children}
    </EmployeeContext.Provider>
  );
}

export default EmployeesContextProvider;
