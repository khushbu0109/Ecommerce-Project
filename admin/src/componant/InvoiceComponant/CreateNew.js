import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CusContext from "../../context/Customer/CustomerContext";
import SettingContext from "../../context/Setting/SettingContext";
import "../../css/invoice.css";
import Preloader from "../Preloader";
import AddProductModal from "./AddProductModal";
require("dotenv").config();

export function CreateInvoice(props) {
  const host = process.env.REACT_APP_URL;
  let totalAmount = 0;
  let taxableamt = 0;
  const navigate = useNavigate();

  const context = useContext(CusContext);
  const { myCustomer, getAllCustomer, addCustomer, getAllOrder } = context;
  useEffect(() => {
    getAllCustomer();
    getinvoiceSetting();
  }, []);

  // preloader
  const [preloader, setPreloader] = useState("");

  const openLoader = () => {
    setPreloader("preShow");
  };
  const closeLoader = () => {
    setPreloader("");
  };
  // #################

  const [customerData, setCustomerData] = useState({
    customer_id: {
      _id: "637e48ffcf1ce3efee006166",
      fullname: "Party Name",
      phone: 9999999999,
      address: "",
      password: "$2a$10$8okR.PT1dr/7BH7Ym3z/ze2q6K0/PPObp133A7Fz8vg.MRDJUKu/y",
      type: "user",
      createBy: "self",
      subscription: "",
      subcribeAt: null,
      customer_data: [],
      createAt: "2022-11-23T16:23:27.801Z",
      __v: 0,
    },
    _id: "637e48ffcf1ce3efee006168",
  });
  const chhooseCustomer = (e) => {
    console.log(e.target.value);
    if (e.target.value.toString() !== "0") {
      const customer = myCustomer.filter((com) => {
        return com._id === e.target.value;
      });
      setCustomerData(customer[0]);
      setBtnDisable(false);
    }
  };

  // ###################
  // invoice setting

  const invoicContext = useContext(SettingContext);
  const { setting, getinvoiceSetting } = invoicContext;

  const [modal, setmodal] = useState(true);
  const openProduct = () => {
    setmodal(!modal);
  };
  // invoice settingas
  // ###################

  // ##################
  // Item Selected

  const [selecteItem, setSelectedItem] = useState([]);
  const setItemData = (data) => {
    let myArr = selecteItem;
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      myArr.push(element);
    }
    // console.log(myArr);
    setSelectedItem(myArr);
  };

  const removeItem = (id) => {
    const updatedat = selecteItem.filter((pro) => {
      return pro._id !== id;
    });
    console.log(updatedat);
    setSelectedItem(updatedat);
  };

  const setItemInput = (e) => {
    const { name, value, id } = e.target;
    if (id === "qty") {
      const qty = selecteItem.map((item) => {
        return item._id === name ? { ...item, qty: value } : item;
      });
      setSelectedItem(qty);
    } else if (id === "amount") {
      const qty = selecteItem.map((item) => {
        return item._id === name ? { ...item, amount: value } : item;
      });
      setSelectedItem(qty);
    } else if (id === "tax") {
      const qty = selecteItem.map((item) => {
        return item._id === name ? { ...item, tax: value } : item;
      });
      setSelectedItem(qty);
    } else if (id === "dis_per") {
      const qty = selecteItem.map((item) => {
        const discountAmount = (item.amount * value) / 100;
        return item._id === name
          ? { ...item, discount_per: value, discount: discountAmount }
          : item;
      });
      setSelectedItem(qty);
    } else if (id === "dis_amt") {
      const qty = selecteItem.map((item) => {
        const percent = Number(((value * 100) / item.amount).toFixed(1));
        return item._id === name
          ? { ...item, discount_per: percent, discount: value }
          : item;
      });
      setSelectedItem(qty);
    }
  };

  // Item Selected
  // ################

  const [body, setBodyData] = useState({
    customer_id: "",
    inv_number: "",
    item_data: [{ p_id: "", qty: "", discountType: true, tax: "", amount: "" }],
    taxableAmt: "",
    totalPrice: "",
    signatory: "",
    createdAt: "",
  });

  const chooseDate = (e) => {
    setBodyData({ ...body, createdAt: e.target.value });
  };

  // #################
  // Save Data

  

  const [btnDisable, setBtnDisable] = useState(true);

  const saveData = () => {
    const invno = setting.invoiceSetting.invoice_prefix;
    const itemData = selecteItem.map((pro) => {
      return {
        p_id: pro._id,
        qty: pro.qty,
        tax: pro.tax,
        amount: pro.amount,
        discount: pro.discount,
      };
    });
    setBodyData({
      ...body,
      customer_id: customerData._id,
      inv_number: invno,
      item_data: itemData,
      taxableAmt: taxableamt,
      totalPrice: totalAmount,
      bankData: setting.invoiceSetting.bankData,
      signatory: setting.invoiceSetting.signatory,
    });
    addInvoice();
  };

  const addInvoice = async () => {
    try {
      openLoader();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(body),
      };
      const response = await fetch(
        `${host}/api/invoice/createInvoice`,
        requestOptions
      );
      const datares = await response.json();
      console.log(datares);
      closeLoader();
      if (datares.status === "Success") {
        props.showAlert(datares.msg, "success");
        navigate("/invoice");
      } else {
        props.showAlert(datares.msg, "warning");
      }
    } catch (e) {
      props.showAlert(e.message, "warning");
      console.log(e.message);
      closeLoader();
    }
  };

  console.log(body);
  // ##################
  // Save Data
  return (
    <>
      <Preloader show={preloader} />
      {modal && <AddProductModal open={openProduct} setItem={setItemData} />}
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="fixed-button">
            <button
              className="btn btn-sm fixed_button btn-outline-primary"
              onClick={saveData}
              disabled={btnDisable}
            >
              Save
            </button>
          </div>
          <div className="row">
            <h4 className="card-header c_heading">
              <div className="row">
                <div className="col-lg-3">
                  <span className="headingcontent">Create New Invoice</span>
                </div>
              </div>

              <div className="heading_buttons"></div>
            </h4>

            <div className="col-lg-8 mb-4">
              <div className="row">
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-header m-0">
                      Bill To{" "}
                      {/* <span className="changepartybtn">Change Party</span> */}
                      <div className="form-group changepartybtn">
                        <select
                          className="form-control"
                          name=""
                          id=""
                          onChange={chhooseCustomer}
                        >
                          <option value="0">Select Customer</option>
                          {myCustomer.map((cus) => {
                            return (
                              <option value={cus._id}>
                                {cus.customer_id.fullname}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="card-body m-0">
                      <span className="font-bold party_name">
                        {customerData.customer_id.fullname}
                      </span>
                      <span className="bill_address">
                        <small>Address: </small>{" "}
                        {customerData.customer_id.address}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-header ">Ship To</div>
                    <div className="card-body">
                      <span className="font-bold party_name">
                        {customerData.customer_id.fullname}
                      </span>
                      <span className="bill_address">
                        <small>Address: </small>
                        {customerData.customer_id.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4 invoiceDateSection">
              <div className="card">
                {/* <div className="card-header pb-1">Ship To</div> */}
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6">
                      <span className="invoiceHeading">Invoice Prefix:</span>
                      <input
                        type={"text"}
                        className="invoice-input"
                        defaultValue={setting.invoiceSetting.invoice_prefix}
                      />
                    </div>
                    <div className="col-lg-6">
                      <span className="invoiceHeading">Invoice Number:</span>
                      <input
                        type={"text"}
                        className="invoice-input"
                        defaultValue={"221"}
                      />
                    </div>
                    <div className="col-lg-12">
                      <span className="invoiceHeading">
                        Sales Invoice Date:
                      </span>
                      <input
                        type={"date"}
                        className="invoice-input"
                        name="inv_date"
                        onChange={chooseDate}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 mb-4">
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
                        <th className="text-center fixed-width">
                          <i className="bx bxs-add-to-queue"></i>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selecteItem.map((pro, index) => {
                        totalAmount +=
                          pro.discount !== undefined
                            ? pro.tax !== undefined
                              ? ((pro.qty * pro.amount - pro.discount) *
                                  (100 + parseInt(pro.tax, 10))) /
                                100
                              : pro.qty * pro.amount - pro.discount
                            : pro.tax !== undefined
                            ? (pro.qty *
                                pro.amount *
                                (100 + parseInt(pro.tax, 10))) /
                              100
                            : pro.qty * pro.amount;

                        taxableamt +=
                          pro.discount !== undefined
                            ? pro.tax !== undefined
                              ? ((pro.qty * pro.amount - pro.discount) *
                                  parseInt(pro.tax, 10)) /
                                100
                              : 0
                            : pro.tax !== undefined
                            ? (pro.qty * pro.amount * parseInt(pro.tax, 10)) /
                              100
                            : 0;

                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>
                              {pro.p_name}

                              {pro.p_price.length === 0 ? (
                                ""
                              ) : (
                                <>
                                  <br />
                                  Variation -
                                  <select className="form-group changepartybtn">
                                    {pro.p_price.map((attr) => {
                                      return (
                                        <option value={attr.name}>
                                          {attr.name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </>
                              )}
                            </td>
                            <td>{pro.p_sku}</td>
                            <td>
                              <input
                                type="text"
                                className="invoice-input qty"
                                placeholder="0"
                                id="qty"
                                name={pro._id}
                                onChange={setItemInput}
                              />{" "}
                              PCS{" "}
                            </td>
                            <td>
                              <input
                                type="text"
                                className="invoice-input amount"
                                defaultValue={1}
                                id="amount"
                                name={pro._id}
                                onChange={setItemInput}
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
                                  onChange={setItemInput}
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
                                  onChange={setItemInput}
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
                                  onChange={setItemInput}
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
                            <td className="text-center">
                              <i
                                className="bx bxs-trash"
                                onClick={() => {
                                  removeItem(pro._id);
                                }}
                              ></i>
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
                        <td>{taxableamt}</td>
                        <td colSpan={2}>{Number(totalAmount.toFixed(0))}</td>
                      </tr>
                    </tfoot>
                  </table>

                  <div className="additem_div mt-2" onClick={openProduct}>
                    <span className="">
                      <i className="bx bx-plus"></i> Add Item
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6 bankDetails">
                      <h4>Bank Details</h4>
                      <ul>
                        <li>
                          Account Name :{" "}
                          <span>{setting.invoiceSetting.bankData.ac_no}</span>
                        </li>
                        <li>
                          IFSC Code :{" "}
                          <span>{setting.invoiceSetting.bankData.ifsc}</span>
                        </li>
                        <li>
                          Bank & Branch Name :{" "}
                          <span>
                            {setting.invoiceSetting.bankData.bankName}
                          </span>
                        </li>
                        <li>
                          Account Holder's Name :{" "}
                          <span>
                            {setting.invoiceSetting.bankData.holdername}
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="col-lg-6 signatory">
                      <img
                        src={setting.invoiceSetting.signatory}
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
    </>
  );
}
