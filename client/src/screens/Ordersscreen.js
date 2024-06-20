import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../actions/orderActions";
import Error from "../components/Error";
import Loading from "../components/Loading";

export default function Ordersscreen() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.loginUserReducer);
  const { orders, error, loading } = useSelector(
    (state) => state.getUserOrdersReducers
  );

  AOS.init();

  useEffect(() => {
    if (currentUser) {
      dispatch(getUserOrders(currentUser._id));
    }
  }, [dispatch, currentUser]);

  if (!currentUser) {
    return <p>Please log in to view orders.</p>;
  }

  return (
    <div data-aos="fade-down">
      <h1 style={{ fontSize: "35px" }}>My orders</h1>
      <hr />
      <div className="row justify-content-center m-3">
        {loading && <Loading />} {/* Display loading spinner */}
        {error && <Error error={error} />} {/* Display error message */}
        {!loading && !error && orders.length === 0 && <p>No orders found.</p>}
        {orders &&
          orders.map((order) => (
            <div key={order._id} className="col-md-8 m-4 p-1 bg-danger">
              <div className="flex-container">
                <div className="text-start w-100 m-1">
                  <h2 style={{ fontSize: "25px" }}>Items</h2>
                  <hr />
                  {order.orderItems.map((item) => (
                    <div className="mb-3" key={item._id}>
                      <p>
                        {item.name} [{item.varient}] * {item.quantity} ={" "}
                        {item.price}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="text-start w-100 m-1">
                  <h2 style={{ fontSize: "25px" }}>Address</h2>
                  <hr />
                  <p>Street: {order.shippingAddress.street}</p>
                  <p>City: {order.shippingAddress.city}</p>
                  <p>Country: {order.shippingAddress.country}</p>
                  <p>Pincode: {order.shippingAddress.pincode}</p>
                </div>
                <div className="text-start w-100 m-1">
                  <h2 style={{ fontSize: "25px" }}>Order Info</h2>
                  <hr />
                  <p>Order Amount: {order.orderAmount}</p>
                  <p>Date: {order.createdAt.substring(0, 10)}</p>
                  <p>Transaction Id: {order.transactionId}</p>
                  <p>Order Id: {order._id}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
