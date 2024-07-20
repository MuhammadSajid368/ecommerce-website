import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./App.css"

import Home from "./Pages/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import CategoreyProduct from "./Pages/CategoreyProduct";

import Context from "./context";
import { setUserDetails } from "./store/userSlice";
import './css/custom.css';
import ProductDetail from "./Pages/ProductDetail";
import SummaryApi from "./common";
import Cart from "./Pages/Cart";
import SearchProduct from "./Pages/SearchProduct";
import ActivateAccount from "./Pages/ActivateAccount";

const App = () => {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/auth/user-details', { withCredentials: true });
      console.log('Response from backend:', data);
      if (data.success) {
        dispatch(setUserDetails(data.user));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };

  const fetchAddToCart = async () => {
    try {
      const { data } = await axios.get(SummaryApi.addTOCartProductCount.url, { withCredentials: true });
      console.log("Cart Count API Response:", data);
      if (data.success) {
        setCartProductCount(data.data.count);
      } else {
        console.error("Failed to fetch cart count:", data.message);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchAddToCart();
  }, []);

  useEffect(() => {
    console.log("Cart Product Count:", cartProductCount);
  }, [cartProductCount]);

  return (
    <Context.Provider value={{ fetchUserDetails, cartProductCount, fetchAddToCart }}>
      <ToastContainer position="top-center" />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/auth/activate/:token" element={<ActivateAccount />} />
              <Route path="/admin-panel" element={<Dashboard />} />
              <Route path="/product-categorey" element={<CategoreyProduct />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/search" element={<SearchProduct />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </Context.Provider>
  );
};

export default App;
