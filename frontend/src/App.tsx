// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import About from './pages/About';
import AccountInfo from './pages/AccountInfo';
import Address from './pages/Address';
import OldOrders from './pages/OldOrders';
import Orders from './pages/Orders';
import Sss from './pages/Sss';
import Contact from './pages/Contact';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import MainLayout from './pages/Layout/MainLayout';
import Page404 from './pages/Page404';
import ProductDetail from './pages/ProductDetail';
import PrivateRoute from './pages/Layout/PrivateRoute';
import CategoryPage from './components/AdminPanel/CategoryPage';
import MainPanel from './components/AdminPanel/MainPanel';
import Products from './components/AdminPanel/Products';
import Sidebar from './components/AdminPanel/Sidebar';
import AdminLayout from './pages/Layout/AdminLayout';
import Settings from './components/AdminPanel/Settings';
import Homepage from './pages/Homepage';
import DashboardLayout from './pages/Layout/DashboardLayout';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public  */}
         <Route element={<DashboardLayout />} >
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
          <Route path="account" element={<AccountInfo />} />
          <Route path="address" element={<Address />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="sss" element={<Sss />} />
          <Route path="products" element={<ProductList />} />
          <Route path="product-details/:id" element={<ProductDetail />} />
        </Route>
        
        {/* Payment*/}
        <Route path="/payment" element={<PrivateRoute element={<Payment />} />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<PrivateRoute element={<AdminLayout />} />}>
          <Route path="category" element={<CategoryPage />} />
          <Route path="mainpanel" element={<MainPanel />} />
          <Route path="products" element={<Products />} />
          <Route path="settings" element={<Settings />} />
          <Route path="sidebar" element={<Sidebar />} />
        </Route>

        {/* Error  404 Page */}
        <Route path="/404" element={<Page404 />} />

        {/* direct routes to 404 */}
        <Route path="/*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
