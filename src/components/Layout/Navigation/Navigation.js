import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <Link to="/" className="router__link">
          <li className="nav__list__item">Home</li>
        </Link>
        <Link to="/tasks" className="router__link">
          <li className="nav__list__item">Tasks</li>
        </Link>
        <Link to="/managers" className="router__link">
          <li className="nav__list__item">Managers</li>
        </Link>
        <Link to="/dashboard" className="router__link">
          <li className="nav__list__item">Dashboard</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navigation;
