import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userAction";
import Loading from "../components/Loading";
import Error from "../components/Error";
export default function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();

  const loginstate = useSelector((state) => state.loginUserReducer);
  const { loading, error } = loginstate;
  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    }
  }, []);

  function login() {
    const user = { email, password };
    dispatch(loginUser(user));
  }
  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-center shadow-lg p-3 mb-5 bg-white rounded">
          <h2 className="text-center mt-2" style={{ fontSize: "35px" }}>
            Login
          </h2>
          {loading && <Loading />}
          {error && <Error error="Invalid Credentials" />}
          <div>
            <input
              required
              type="email"
              placeholder="email"
              className="form-control"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              required
              type="password"
              placeholder="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />

            <button className="btn mt-3 mb-3" onClick={login}>
              LOGIN
            </button>
            <br />
            <a style={{ color: "black" }} href="/register">
              Click Here To Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
