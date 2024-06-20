import React, { useEffect } from "react";
import Pizza from "../components/Pizza";
import { useDispatch, useSelector } from "react-redux"; //for accessing the data :dispatch changes the state whereas useSelector reads the state
import { getAllPizzas, filterPizzas } from "../actions/pizzaActions";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Filter from "../components/Filter";

export default function Homescreen() {
  const dispatch = useDispatch();

  const pizzasstate = useSelector((state) => state.getAllPizzasReducers); //will fetch the current state from the node.js

  const { pizzas, error, loading } = pizzasstate;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]); // Added dispatch to the dependency array

  return (
    <div>
      <Filter />
      <div className="row justify-content-center">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error error="something went wrong" />
        ) : (
          pizzas.map((pizza) => {
            return (
              <div className="col-md-3 m-3" key={pizza._id}>
                <div>
                  <Pizza pizza={pizza} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
