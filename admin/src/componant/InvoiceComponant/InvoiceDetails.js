import React, { Component } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import ComContext from "../../context/Company/CompanyContext";

require("dotenv").config();

export default function InvoiceDetails(props) {
  const host = process.env.REACT_APP_URL;
  const context = useContext(ComContext);
  const {getCompanyById} = context;


  let totalAmount = 0;
  let taxableamt = 0;
  const [inv_data, setInvData] = useState({
    bankData: {
      bankName: "",
      ifsc: "",
      branch: "",
      holdername: "",
    },
    _id: "",
    supplier_id: {
      _id: "",
      fullname: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      type: "",
      createBy: "",
      subscription: "6379e1e46ac3e7c89ddb452e",
      subcribeAt: "2022-11-23T05:40:43.229Z",
      customer_data: [
        
      ],
      createAt: "",
      __v: 0,
    },
    customer_id: {
      _id: "",
      fullname: "",
      phone: "",
      address: "",
      password: "",
      type: "",
      createBy: "",
      subscription: "",
      subcribeAt: "",
      customer_data: [],
      createAt: "",
      __v: 0,
    },
    inv_number: "",
    item_data: [     
    ],
    taxableAmt: "",
    totalPrice: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });
  const [compdata ,setCompData] = useState({});

  

  const getInvoicesData = async (id) => {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      };
      const response = await fetch(
        `${host}/api/invoice/getById/${id}`,
        requestOptions
      );
      const datares = await response.json();

      const comres = await getCompanyById(datares.data.supplier_id._id);
      setCompData(comres.data)

      setInvData(datares.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  console.log(compdata);
  const { id } = useParams();

  useEffect(() => {
    getInvoicesData(id);
  }, []);

  console.log(inv_data);

  //   print function write here start

  const compo = useRef();

  const printData = () => {};

  return (
    <>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="fixed-button">
            <ReactToPrint
              trigger={() => <button className="btn btn-sm fixed_button btn-outline-primary">Print</button>}
              content={() => compo.current}
            />

            {/* <button
              className="btn btn-sm fixed_button btn-outline-primary"
              onClick={printData}
              //   disabled={btnDisable}
            >
              Print
            </button> */}
          </div>
          <div className="row">
            <h4 className="card-header c_heading">
              <div className="row">
                <div className="col-lg-3">
                  <span className="headingcontent">Invoice Details</span>
                </div>
              </div>

              <div className="heading_buttons"></div>
            </h4>

            <div className="print_div row" ref={compo}>
              <div className="col-12 py-4">
                <h4
                  className="m-0 p-0"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  {compdata.com_name}
                </h4>
                <p className="m-0 p-0">Address . {compdata.address}s</p>                
                <span>
                  <strong>Mobile No. - {inv_data.customer_id.phone} </strong>
                </span>
                <span style={{display:"block"}}>
                  <strong>GSTIN: - {compdata.gst_no}</strong>
                </span>
              </div>
              <div className="col-6 border border-dark" >
                <span>Invoice no :</span> <span>asldf</span>
              </div>
              <div className="col-6 text-right border border-dark" >
                <span>Invoice Date :</span> <span>asldf</span>
              </div>

              <div className="col-6 py-2">
                Bill To
                <span className="font-bold party_name d-block">
                  {inv_data.customer_id.fullname}
                </span>
              </div>
              <div className="col-6">
                Ship To
                <span className="font-bold party_name d-block">
                  {inv_data.customer_id.fullname}
                </span>
              </div>

              <div className="col-12 mb-4">
                <div className="card">
                  <div className="card-header">
                    <table width={"100%"} className="invoiceProductTable">
                      <thead>
                        <tr>
                          <th className="fixed-width">No</th>
                          <th>ITEMS/ SERVICES</th>
                          <th className="fixed-width">SKU</th>
                          <th className="fixed-width">QTY</th>
                          <th className="fixed-width">PRICE/ITEM (₹)</th>
                          <th className="fixed-width">DISCOUNT</th>
                          <th className="fixed-width">TAX</th>
                          <th className="fixed-width">AMOUNT (₹)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inv_data.item_data.map((pro, index) => {
                          const amount = parseInt(pro.amount, 10);
                          const discount = parseInt(pro.discount, 10);
                          const tax = parseInt(pro.tax, 10);

                          totalAmount +=
                            pro.discount !== undefined
                              ? pro.tax !== undefined
                                ? ((pro.qty * amount - discount) *
                                    (100 + tax)) /
                                  100
                                : pro.qty * amount - discount
                              : pro.tax !== undefined
                              ? (pro.qty * amount * (100 + tax)) / 100
                              : pro.qty * amount;

                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{pro.p_id.p_name}</td>
                              <td>{pro.p_id.p_sku}</td>
                              <td>
                                <input
                                  type="text"
                                  className="invoice-input qty"
                                  placeholder="0"
                                  id="qty"
                                  name={pro._id}
                                  defaultValue={pro.qty}
                                  // onChange={setItemInput}
                                />{" "}
                                PCS{" "}
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="invoice-input amount"
                                  defaultValue={pro.amount}
                                  id="amount"
                                  name={pro._id}

                                  // onChange={setItemInput}
                                />
                              </td>
                              <td>
                                <div className="input-group mb-2">
                                  <span
                                    className="input-group-text"
                                    id="basic-addon11"
                                  >
                                    %
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="0"
                                    id="dis_per"
                                    name={pro._id}
                                    //   onChange={setItemInput}
                                    defaultValue={pro.discount_per}
                                  />
                                </div>

                                <div className="input-group">
                                  <span
                                    className="input-group-text"
                                    id="basic-addon11"
                                  >
                                    ₹
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="0"
                                    id="dis_amt"
                                    name={pro._id}
                                    //   onChange={setItemInput}
                                    defaultValue={pro.discount}
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="input-group mb-2">
                                  <span
                                    className="input-group-text"
                                    id="basic-addon11"
                                  >
                                    %
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="0"
                                    id="tax"
                                    name={pro._id}
                                    defaultValue={pro.tax}
                                    //   onChange={setItemInput}
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="input-group mb-2">
                                  <span
                                    className="input-group-text"
                                    id="basic-addon11"
                                  >
                                    ₹
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="0"
                                    disabled={true}
                                    value={
                                      pro.discount !== undefined
                                        ? pro.tax !== undefined
                                          ? ((pro.qty * pro.amount -
                                              pro.discount) *
                                              (100 + parseInt(pro.tax, 10))) /
                                            100
                                          : pro.qty * pro.amount - pro.discount
                                        : pro.tax !== undefined
                                        ? (pro.qty *
                                            pro.amount *
                                            (100 + parseInt(pro.tax, 10))) /
                                          100
                                        : pro.qty * pro.amount
                                    }
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="6" className="text-right">
                            Grand Total
                          </td>
                          <td>{inv_data.taxableAmt}</td>
                          <td colSpan={2}>{Number(totalAmount.toFixed(0))}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6 bankDetails">
                        <h4>Bank Details</h4>
                        <ul>
                          <li>
                            Account Name :{" "}
                            <span>{inv_data.bankData.ac_no}</span>
                          </li>
                          <li>
                            IFSC Code : <span>{inv_data.bankData.ifsc}</span>
                          </li>
                          <li>
                            Bank & Branch Name :{" "}
                            <span>{inv_data.bankData.bankName}</span>
                          </li>
                          <li>
                            Account Holder's Name :{" "}
                            <span>{inv_data.bankData.holdername}</span>
                          </li>
                        </ul>
                      </div>

                      <div className="col-6 signatory">
                        <img
                            src={inv_data.signatory}
                          alt="signatoryImage"
                          className="img-fluid"
                          width="200"
                        />
                        <span>Authorized signatory for </span>{" "}
                        <span>Compmany Name</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
