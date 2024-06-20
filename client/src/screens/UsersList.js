import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../actions/userAction";
import Loading from "../components/Loading";
import Error from "../components/Error";
export default function UsersList() {
  const dispatch = useDispatch();
  const getusersstate = useSelector((state) => state.getAllUsersReducers);
  const { loading, error, users } = getusersstate;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      <table className="table table-striped table-bordered table-responsive-sm">
        <thead className="table-dark">
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => {
              return (
                <tr>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>

                  <td>
                    {!user.isAdmin && (
                      <i
                        className="fa fa-trash"
                        onClick={() => {
                          dispatch(deleteUser(user._id));
                        }}
                      ></i>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
