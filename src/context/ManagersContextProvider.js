import React, { useEffect, useState } from "react";

//------------------------ Creating the context ------------------------
export const ManagersContext = React.createContext({
  allManagers: [],
  addToManagersData: () => {},
  editManager: () => {},
  deleteManager: () => {},
});

const ManagersContextProvider = ({ children }) => {
  //------------------------ Declare the state ------------------------
  const [allManagers, setAllManagers] = useState([]);

  useEffect(() => {
    const managersDataJson = localStorage.getItem("managersData");
    setAllManagers(JSON.parse(managersDataJson) || []);
  }, []);

  const addToManagersData = (newManager) => {
    const newManagers = [newManager, ...allManagers];
    setAllManagers(newManagers);
    const managersDataJson = JSON.stringify(newManagers);
    localStorage.setItem("managersData", managersDataJson);
  };

  //------------------------ Edit Task ------------------------
  const editManager = (manager) => {
    const filteredArray = allManagers.filter((item) => item.id !== manager.id);
    const newManagers = [manager, ...filteredArray];
    setAllManagers(newManagers);
    const managersDataJson = JSON.stringify(newManagers);
    localStorage.setItem("managersData", managersDataJson);
  };

  //------------------------ Delete Task ------------------------
  const deleteManager = (manager) => {
    setAllManagers(allManagers.filter((item) => item !== manager));
    const managersDataJson = JSON.stringify(allManagers);
    localStorage.setItem("managersData", managersDataJson);
  };

  return (
    <ManagersContext.Provider
      value={{
        allManagers: allManagers,
        addToManagersData: addToManagersData,
        editManager: editManager,
        deleteManager: deleteManager,
      }}
    >
      {children}
    </ManagersContext.Provider>
  );
};

export default ManagersContextProvider;
