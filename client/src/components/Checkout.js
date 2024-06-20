import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../actions/orderActions";
import Error from "./Error";
import Success from "./Success";
import Loading from "./Loading";
export default function Checkout({ subtotal }) {
  const dispatch = useDispatch();

  const orderstate = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderstate;
  function tokenHandler(token) {
    console.log(token);
    dispatch(placeOrder(token, subtotal));
  }
  return (
    <div>
      {loading && <Loading />}
      {success && <Success success="Your order placed Successfully" />}
      {error && <Error error="Something went wrong" />}
      <StripeCheckout
        amount={subtotal * 100}
        shippingAddress
        billingAddress
        token={tokenHandler}
        currency="INR"
        stripeKey="pk_test_51PRrhGRvXKuqDLcINeQmdEK4IcrjivokBkAivfv1uwXW0BGjM7Kn55A9Y3upWsd5WDAH4wUmPlufWiwOd1uExvcT00KEsn0Pqm"
      >
        <button className="btn">Pay Now</button>
      </StripeCheckout>
    </div>
  );
}
