// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import About from "./pages/About";
import OldOrders from "./pages/OldOrders";
import Sss from "./pages/Sss";
import Contact from "./pages/Contact";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import MainLayout from "./pages/Layout/MainLayout";
import Page404 from "./pages/Page404";
import ProductDetail from "./pages/ProductDetail";
import PrivateRoute from "./pages/Layout/PrivateRoute";
import Homepage from "./pages/Homepage";
import DashboardLayout from "./pages/Layout/DashboardLayout";
import Account from "./pages/Account";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public  */}
        <Route element={<DashboardLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" />} />

        {/* Private  */}
        <Route path="/" element={<PrivateRoute element={<MainLayout />} />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path="home" element={<Homepage />} />
          <Route path="oldorders" element={<OldOrders />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="account" element={<Account />} />
          <Route path="sss" element={<Sss />} />
          <Route path="/product" element={<ProductList />} />{" "}
          <Route path="/product/:id" element={<ProductDetail />} />


        {/* Alt kategoriler için yeni route */}

        </Route>

        {/* Payment*/}
        <Route
          path="/payment"
          element={<PrivateRoute element={<Payment />} />}
        />

        {/* Error  404 Page */}
        <Route path="/404" element={<Page404 />} />

        {/* direct routes to 404 */}
        <Route path="/*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
