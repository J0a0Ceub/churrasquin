import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Error404 from "./views/Error404";
import Home from "./views/Home";
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
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
