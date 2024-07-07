import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Shop from "./components/Shop";
import CreatProducts from "./components/CreatProducts";
import Admin from "./components/Admin";
import Index from "./components/Index";
import Details from "./components/Details";


export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/index/detail" element={<Details></Details>}></Route>
        <Route path="/index" element={<Index></Index>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="/admin/creatProducts" element={<CreatProducts/>}></Route>
        <Route path="/admin/shop" element={<Shop/>}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/loginUser" element={<Login />} />
      </Routes>
      <Outlet />
    </div>
  );
}
