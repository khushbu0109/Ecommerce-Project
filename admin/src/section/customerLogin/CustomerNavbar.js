import React from "react";
import logo from "../../mylogo.png";

import { Link, NavLink, useLocation } from "react-router-dom";

export default function CustomerNavData() {
  let location = useLocation();
  return (
    <>
      <aside
        id="layout-menu"
        className="layout-menu menu-vertical menu bg-menu-theme"
      >
        <div className="app-brand demo">
          <Link to="/" className="app-brand-link">
            <span className="app-brand-logo demo">
              <img src={logo} alt="logo" width="170" />
            </span>
            {/* <span className="app-brand-text demo menu-text fw-bolder ms-2">
              MYORDERSLIP
            </span> */}
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
            to="/mycompanies"
            className={`menu-item ${
              location.pathname === "/mycompanies" ? "active" : ""
            }`}
          >
            <li className="menu-link">
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div data-i18n="Layouts">My Companies</div>
            </li>
          </NavLink>

          

          <NavLink
            to="/customer-order"
            className={`menu-item ${
              location.pathname === "/orders" ? "active" : ""
            }`}
          >
            <li className="menu-link">
              <i className="menu-icon tf-icons bx bx-file"></i>
              <div data-i18n="Layouts">My Orders</div>
            </li>
          </NavLink>

          

          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Sales</span>
          </li>

          

          <NavLink
            to="/customer-supplier"
            className={`menu-item ${
              location.pathname === "/suppliers" ? "active" : ""
            }`}
          >
            <li className="menu-link">
              <i className="menu-icon tf-icons bx bx-group"></i>
              <div data-i18n="Layouts">Suppliers</div>
            </li>
          </NavLink>


          

          <NavLink
            to="/customer-payments"
            className={`menu-item ${
              location.pathname === "/payments" ? "active" : ""
            }`}
          >
            <li className="menu-link">
              <i className="menu-icon tf-icons bx bx-money"></i>
              <div data-i18n="Layouts">Payments</div>
            </li>
          </NavLink>

          <NavLink
            to="/customer-reports"
            className={`menu-item ${
              location.pathname === "/reports" ? "active" : ""
            }`}
          >
            <li className="menu-link">
              <i className="menu-icon tf-icons bx bx-file"></i>
              <div data-i18n="Layouts">Reports</div>
            </li>
          </NavLink>

          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Setting</span>
          </li>

          <NavLink
            to="/subscribe"
            className={`menu-item ${
              location.pathname === "/subscribe" ? "active" : ""
            }`}
          >
            <li className="menu-link">
              <i className="menu-icon tf-icons bx bx-dollar-circle"></i>
              <div data-i18n="Layouts">Subscription</div>
            </li>
          </NavLink>
          <NavLink
            to="/customer-setting"
            className={`menu-item ${
              location.pathname === "/reports" ? "active" : ""
            }`}
          >
            <li className="menu-link">
              <i className="menu-icon tf-icons bx bx-cog"></i>
              <div data-i18n="Layouts">Settings</div>
            </li>
          </NavLink>

         
        </ul>
      </aside>
      {/* <div className="layout-overlay layout-menu-toggle"></div> */}
    </>
  );
}
