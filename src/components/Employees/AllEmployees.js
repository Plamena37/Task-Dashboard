import { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import { EmployeeContext } from "../../context/EmployeesContextProvider";
import { TextField, Button } from "@mui/material";
import EditEmployeePopUp from "./EditEmployeePopUp";
import LoadingSpinner from "../Layout/LoadingSpinner";
import "./AllEmployees.css";

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
      <div key={item.id} className="employee__item hover--effect">
        <h3 className="employee__info employee__name">Name: {item.fullName}</h3>
        <p className="employee__info">
          Email: <span className="employee__data">{item.email}</span>
        </p>
        <p className="employee__info">
          Phone Number:{" "}
          <span className="employee__data">{item.phoneNumber}</span>
        </p>
        <p className="employee__info">
          Date of Birth:{" "}
          <span className="employee__data">{item.birthDate}</span>
        </p>
        <p className="employee__info">
          Monthly Salary:{" "}
          <span className="employee__data">{item.monthlySalary}$</span>
        </p>

        <section className="wrapper__buttons">
          <button
            className="btn edit__btn"
            onClick={() => handleEditEmployee(item)}
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

  const noEmployeesMessage = (
    <div className="message__container">
      <span>Sorry you haven't added any employees yet.</span>
    </div>
  );

  return (
    <div className="wrapper">
      <div className="foreground__container">
        <h1 className="secondary__title">Your Employees</h1>

        <div className="wrapper custom__slider">
          <div className="filter__and__delete__container">
            {allEmployees.length !== 0 && (
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

          <div className="all__employees__container">
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
