import { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import { EmployeeContext } from "../../context/EmployeesContextProvider";
import { TextField, Button } from "@mui/material";
import EditEmployeePopUp from "./EditEmployeePopUp";
import LoadingSpinner from "../Layout/LoadingSpinner";
import CelebrationIcon from "@mui/icons-material/Celebration";
import Tooltip from "@mui/material/Tooltip";
import "./AllEmployees.css";

const AllEmployees = () => {
  const [selectedEmployee, setSelectedEmployee] = useState({
    id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    monthlySalary: "",
  });

  const { allEmployees, deleteEmployee } = useContext(EmployeeContext);

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

  // ***************** Closes the Pop Up *****************
  const clearPopUpActive = () => {
    setPopUpActive(false);
  };

  // ***************** Handle Edit Function *****************
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

  // ***************** Render All Employees Function *****************
  const renderAllEmployees = () => {
    let filteredAllEmployees;

    // If there are no filteredAllEmployees it should
    // trigger a loading spinner until the data is loaded
    !filteredAllEmployees && <LoadingSpinner />;
    filteredAllEmployees = allEmployees;

    filteredAllEmployees = allEmployees.filter((item) =>
      item.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredAllEmployees.map((item) => (
      <div
        key={item.id}
        className={`employee__item ${
          changeStyle ? "change-style" : ""
        } hover--effect`}
      >
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

  // ***************** Show a message when there are no employees *****************
  const noEmployeesMessage = (
    <div className="message__container">
      <span>Sorry you haven't added any employees yet.</span>
    </div>
  );

  // ***************** Change Style on Components *****************
  const handleChangeStyle = () => {
    setChangeStyle((prevState) => !prevState);
  };

  return (
    <div className="wrapper">
      <div className="foreground__container">
        <h1 className="secondary__title">Your Employees</h1>
        <div className="btn__change__container">
          <Tooltip title="Must have at least one employee" placement="top">
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
            {/* Show search bar only if we have 1 or more employees */}
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
