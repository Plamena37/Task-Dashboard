import { useSnackbar } from "notistack";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { TextField, Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useContext, useState } from "react";
import { EmployeeContext } from "../../context/EmployeesContextProvider";

const Employees = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { addToEmployeesData } = useContext(EmployeeContext);

  const [employeeData, setEmployeeData] = useState({
    id: "",
    fullName: "",
    email: "",
    phoneNumber: 0,
    birthDate: "",
    monthlySalary: 0,
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    //Prevents the page from reloading
    event.preventDefault();

    if (
      employeeData.fullName === "" ||
      employeeData.email === "" ||
      employeeData.phoneNumber.length < 10 ||
      employeeData.birthDate === "" ||
      employeeData.monthlySalary === 0
    ) {
      //Check if the form is empty
      enqueueSnackbar("Please fill all of the fields before submitting!", {
        variant: "info",
        preventDuplicate: true,
      });
    } else {
      setEmployeeData({ ...employeeData, id: uuidv4() });
      //Sets the new employee
      addToEmployeesData(employeeData);
      enqueueSnackbar("Employee added!", {
        variant: "success",
      });
    }

    //Clear the form after submission.
    setEmployeeData({
      id: uuidv4(),
      fullName: "",
      email: "",
      phoneNumber: 0,
      birthDate: "",
      monthlySalary: 0,
    });
  };

  return (
    <div className="employees__layout">
      <div className="form__header">
        <h2 className="form__primary__heading">Add new Employee</h2>
        <PersonAddAltIcon className="form__icon" />
      </div>

      <form className="form__employees" onSubmit={handleSubmit}>
        <TextField
          id="fullName"
          name="fullName"
          value={employeeData.fullName}
          label="Full Name"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="email"
          name="email"
          value={employeeData.email}
          label="Email"
          variant="outlined"
          type="email"
          onChange={handleChange}
        />
        <TextField
          id="phoneNumber"
          name="phoneNumber"
          value={employeeData.phoneNumber}
          label="Phone Number"
          variant="outlined"
          type="number"
          onChange={handleChange}
        />
        <TextField
          id="birthDate"
          name="birthDate"
          value={employeeData.birthDate}
          InputLabelProps={{ shrink: true }}
          label="Birth Date"
          variant="outlined"
          type="date"
          onChange={handleChange}
        />
        <TextField
          id="monthlySalary"
          name="monthlySalary"
          value={employeeData.monthlySalary}
          label="Monthly Salary $"
          variant="outlined"
          type="number"
          onChange={handleChange}
        />

        <Button
          // style={{
          //   padding: "1rem 0.6rem",
          //   borderRadius: "0.3rem",
          //   width: "100%",
          //   fontSize: "1.2rem",
          //   fontWeight: 600,
          //   cursor: "pointer",
          // }}
          startIcon={<PersonAddAltIcon />}
          variant="contained"
          color="primary"
          type="submit"
        >
          Add
        </Button>
      </form>
    </div>
  );
};

export default Employees;
