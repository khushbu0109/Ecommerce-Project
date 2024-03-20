import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./section/Navbar";

import ContentWrapper from "./section/contentWraper";
import { useState } from "react";

import "./pages/Category";
import TopBar from "./section/TopBar";
import Category from "./pages/Category";
import Product from "./pages/Product";

import ProductState from "./context/Product/ProductState";
import AttributeState from "./context/Attribute/AttributeState";
import Attribute from "./pages/Attribute";
import User from "./pages/User";
import Media from "./pages/Media";
import MediaState from "./context/Media/MediaState";
import Order from "./pages/Order";
import OrderState from "./context/Order/OrderState";
import View from "./pages/View";
import CoupenState from "./context/Coupen/CoupenState";
import Coupen from "./pages/Coupen";
import VariationState from "./context/Variation/VariationState";
import Variation from "./pages/Variation";
import CategoryState from "./context/Category/CategoryState";
import CustomerState from "./context/Customer/CustomerState";
import  Custmr  from "./pages/Custmr";
import {Cart}  from "./pages/Cart";
import { Checkout } from "./pages/Checkout";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
      active: "alert-active",
    });

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  return (
    <>
      <CustomerState>
        <VariationState>
          <CoupenState>
            <OrderState>
              <MediaState>
                <AttributeState>
                  <ProductState>
                    <CategoryState>
                      <Router>
                        <>
                          <div className="layout-wrapper layout-content-navbar">
                            <div className="layout-container">
                              <Navbar />
                              <div className="layout-page">
                                <TopBar />
                                <Routes>
                                  <Route
                                    path="/"
                                    element={
                                      <ContentWrapper showAlert={showAlert} />
                                    }
                                  />

                                  <Route
                                    path="/dashboard"
                                    element={
                                      <ContentWrapper showAlert={showAlert} />
                                    }
                                  />
                                  <Route
                                    path="/category"
                                    element={<Category showAlert={showAlert} />}
                                  />
                                  <Route
                                    path="/products"
                                    element={<Product showAlert={showAlert} />}
                                  />

                                  <Route path="/user" element={<User />} />
                                  <Route
                                    path="/media"
                                    element={<Media showAlert={showAlert} />}
                                  />
                                  <Route
                                    path="/order"
                                    element={<Order showAlert={showAlert} />}
                                  />
                                  <Route
                                    path="/addProduct"
                                    element={<View showAlert={showAlert} />}
                                  />
                                  <Route
                                    path="/customer"
                                    element={<Custmr showAlert={showAlert} />}
                                  />
                                  <Route
                                    path="/cart"
                                    element={<Cart showAlert={showAlert} />}
                                  />
                                  <Route
                                    path="/checkout"
                                    element={<Checkout showAlert={showAlert} />}
                                  />

                                </Routes>
                              </div>
                            </div>
                          </div>
                        </>
                      </Router>
                    </CategoryState>
                  </ProductState>
                </AttributeState>
              </MediaState>
            </OrderState>
          </CoupenState>
        </VariationState>
      </CustomerState>
    </>
  );
}

export default App;
