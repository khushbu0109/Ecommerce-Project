import { logDOM } from "@testing-library/react";
import React, { useContext, useEffect, useState } from "react";
import ReportContext from "../../context/Report/ReportContext";
require("dotenv").config();
export default function SaleSummary(props) {
  const host = process.env.REACT_APP_URL;
  const [query, setQuery] = useState("");

  const reportContext = useContext(ReportContext);
  const { saleData, getSaleReport, dateFormate } = reportContext;

  useEffect(() => {
    getSaleReport("today");
  }, []);

  const clickTab = async (time) => {
    getSaleReport(time);
  };

  console.log(saleData);

  return (
    <>
      <div className="col-lg-12 mb-4">
        <div className="card">
          <h5 className="card-header">
            <div className="row align-items-center">
              <div className="col-lg-8 font-bold">
                <ul className="slider_button slider-white plain-orange">
                  <li
                    className="slider-active mx-2"
                    onClick={() => {
                      clickTab("today");
                    }}
                  >
                    Today
                  </li>
                  <li
                    className="slider-active mx-2"
                    onClick={() => {
                      clickTab("yesterday");
                    }}
                  >
                    Yesterday
                  </li>
                  <li
                    className="slider-active mx-2"
                    onClick={() => {
                      clickTab("weekly");
                    }}
                  >
                    Last Week
                  </li>
                  <li
                    className="slider-active mx-2"
                    onClick={() => {
                      clickTab("monthly");
                    }}
                  >
                    Last Month
                  </li>
                </ul>
              </div>
              <div className="col-lg-4 text-right">
                <input
                  type="text"
                  className="form-control search"
                  placeholder="Search by Order ID, Customer Name, Amount etc..."
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
          </h5>

          <div className="table-responsive text-nowrap mb-1">
            <table className="table table-hover">
              <thead className="order_history_header">
                <tr>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Amount</th>
                  {/* <th className="action">Action</th> */}
                </tr>
              </thead>
              <tbody className="table-border-bottom-0 order_history_body">
                {saleData
                  .filter(
                    (item) =>
                      item.userid.fullname.toLowerCase().includes(query) ||
                      item.order_id.toString().toLowerCase().includes(query) || 
                      item.total_price.toLowerCase().includes(query)
                  )
                  .map((or) => {
                    const timePickerMomentObj = new Date(or.createdAt);
                    const day = timePickerMomentObj.getDate();
                    const month = timePickerMomentObj.getMonth() + 1;
                    const fullyear = timePickerMomentObj.getFullYear();
                    return (
                      <tr key={or._id}>
                        <td>{day + "/" + month + "/" + fullyear}</td>
                        <td>{or.order_id}</td>
                        <td>{or.userid.fullname}</td>
                        <td>{or.total_price}</td>
                        {/* <td></td> */}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
