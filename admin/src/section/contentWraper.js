import React from "react";

import { Link } from "react-router-dom";
import OrderStatics from "./DashboardCard/OrderStatics";

import { useContext } from "react";
import { useEffect, useState } from "react";

import Preloader from "../componant/Preloader";

import DataViz, { VizType, BarChartDatum } from "react-fast-charts";
export default function ContentWrapper(props) {
  const showalert = () => {
    props.showAlert("danger", "danger");
  };

  const [preloader, setPreloader] = useState("");

  const data: BarChartDatum[][] = [
    [
      {
        x: "2011",
        y: 10,
        stroke: "lightblue",
        fill: "transparent",
      },
      {
        x: "2012",
        y: 11,
        stroke: "lightblue",
        fill: "transparent",
      },
      {
        x: "2013",
        y: 6,
        stroke: "lightblue",
        fill: "transparent",
      },
      {
        x: "2014",
        y: 8,
        stroke: "lightblue",
        fill: "transparent",
      },
      {
        x: "2015",
        y: 9,
        stroke: "lightblue",
        fill: "transparent",
      },
      {
        x: "2016",
        y: 12,
        stroke: "lightblue",
        fill: "transparent",
      },
    ],
    [
      {
        x: "2011",
        y: 6,
        fill: "blue",
      },
      {
        x: "2012",
        y: 9,
        fill: "blue",
      },
      {
        x: "2013",
        y: 2,
        fill: "blue",
      },
      {
        x: "2014",
        y: 5,
        fill: "blue",
      },
      {
        x: "2015",
        y: 8,
        fill: "blue",
      },
      {
        x: "2016",
        y: 7,
        fill: "blue",
      },
    ],
  ];

  return (
    <>
      <Preloader show={preloader} />
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="card-title mb-0 d-flex align-items-start justify-content-between align-items-center">
                    <div className="avatar flex-shrink-0">
                      <img
                        src="../assets/img/icons/unicons/chart-success.png"
                        alt="chart success"
                        className="rounded"
                      />
                    </div>

                    <span className=" d-block mb-1">Blog Posts</span>
                    <h3 className="card-title mb-0">0</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="card-title mb-0 d-flex align-items-start justify-content-between align-items-center">
                    <div className="avatar flex-shrink-0">
                      <img
                        src="../assets/img/icons/unicons/cc-primary.png"
                        alt="chart success"
                        className="rounded"
                      />
                    </div>

                    <span className=" d-block mb-1">Total Stories</span>
                    <h3 className="card-title mb-0">0</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="card-title mb-0 d-flex align-items-start justify-content-between align-items-center">
                    <div className="avatar flex-shrink-0">
                      <img
                        src="../assets/img/icons/unicons/cc-primary.png"
                        alt="chart success"
                        className="rounded"
                      />
                    </div>

                    <span className=" d-block mb-1">Directory</span>
                    <h3 className="card-title mb-0">0</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="card-title mb-0 d-flex align-items-start justify-content-between align-items-center">
                    <div className="avatar flex-shrink-0">
                      <img
                        src="../assets/img/icons/unicons/wallet-info.png"
                        alt="chart success"
                        className="rounded"
                      />
                    </div>

                    <span className=" d-block mb-1">Banners</span>
                    <h3 className="card-title mb-0">0</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 mb-4 order-0">
              <div className="card">
                <div className="d-flex align-items-end row">
                  <div className="col-sm-12">
                    <div className="card-body">
                      <h5 className="card-title text-primary">
                        Published Blog Post
                      </h5>

                      <div className="table-responsive text-nowrap mb-1">
                        <table className="table table-hover">
                          <thead className="order_history_header">
                            <tr>
                              <th>S.No</th>
                              <th>Post Title</th>

                              <th>Date</th>
                            </tr>
                          </thead>
                          <tbody className="table-border-bottom-0 order_history_body"></tbody>
                        </table>
                      </div>

                      <div className="card-footer p-0">
                        <Link to="/blog-post" className="badge bg-primary">
                          View All
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-4 order-0">
              <div className="card">
                <div className="d-flex align-items-end row">
                  <div className="col-sm-12">
                    <div className="card-body">
                      <h5 className="card-title text-primary">
                        News View Counter
                      </h5>

                      <DataViz
                        id={"example-bar-chart"}
                        vizType={VizType.BarChart}
                        data={data}
                        axisLabels={{ left: "Value", bottom: "Year" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <OrderStatics /> */}
        </div>

        {/* <footer className="content-footer footer bg-footer-theme">
          <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
            <div className="mb-2 mb-md-0">
              ©<script>document.write(new Date().getFullYear());</script>, made
              with ❤️ by
              <Link to="https://vipsgrow.in" className="footer-link fw-bolder">
                VIPs Grow
              </Link>
            </div>
          </div>
        </footer> */}

        <div className="content-backdrop fade"></div>
      </div>
    </>
  );
}
