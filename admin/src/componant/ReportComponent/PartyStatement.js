import React, { useEffect, useState, useContext } from "react";
import CusContext from "../../context/Customer/CustomerContext";
import ReportContext from "../../context/Report/ReportContext";
require("dotenv").config();
export default function PartyStateMent() {
  const host = process.env.REACT_APP_URL;

  const [query, setQuery] = useState("");

  const reportContext = useContext(ReportContext);
  const { partyLedger, getPartyReport } = reportContext;

  const context = useContext(CusContext);
  const { myCustomer, getAllCustomer, addCustomer, getAllOrder } = context;
  const [customer_id, setcustomerid] = useState("");

  useEffect(() => {
    // getPartyReport("637e48efcf1ce3efee006153", "yesterday");
    getAllCustomer();
  }, []);

  const clickTab = async (time) => {
    getPartyReport(customer_id, time);
  };

  const onInputData = (e) => {
    setcustomerid(e.target.value);
    getPartyReport(e.target.value, "today");
  };

  return (
    <>
      <div className="col-lg-12 mb-4">
        <div className="card">
          <h5 className="card-header">
            <div className="row align-items-center">
              <div className="col-lg-7 font-bold">
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

                  <li
                    className="slider-active mx-2"
                    onClick={() => {
                      clickTab("custom-date");
                    }}
                  >
                    Custom Date
                  </li>
                </ul>
              </div>
              <div className="col-lg-2">
                <select
                  className="form-control"
                  type="text"
                  id="userid"
                  name="userid"
                  onChange={onInputData}
                >
                  <option value={0}>Select Customer</option>
                  {myCustomer.map((cus) => {
                    return (
                      <option value={cus.customer_id._id}>
                        {cus.customer_id.fullname}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-lg-3 text-right">
                <input
                  type="text"
                  className="form-control search"
                  placeholder="Search by Customer Name, Amount etc..."
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
                  <th>Customer Name</th>
                  <th>Credit</th>
                  <th>Debit</th>
                  <th>Payment Mode</th>
                  <th>Description</th>
                  {/* <th className="action">Action</th> */}
                </tr>
              </thead>
              <tbody className="table-border-bottom-0 order_history_body">
                {partyLedger
                  .filter(
                    (item) =>
                      item.userid.fullname.toLowerCase().includes(query) || 
                      item.amt.toString().toLowerCase().includes(query) ||
                      item.mode.toLowerCase().includes(query)
                  )
                  .map((report) => {                    
                    
                    const timePickerMomentObj = new Date(report.createAt);
                    const day = timePickerMomentObj.getDate();
                    const month = timePickerMomentObj.getMonth() + 1;
                    const fullyear = timePickerMomentObj.getFullYear();
                    return (
                      <tr key={report._id}>
                        <td>{day + "/" + month + "/" + fullyear}</td>
                        <td>{report.userid.fullname}</td>                        
                        <td>{report.amt > 0 ? report.amt : "-"}</td>
                        <td>{report.amt > 0 ? "-" : report.amt.toString().replace("-", "")}</td>
                        <td>{report.mode}</td>
                        <td>{report.desc}</td>
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
