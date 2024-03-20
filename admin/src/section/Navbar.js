import React from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";

export default function NavbarData() {
  let location = useNavigate();

  return (
    <>
      <aside
        id="layout-menu"
        className="layout-menu menu-vertical menu bg-menu-theme"
      >
        <div className="app-brand demo">
          <Link to="/" className="app-brand-link">
            <span className="app-brand-logo demo">
              {/* <img src={logo} alt="logo" width="170" /> */}
            </span>
            <span className="app-brand-text demo menu-text fw-bolder ms-2">
              E-Commerce
            </span>
          </Link>

          <Link
            to="/"
            className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
          >
            <i className="bx bx-chevron-left bx-sm align-middle"></i>
          </Link>
        </div>

        <div className="menu-inner-shadow"></div>

        <ul className="menu-inner py-1">
          <NavLink
            to="/dashboard"
            className={`menu-item ${location.pathname === "/" ? "active" : ""}`}
          >
            <li className="menu-link">
              <i className="menu-icon tf-icons bx bx-home-circle"></i>
              <div data-i18n="Analytics">Dashboard</div>
            </li>
          </NavLink>

          <NavLink
            to="/media"
            className={`menu-item ${
              location.pathname === "/media" ? "active" : ""
            }`}
          >
            <li className="menu-link">
              <i className="menu-icon tf-icons bx bx-file"></i>
              <div data-i18n="Layouts">Media</div>
            </li>
          </NavLink>

          <NavLink
            to="/category"
            className={`menu-item ${
              location.pathname === "/category" ? "active" : ""
            }`}
          >
            <li className="menu-link">
              <i className="menu-icon tf-icons bx bx-category"></i>
              <div data-i18n="Layouts">Category</div>
            </li>
          </NavLink>

          <NavLink
          to="/products"
          className={`menu-item ${
            location.pathname === "/products" ? "active" : ""
          }`}
        >
          <li className="menu-link">
            <i className="menu-icon tf-icons bx bx-category"></i>
            <div data-i18n="Layouts">Products</div>
          </li>
        </NavLink>



          <NavLink
          to="/order"
          className={`menu-item ${
            location.pathname === "/order" ? "active" : ""
          }`}
        >
          <li className="menu-link">
            <i className="menu-icon tf-icons bx bx-news"></i>
            <div data-i18n="Layouts">Orders</div>
          </li>
        </NavLink>

          <NavLink
          to="/customer"
          className={`menu-item ${
            location.pathname === "/customer" ? "active" : ""
          }`}
        >
          <li className="menu-link">
            <i className="menu-icon tf-icons bx bx-news"></i>
            <div data-i18n="Layouts">Customer</div>
          </li>
        </NavLink>
          <NavLink
          to="/cart"
          className={`menu-item ${
            location.pathname === "/cart" ? "active" : ""
          }`}
        >
          <li className="menu-link">
            <i className="menu-icon tf-icons bx bx-news"></i>
            <div data-i18n="Layouts">Cart</div>
          </li>
        </NavLink>
          <NavLink
          to="/checkout"
          className={`menu-item ${
            location.pathname === "/checkout" ? "active" : ""
          }`}
        >
          <li className="menu-link">
            <i className="menu-icon tf-icons bx bx-news"></i>
            <div data-i18n="Layouts">Checkout</div>
          </li>
        </NavLink>

          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Setting</span>
          </li>

          <li className="menu-item">
            <Link to="#" className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-detail"></i>
              <div data-i18n="Form Elements">Settings</div>
            </Link>
            <ul className="menu-sub">
              <li className="menu-item">
                <a href="forms-basic-inputs.html" className="menu-link">
                  <div data-i18n="Basic Inputs">Basic Inputs</div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
      {/* <div className="layout-overlay layout-menu-toggle"></div> */}
    </>
  );
}
