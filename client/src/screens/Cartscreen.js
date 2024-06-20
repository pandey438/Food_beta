import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../actions/cartActions";
import Checkout from "../components/Checkout";
export default function Cartscreen() {
  AOS.init();
  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;
  const dispatch = useDispatch();
  var subtotal = cartItems.reduce((x, item) => x + item.price, 0);
  return (
    <div>
      <div data-aos="fade-down" className="row justify-content ms-5 ">
        <div className="col-md-6">
          <h2 style={{ fontSize: "40px" }}>My Cart</h2>
          {cartItems.map((item) => {
            return (
              <div className="flex-container">
                <div className="text-start m-1 w-100">
                  <h2>
                    {item.name} [{item.varient}]
                  </h2>
                  <h2>
                    Price : {item.quantity} * {item.prices[0][item.varient]} ={" "}
                    {item.price}
                  </h2>
                  <h2 style={{ display: "inline" }}>Quantity :</h2>
                  <i
                    className="fa fa-plus"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(
                        addToCart(item, item.quantity + 1, item.varient)
                      );
                    }}
                  ></i>
                  <b>{item.quantity}</b>
                  <i
                    className="fa fa-minus"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(
                        addToCart(item, item.quantity - 1, item.varient)
                      );
                    }}
                  ></i>
                  <hr />
                </div>
                <div className="m-1 w-100">
                  <img
                    src={item.image}
                    style={{ height: "120px", weight: "80px" }}
                  />
                </div>
                <div className="m-1 w-100">
                  <i
                    className="fa fa-trash mt-5"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(deleteFromCart(item));
                    }}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-md-4">
          <h2 style={{ fontSize: "60px" }}>Subtotal :Rs.{subtotal}/-</h2>
          <Checkout subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
}
