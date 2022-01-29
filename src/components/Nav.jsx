import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Nav.css";

const Nav = () => {
  const [menu, setMenu] = useState(false);
  const [dis, setDis] = useState("none");

  useEffect(() => {
    return () => {
      if (menu) {
        setDis("block");
        setMenu(false);
      } else {
        setDis("none");
      }
    };
  }, [menu]);

  return (
    <div>
      <nav className="nav__list">
        <div>
          <Link to="/">
            <h1>Covid-19 Tracker</h1>
          </Link>
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/vaccine">Vaccine</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <nav className="nav_min">
        <div>
          <Link to="/">
            <h1>Covid-19 Tracker</h1>
          </Link>
          <ul style={{ display: dis }} onClick={() => setDis("none")}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/vaccine">Vaccine</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
          <FontAwesomeIcon
            icon={faBars}
            className="nav_min_burger"
            onClick={() => setMenu(!menu)}
          />
        </div>
      </nav>
    </div>
  );
};

export default Nav;
