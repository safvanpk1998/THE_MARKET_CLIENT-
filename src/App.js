import React, { Component, useEffect } from "react";
import Header from "./components/layout-component/header";
import { Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "@fontsource/signika"; // Defaults to weight 400.

import { loadUser } from "./slices/authSlice";
import "./App.css";
import Home from "./components/home-component/Home";
import Footer from "./components/layout-component/footer";

import ProductDetails from "./pages/productDetailPage/productDetail";
//import ProductDetails from "./components/product-component/Product-Details"

import Product from "./pages/product/Product";
import Checkout from "./pages/checkOut/checkout";
import Cart from "./pages/cart/Cart";
import Auth from "./pages/authentication/auth";
import CreateAccount from "./pages/authentication/register";
import Admin from "./pages/admin/admin";
import Actions from "./pages/admin/Actions/Actions";
import ProductAdd from "./components/product-component/product";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./utils/scroll";
import Success from "./components/checkout-component/success";
import ViewProduct from "./pages/cart/viewProduct";
import Wishlist from "./pages/wishList/wishlist";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="App">
      {/* <ScrollToTop> */}

      <Routes>
        {/* <Route exact path="/zzz" element={<ProductAdd></ProductAdd>}></Route> */}

        <Route exact path="/" element={<Home />}></Route>
        <Route  path="/login" element={<Auth></Auth>}></Route>
        <Route
          
          path="/createaccount"
          element={<CreateAccount></CreateAccount>}
        ></Route>
        <Route
          
          path="/electronics"
          element={<Product category={"Electronics"} />}
        ></Route>
        <Route
          exact
          path="/mobiles"
          element={<Product category={"mobiles"} />}
        ></Route>
        <Route
          exact
          path="/books"
          element={<Product category={"books"} />}
        ></Route>

        <Route
          exact
          path="/homeAppliances"
          element={<Product category={"homeAppliances"} />}
        ></Route>
        <Route
          exact
          path="/bestSellers"
          element={<Product category={"bestSellers"} />}
        ></Route>
         <Route
          exact
          path="/:keyword"
          element={<Product/>}
        ></Route>
         <Route
          exact
          path="/product/:soldBy"
          element={<Product/>}
        ></Route>
        <Route
          exact
          path="/productDetails/:id"
          element={<ProductDetails />}
        ></Route>
        <Route
          exact
          path="/product/productdetails/checkout/:id/:quantity"
          element={<Checkout></Checkout>}
        ></Route>
        <Route exact path="/cart" element={<Cart></Cart>}></Route>
        <Route exact path="/cart/:id" element={<ViewProduct></ViewProduct>}></Route>
        <Route exact path="/wishList" element={<Wishlist></Wishlist>}></Route>
        <Route exact path="/success/:id" element={<Success></Success>}></Route>
       
        <Route
          element={<ProtectedRoute allowedRoles={["admin"]}></ProtectedRoute>}
        >
          <Route
            exact
            path="/admin/actions"
            Admin={true}
            element={<Actions></Actions>}
          ></Route>
           <Route exact path="/admin" element={<Admin></Admin>}></Route>
        </Route>
      </Routes>
      {/* //</ScrollToTop> */}
    </div>
  );
}

export default App;
