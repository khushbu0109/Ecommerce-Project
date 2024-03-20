import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
require("dotenv").config();
export default function AllInvoices(props) {
  const host = process.env.REACT_APP_URL;
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const [InvoiceData, setInvoiceData] = useState([]);

  const getInvoices = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      };
      const response = await fetch(
        `${host}/api/invoice/getInvoice`,
        requestOptions
      );
      const datares = await response.json();
      console.log(datares);
      setInvoiceData(datares.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getInvoices();
  }, []);

  console.log(InvoiceData);

  const clickTab = () => {
    navigate("/createInvoice");
  };

  return (
    <div className="col-lg-12 mb-4">
      <div className="card">
        <h5 className="card-header">
          <div className="row align-items-center">
            <div className="col-lg-8 font-bold">
              <ul className="slider_button slider-white plain-orange">
                <li className="slider-active mx-2" onClick={props.openSetting}>
                  Invoice Setting
                </li>
                <li
                  className="slider-active mx-2"
                  onClick={() => {
                    clickTab();
                  }}
                >
                  Create New Invoice
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
                <th>ID</th>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Total Item</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0 order_history_body">
              {InvoiceData
                // .filter(
                //   (item) =>
                //     // item.userid.fullname.toLowerCase().includes(query) ||
                //     // item.order_id
                //     //   .toString()
                //     //   .toLowerCase()
                //     //   .includes(query) ||
                //     // item.total_price.toLowerCase().includes(query)
                // )
                .map((or) => {
                  const timePickerMomentObj = new Date(or.createdAt);
                  const day = timePickerMomentObj.getDate();
                  const month = timePickerMomentObj.getMonth() + 1;
                  const fullyear = timePickerMomentObj.getFullYear();
                  return (
                    <tr key={or._id}>
                      <td>
                        <Link to={`invoiceDetails/${or._id}`}>#{or.inv_number}</Link>
                      </td>
                      <td>{day + "/" + month + "/" + fullyear}</td>

                      <td>{or.customer_id.fullname}</td>
                      <td>{or.item_data.length}</td>
                      <td>{or.totalPrice}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
