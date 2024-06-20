import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; //for accessing the data :dispatch changes the state whereas useSelector reads the state
import Loading from "../components/Loading";
import Error from "../components/Error";

import { deliverOrder, getAllOrders } from "../actions/orderActions";
export default function Orderlist() {
  const dispatch = useDispatch();
  const getorderstate = useSelector((state) => state.getAllOrdersReducers);
  const { loading, error, orders } = getorderstate;
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);
  return (
    <div>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      <table className="table table-striped table-bordered table-responsive-sm">
        <thead className="table-dark">
          <tr>
            <th>Order Id</th>
            <th>Email</th>
            <th>User Id</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => {
              return (
                <tr>
                  <td>{order._id}</td>
                  <td>{order.email}</td>
                  <td>{order.userid}</td>
                  <td>{order.orderAmount}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>
                    {order.isDelivered ? (
                      <h2>Delivered</h2>
                    ) : (
                      <button
                        className="btn"
                        onClick={() => {
                          dispatch(deliverOrder(order._id));
                        }}
                      >
                        Deliver
                      </button>
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
