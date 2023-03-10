import { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import { EmployeeContext } from "../../context/EmployeesContextProvider";
import { TextField, Button } from "@mui/material";
import EditEmployeePopUp from "./EditEmployeePopUp";
import LoadingSpinner from "../Layout/LoadingSpinner";

const AllEmployees = () => {
  const { allEmployees, deleteEmployee, clearAllEmployees } =
    useContext(EmployeeContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [selectedEmployee, setSelectedEmployee] = useState({
    id: "",
    fullName: "",
    email: "",
    phoneNumber: 0,
    birthDate: "",
    monthlySalary: 0,
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
            deleteEmployee(item);
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

  const handleEditEmployee = (item) => {
    setPopUpActive(!popUpActive);
    setSelectedEmployee({
      ...item,
      id: item.id,
      fullName: item.fullName,
      email: item.email,
      phoneNumber: item.phoneNumber,
      birthDate: item.birthDate,
      monthlySalary: item.monthlySalary,
    });
  };

  const renderAllEmployees = () => {
    let filteredAllEmployees;
    !filteredAllEmployees && <LoadingSpinner />;
    filteredAllEmployees = allEmployees;

    filteredAllEmployees = allEmployees.filter((item) =>
      item.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredAllEmployees.map((item) => (
      <div key={item.id} className="note-item">
        <h3>Full Name: {item.fullName}</h3>
        <p>Email: {item.email}</p>
        <p>Phone Number: {item.phoneNumber}</p>
        <p>Date of Birth: {item.birthDate}</p>
        <p>Monthly Salary: {item.monthlySalary}$</p>

        <section>
          <button
            className="note-item-option-buttons view-button"
            onClick={() => handleEditEmployee(item)}
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

  const noEmployeesMessage = (
    <div className="message-container">
      <span>Sorry you haven't added any employees yet.</span>
    </div>
  );

  return (
    <div className="background">
      <div className="foreground-container">
        <h1 className="notes-title">Your Employees</h1>

        <div className="wrapper custom-slider">
          <div className="filter-and-delete-container">
            {allEmployees.length !== 0 && (
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
            {/*Displays the saved employees*/}
            {allEmployees.length === 0
              ? noEmployeesMessage
              : renderAllEmployees()}
          </div>
        </div>
        {popUpActive && (
          <EditEmployeePopUp
            employee={selectedEmployee}
            popUpActive={popUpActive}
            clear={clearPopUpActive}
          />
        )}
      </div>
    </div>
  );
};

export default AllEmployees;
