import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import EditListPage from "./views/EditListPage";
import EditProduct from "./views/EditProduct";
import Error404 from "./views/Error404";
import Home from "./views/Home";
import ListPage from "./views/ListPage";
import Login from "./views/Login";
import NewListPage from "./views/NewListPage";
import SignUp from "./views/Signup";
import dayjs from "dayjs";
import ShareListPage from "./views/ShareListPage";

dayjs.locale("pt-br");
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
        <Route path="/list/:id/share" element={<ShareListPage />} />
        <Route path="/new-list" element={<NewListPage />} />
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
