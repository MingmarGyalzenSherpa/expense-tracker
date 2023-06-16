import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  faDollarSign,
  faHome,
  faMoneyBill,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
export default function Sidebar() {
  const [activeLink, setActiveLink] = useState(0);
  const Navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("auth");
    Navigate("/login");
  };
  const sidebarItems = [
    {
      redirect: "/dashboard/home",
      displayName: "Home",
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    {
      redirect: "/dashboard/expenses",
      displayName: "Expenses",
      icon: <FontAwesomeIcon icon={faMoneyBill} />,
    },
    {
      redirect: "/dashboard/incomes",
      displayName: "Income",
      icon: <FontAwesomeIcon icon={faDollarSign} />,
    },
  ];
  return (
    <div className="sidebar">
      <ul className="sidebar-ul">
        {sidebarItems.map((item, i) => {
          return (
            <Link
              key={i}
              onClick={() => setActiveLink(i)}
              to={item.redirect}
              className={`sidebar-item ${i === activeLink ? "active" : ""}`}
            >
              <div className="sidebar-item-content ">
                {item.icon}
                <span>{item.displayName}</span>
              </div>
            </Link>
          );
        })}
        <Link key="logout" onClick={handleLogout} className="sidebar-item">
          <div className="sidebar-item-content ">
            <FontAwesomeIcon icon={faUser} />
            <span>Logout</span>
          </div>
        </Link>

        {/* <li>
          {" "}
          <a href="/dashboard/home">Home</a>
        </li>
        <li>
          {" "}
          <a href="/dashboard/expenses">Expenses</a>
        </li> */}
      </ul>
    </div>
  );
}
