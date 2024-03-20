import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
/* import Noticontext from "../context/notification/NotifContext"; */

export default function TopBar() {
  /*  const noticontext = useContext(Noticontext); */
  const [showNotiNumber, setShowNotiNumber] = useState(false);
  /*  const { notification, getAllNotificaiton } = noticontext; */

  const [notification] = useState([]);

  const MINUTE_MS = 10000;

  if (
    localStorage.getItem("lang") === "" ||
    localStorage.getItem("lang") === undefined
  ) {
    localStorage.setItem("lang", "0");
  }

  let history = useNavigate();
  const logout = () => {
    localStorage.clear();
    // history("/");
    window.location.reload(true);
  };
  const langChange = (e) => {
    localStorage.setItem("lang", e.target.value);
    window.location.reload();
  };
  return (
    <>
      <nav
        className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
        id="layout-navbar"
      >
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <i className="bx bx-menu bx-sm"></i>
        </div>

        <div
          className="navbar-nav-right d-flex align-items-center"
          id="navbar-collapse"
        >
          {/* <!-- Search --> */}
          <div className="navbar-nav align-items-center">
            <div className="c_name">
              <span>{localStorage.getItem("com_name")}</span>
            </div>
          </div>

          {/* <!-- /Search --> */}

          <ul className="navbar-nav flex-row align-items-center ms-auto">
            {/* <!-- User --> */}

            {/* notificaiton section is started from here */}
            <li className="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-1">
              <Link
                className="nav-link dropdown-toggle hide-arrow"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
              >
                <i className="bx bx-bell bx-sm"></i>
                <span className="badge bg-danger rounded-pill badge-notifications">
                  {showNotiNumber ? notification.length : ""}
                </span>
              </Link>
              <ul className="dropdown-menu dropdown-notification dropdown-menu-end py-0">
                <li className="dropdown-menu-header border-bottom">
                  <div className="dropdown-header d-flex align-items-center py-3">
                    <h5 className="text-body mb-0 me-auto">Notification</h5>
                    <a
                      className="dropdown-notifications-all text-body"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      aria-label="Mark all as read"
                    >
                      <i className="bx fs-4 bx-envelope-open"></i>
                    </a>
                  </div>
                </li>
                <li className="dropdown-notifications-list scrollable-container ps">
                  <ul className="list-group list-group-flush">
                    {notification.length === 0 && "NO Notification"}
                    {notification.map((noti) => {
                      if (!showNotiNumber) {
                        if (noti.markasread) {
                          setShowNotiNumber(!showNotiNumber);
                        }
                      }
                      return (
                        <li
                          className={`list-group-item list-group-item-action dropdown-notifications-item 
                        ${noti.markasread ? "marked-as-read" : ""}`}
                        >
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar">
                                <span className="avatar-initial rounded-circle bg-label-success">
                                  <i className="bx bx-bell"></i>
                                </span>
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1">{noti.title}</h6>
                              <p className="mb-0">{noti.message}</p>
                              {/* <small className="text-muted">1h ago</small> */}
                            </div>
                            <div className="flex-shrink-0 dropdown-notifications-actions">
                              <a className="dropdown-notifications-read">
                                <span className="badge badge-dot"></span>
                              </a>
                              <a className="dropdown-notifications-archive">
                                <span className="bx bx-x"></span>
                              </a>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div
                    className="ps__rail-x"
                    style={{ left: "0px", bottom: "0px" }}
                  >
                    <div
                      className="ps__thumb-x"
                      tabIndex="0"
                      style={{ left: "0px", width: "0px" }}
                    ></div>
                  </div>
                  <div
                    className="ps__rail-y"
                    style={{ top: "0px", right: "0px" }}
                  >
                    <div
                      className="ps__thumb-y"
                      tabIndex="0"
                      style={{ top: "0px", height: "0px" }}
                    ></div>
                  </div>
                </li>
                <li className="dropdown-menu-footer border-top">
                  <Link className="dropdown-item d-flex justify-content-center p-3">
                    View all notifications
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <Link
                className="nav-link dropdown-toggle hide-arrow"
                to=""
                data-bs-toggle="dropdown"
              >
                <div className="avatar avatar-online">
                  <img
                    src="../assets/img/avatars/1.png"
                    alt="Avtar"
                    className="w-px-40 h-auto rounded-circle"
                  />
                </div>
              </Link>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar avatar-online">
                          <img
                            src="../assets/img/avatars/1.png"
                            alt="avtar"
                            className="w-px-40 h-auto rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <span className="fw-semibold d-block">The Asians</span>
                        <small className="text-muted">Admin</small>
                      </div>
                    </div>
                  </Link>
                </li>
                <li>
                  <div className="dropdown-divider"></div>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    <i className="bx bx-user me-2"></i>
                    <span className="align-middle">My Profile</span>
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    <i className="bx bx-cog me-2"></i>
                    <span className="align-middle">Settings</span>
                  </Link>
                </li>

                <li>
                  <div className="dropdown-divider"></div>
                </li>
                <li>
                  <p
                    className="dropdown-item"
                    onClick={logout}
                    style={{ background: "cursor" }}
                  >
                    <i className="bx bx-power-off me-2"></i>
                    <span className="align-middle">Log Out</span>
                  </p>
                </li>
              </ul>
            </li>
            {/* <!--/ User --> */}
          </ul>
        </div>
      </nav>

      {/* <!-- / Navbar -->

          <!-- Content wrapper --> */}
      {/* <ContentWrapper /> */}
    </>
  );
}
