import { useContext, useState } from "react";
import { EmployeeContext } from "../../context/EmployeesContextProvider";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create";
import "./EditEmployeePopUp.css";

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

  const handleChange = (event) => {
    const { value, name } = event.target;

    setEditedEmployee({
      ...editedEmployee,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editEmployee(editedEmployee);
    clear();
  };

  return (
    <div className={popUpActive ? "pop-up-container active" : "hidden"}>
      <div className="exit-button-container">
        <button className="exit-button">
          <CloseIcon onClick={clear} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="note">
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

        <button className="save-changes-button">
          <CreateIcon />
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditEmployeePopUp;
