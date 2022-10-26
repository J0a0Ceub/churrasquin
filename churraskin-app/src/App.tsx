import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import EditListPage from "./views/EditListPage";
import EditProduct from "./views/EditProduct";
import Error404 from "./views/Error404";
import Home from "./views/Home";
import ListPage from "./views/ListPage";
import Login from "./views/Login";
import SignUp from "./views/Signup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/list/:id" element={<ListPage />} />
        <Route path="/list/:id/edit" element={<EditListPage />} />
        <Route
          path="/list/:listId/product/:productId"
          element={<EditProduct />}
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
