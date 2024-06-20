import logo from "./logo.svg";
import "./App.css";
import "bootstrap";
import { BrowserRouter, Route, Link, Switch, Routes } from "react-router-dom";
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Homescreen from "./screens/Homescreen";
import Cartscreen from "./screens/Cartscreen";
import Loginscreen from "./screens/Loginscreen";
import Registerscreen from "./screens/Registerscreen";
import Ordersscreen from "./screens/Ordersscreen";
import Adminscreen from "./screens/Adminscreen";

import UsersList from "./screens/UsersList";
import Pizzaslist from "./screens/Pizzaslist";
import Addpizza from "./screens/Addpizza";
import Orderlist from "./screens/Orderlist";
import Editpizza from "./screens/Editpizza";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/cart" element={<Cartscreen />} />
          <Route path="/login" element={<Loginscreen />} />
          <Route path="/register" element={<Registerscreen />} />
          <Route path="/orders" element={<Ordersscreen />} />
          <Route path="/admin" element={<Adminscreen />}>
            <Route path="/admin" element={<UsersList />} />
            <Route path="/admin/userslist" element={<UsersList />} />
            <Route path="/admin/orderslist" element={<Orderlist />} />
            <Route path="/admin/pizzaslist" element={<Pizzaslist />} />
            <Route path="/admin/addpizza" element={<Addpizza />} />
            <Route path="/admin/editpizza/:pizzaid" element={<Editpizza />} />
          </Route>
          {/* Using /admin/* to match all admin routes */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
