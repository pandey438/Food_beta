import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/userAction";
export default function Navbar() {
  const cartstate = useSelector((state) => state.cartReducer);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const dispatch = useDispatch();
  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow p-3 mb-5 bg-body rounded ">
        <div class="container-fluid">
          <a className="navbar-brand" href="/">
            AL-Pino's Pizza
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav ms-auto">
              {currentUser ? (
                <div className="dropdown mt-2">
                  <a
                    className="nav-link dropdown-toggle md-5"
                    style={{ color: "black" }}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {currentUser.name}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/orders">
                        Orders
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => {
                          dispatch(logoutUser());
                        }}
                      >
                        <li>Logout</li>
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <li className="nav-item mt-2">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
              )}

              <li className="nav-item">
                <a className="nav-link mt-2" href="/cart">
                  Cart {cartstate.cartItems.length}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
