import { useContext, useState } from "react";
import { EmployeeContext } from "../../context/EmployeesContextProvider";
import { Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create";
import { useSnackbar } from "notistack";
import "../../EditPopUp.css";

const EditEmployeePopUp = ({ employee, popUpActive, clear }) => {
  const [editedEmployee, setEditedEmployee] = useState({
    id: employee.id,
    fullName: employee.fullName,
    email: employee.email,
    phoneNumber: employee.phoneNumber,
    birthDate: employee.birthDate,
    monthlySalary: employee.monthlySalary,
  });

  const { editEmployee } = useContext(EmployeeContext);

  const { enqueueSnackbar } = useSnackbar();

  // ***************** Handle Change Function *****************
  const handleChange = (event) => {
    const { value, name } = event.target;

    setEditedEmployee({
      ...editedEmployee,
      [name]: value,
    });
  };

  // ***************** Handle Submit Function *****************
  const handleSubmit = (event) => {
    event.preventDefault();

    enqueueSnackbar("Success!", {
      variant: "success",
    });

    editEmployee(editedEmployee);
    clear();
  };

  return (
    <>
      <div className={popUpActive ? "popup__container active" : "hidden"}>
        <div className="exit__btn__container">
          <button className="exit__btn">
            <CloseIcon onClick={clear} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit__entity">
          <TextField
            id="fullName"
            name="fullName"
            value={editedEmployee.fullName}
            label="Full Name"
            variant="outlined"
            onChange={handleChange}
          />

          <TextField
            id="email"
            name="email"
            value={editedEmployee.email}
            label="Email"
            variant="outlined"
            type="email"
            onChange={handleChange}
          />

          <TextField
            id="phoneNumber"
            name="phoneNumber"
            value={editedEmployee.phoneNumber}
            label="Phone Number"
            variant="outlined"
            type="number"
            onChange={handleChange}
          />

          <TextField
            id="birthDate"
            name="birthDate"
            value={editedEmployee.birthDate}
            InputLabelProps={{ shrink: true }}
            label="Birth Date"
            variant="outlined"
            type="date"
            onChange={handleChange}
          />

          <TextField
            id="monthlySalary"
            name="monthlySalary"
            value={editedEmployee.monthlySalary}
            label="Monthly Salary $"
            variant="outlined"
            type="number"
            onChange={handleChange}
          />

          <button className="btn btn__save">
            <CreateIcon />
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default EditEmployeePopUp;
