const express = require("express");

const Pizza = require("./models/pizzaModels.js");

const db = require("./db.js"); //establish connection
const app = express();

app.use(express.json());
const path = require("path");
const pizzasRoute = require("./routes/pizzasRoute.js");
const userRoute = require("./routes/userRoute.js");
const ordersRoute = require("./routes/ordersRoute.js");
app.use("/api/pizzas/", pizzasRoute);
app.use("/api/users/", userRoute);
app.use("/api/orders/", ordersRoute);

app.use("/", (req, res) => {
  res.send("Server is running");
});



const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port !`);
