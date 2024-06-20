// Editpizza.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editPizza, getPizzaById } from "../actions/pizzaActions";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";

export default function Editpizza() {
  const dispatch = useDispatch();

  const { pizzaid } = useParams(); // Using useParams hook to get URL parameters

  const [name, setname] = useState("");
  const [smallprice, setsmallprice] = useState();
  const [mediumprice, setmediumprice] = useState();
  const [largeprice, setlargeprice] = useState();
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");

  const getpizzabyidstate = useSelector((state) => state.getPizzasByIdReducers);
  const { pizza, error, loading } = getpizzabyidstate;

  useEffect(() => {
    if (pizza) {
      if (pizza._id === pizzaid) {
        setname(pizza.name);
        setdescription(pizza.description);
        setcategory(pizza.category);
        setimage(pizza.image);
        setsmallprice(pizza.prices[0]["small"]);
        setmediumprice(pizza.prices[0]["medium"]);
        setlargeprice(pizza.prices[0]["large"]);
      } else {
        dispatch(getPizzaById(pizzaid));
      }
    } else {
      dispatch(getPizzaById(pizzaid));
    }
  }, [pizza, dispatch]);

  function formhandler(e) {
    e.preventDefault();

    const editedpizza = {
      _id: pizzaid,
      name,
      image,
      description,
      category,
      prices: {
        small: smallprice,
        medium: mediumprice,
        large: largeprice,
      },
    };

    dispatch(editPizza(editedpizza));
  }

  const editpizzastate = useSelector((state) => state.editPizzasReducers);
  const { editloading, editerror, editsuccess } = editpizzastate;

  return (
    <div className="text-start shadow-lg p-3 mb-5 bg-white rounded">
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      {editloading && <Loading />}
      {editsuccess && <Success success="Edit done successfully" />}
      <h1>Edit Pizza</h1>
      <div className="text-start">
        <form onSubmit={formhandler}>
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />

          <input
            className="form-control"
            type="text"
            placeholder="Small varient price"
            value={smallprice}
            onChange={(e) => {
              setsmallprice(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Medium varient price"
            value={mediumprice}
            onChange={(e) => {
              setmediumprice(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Large varient price"
            value={largeprice}
            onChange={(e) => {
              setlargeprice(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Category of the pizza"
            value={category}
            onChange={(e) => {
              setcategory(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Discription of the pizza"
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="URL for image of the pizza"
            value={image}
            onChange={(e) => {
              setimage(e.target.value);
            }}
          />
          <button className="btn mt-3" type="submit">
            Edit Pizza
          </button>
        </form>
      </div>
    </div>
  );
}
