import React, { useEffect } from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import UsersList from "./UsersList";
import Pizzaslist from "./Pizzaslist";
import Addpizza from "./Addpizza";
import Orderlist from "./Orderlist";

export default function Adminscreen() {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;

  useEffect(() => {
    if (!currentUser.isAdmin) {
      // Handle unauthorized access within SPA
      console.log("User is not admin. Redirecting...");
      // You can redirect or show a message
      // history.push('/');
    }
  }, [currentUser]);

  // Handle unauthorized access here
  if (!currentUser.isAdmin) {
    return <div>Unauthorized access</div>; // Placeholder for unauthorized access handling
  }

  return (
    <div className="row justify-content-center p-3">
      <div className="col-md-10">
        <h2 style={{ fontSize: "35px" }}>Admin Panel</h2>

        <ul className="adminfunctions">
          <li>
            <Link to="/admin/userslist" style={{ color: "white" }}>
              Users List
            </Link>
          </li>
          <li>
            <Link to="/admin/pizzaslist" style={{ color: "white" }}>
              Pizzas List
            </Link>
          </li>
          <li>
            <Link to="/admin/addpizza" style={{ color: "white" }}>
              Add Pizza
            </Link>
          </li>
          <li>
            <Link to="/admin/orderslist" style={{ color: "white" }}>
              Orders List
            </Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
}
