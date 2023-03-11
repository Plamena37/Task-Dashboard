import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <div className="navbar">
      <div className="nav__logo__wrapper">
        <Link to="/" className="router__link logo">
          <h3 className="nav__header">Home</h3>
        </Link>
        <Link to="/tasks" className="router__link logo">
          <h3 className="nav__header">Tasks</h3>
        </Link>
        <Link to="/managers" className="router__link logo">
          <h3 className="nav__header">Managers</h3>
        </Link>
        <Link to="/dashboard" className="router__link logo">
          <h3 className="nav__header">Dashboard</h3>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
