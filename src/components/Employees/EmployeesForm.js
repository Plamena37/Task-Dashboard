import { useSnackbar } from "notistack";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { TextField, Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useContext, useState } from "react";
import { EmployeeContext } from "../../context/EmployeesContextProvider";
import AllEmployees from "./AllEmployees";
import Layout from "../Layout/Layout";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import "./EmployeesForm.css";

// Create a custom theme for the Material UI components
const theme = createTheme({
  palette: {
    primary: {
      main: "#24a278",
    },
  },
});

const EmployeesForm = () => {
  const [employeeData, setEmployeeData] = useState({
    id: uuidv4(),
    fullName: "",
    email: "",
    phoneNumber: 0,
    birthDate: "",
    monthlySalary: 0,
  });

  const { addToEmployeesData } = useContext(EmployeeContext);

  const { enqueueSnackbar } = useSnackbar();

  // Get the current date
  let currentDate = new Date();

  // Creating yyyy-mm-dd current date format
  let currentYear = currentDate.getFullYear().toString();
  let currentMonth = currentDate.getMonth() + 1;
  let currentDay = currentDate.getDate();

  if (currentMonth < 10) {
    currentMonth = `0${currentMonth}`;
  }
  if (currentDay < 10) {
    currentDay = `0${currentDay}`;
  }
  const currentDateFinal = `${currentYear}-${currentMonth}-${currentDay}`;

  // ***************** Handle Change Function *****************
  const handleChange = (event) => {
    const { value, name } = event.target;

    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  // ***************** Handle Submit Function *****************
  const handleSubmit = (event) => {
    //Prevents the page from reloading
    event.preventDefault();

    if (
      employeeData.fullName === "" ||
      employeeData.email === "" ||
      employeeData.phoneNumber.length < 9 ||
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
    <Layout>
      <ThemeProvider theme={theme}>
        <section className="background">
          <div className="section__header">
            <h2 className="section__heading">Add Employee</h2>
            <PersonAddAltIcon className="section__icon" />
          </div>

          <form
            className="form__employees wrapper--white"
            onSubmit={handleSubmit}
          >
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

            {/* In props we have "max: currentDateFinal" so that 
                a user can not pick a future day as his birth day */}
            <TextField
              id="birthDate"
              name="birthDate"
              value={employeeData.birthDate}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                inputProps: { max: currentDateFinal },
              }}
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
              startIcon={<PersonAddAltIcon />}
              variant="contained"
              color="primary"
              type="submit"
              className="form__btn"
            >
              Add
            </Button>
          </form>

          <AllEmployees />
        </section>
      </ThemeProvider>
    </Layout>
  );
};

export default EmployeesForm;
