import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "../screens/Login";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div> Home</div>} />
        <Route path="/" element={<div> Register</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<div>Logout</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
