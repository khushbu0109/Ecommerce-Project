import React, { Component, useState, useEffect } from "react";
import { useRef } from "react";
require("dotenv").config();
export default function InvioceSetting(props) {
  const host = process.env.REACT_APP_URL;

  // get invoice setting

  const [invDatasetting, setinvSetting] = useState({});

  useEffect(() => {
    getinvoiceSetting();
  }, []);

  const getinvoiceSetting = async () => {
    try {
      props.openLoader();
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        // body: JSON.stringify(body),
      };
      const response = await fetch(
        `${host}/api/settings/getinvoicesetting/${localStorage.getItem(
          "com_id"
        )}`,
        requestOptions
      );
      const datares = await response.json();
      const stare = {
        ...invocesetting.bankData,
        bankName: datares.data.invoiceSetting.bankData.bankName,
        ifsc: datares.data.invoiceSetting.bankData.ifsc,
        branch: datares.data.invoiceSetting.bankData.branch,
        holdername: datares.data.invoiceSetting.bankData.holdername,
      };
      setInvoiceSetting({
        ...invocesetting,
        bankData: stare,
        signatory: datares.data.invoiceSetting.signatory,
        invoice_prefix: datares.data.invoiceSetting.invoice_prefix,
      });

      setinvSetting(datares.data);
      props.closeLoader();
    } catch (e) {
      console.log(e.message);
    }
  };

  const style = {
    background: "#00000080",
    display: "block",
  };

  const [invocesetting, setInvoiceSetting] = useState({
    bankData: {
      bankName: "",
      ifsc: "",
      branch: "",
      holdername: "",
      ac_no: "",
    },
    signatory: "",
    invoice_prefix: "",
  });

  const inputData = (e) => {
    const { name, value } = e.target;
    const stare = { ...invocesetting.bankData, [name]: value };
    setInvoiceSetting({ ...invocesetting, bankData: stare });
  };

  const invoiceInput = (e) => {
    setInvoiceSetting({ ...invocesetting, [e.target.name]: e.target.value });
  };

  const saveBank = async (e) => {
    e.preventDefault();
    props.openLoader();
    const body = {
      c_id: localStorage.getItem("com_id"),
      invoiceSetting: invocesetting,
    };
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(body),
      };
      const response = await fetch(
        `${host}/api/settings/setInvoiceSettings`,
        requestOptions
      );
      const datares = await response.json();
      if (datares.status === "Success") {
        const image = await updateImageSignatory(datares.data._id);
        props.showAlert(datares.msg, "success");
      } else {
        props.showAlert(datares.msg, "danger");
      }
    } catch (e) {
      props.showAlert(e.message, "warning");
    }
  };

  const updateImageSignatory = async (id) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: filedata,
      };
      const response = await fetch(
        `${host}/api/settings/updateSignatoryImage/${id}`,
        requestOptions
      );
      const datares = await response.json();
      if (datares.status === "Success") {
        props.showAlert(datares.msg, "success");
      } else {
        props.showAlert(datares.msg, "danger");
      }
      props.closeLoader();
      props.open();
    } catch (e) {
      props.showAlert(e.message, "warning");
    }
  };

  // set file input for signatory

  const inputFile = useRef(null);
  const openField = () => {
    inputFile.current.click();
  };

  const filedata = new FormData();
  const selelctFile = (e) => {
    console.log(e.target.files[0]);
    filedata.append("file", e.target.files[0]);
  };

  console.log(filedata);
  // alert(invocesetting.bankData.ac_no)

  return (
    <>
      <div className={`modal reviewModal`} style={style}>
        <div className="modal-dialog" style={{ width: "50em" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Invoice Settings
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={props.open}
              ></button>
            </div>
            <div className="modal-body">
              <form method="POST" onSubmit={saveBank}>
                <h6>Bank Details</h6>
                <div className="row mb-4">
                  <div className="col-lg-6 mb-2">
                    <div className="form-group">
                      <label htmlFor="">Bank Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="bankName"
                        id="bankName"
                        aria-describedby="helpId"
                        placeholder="Bank Name"
                        onChange={inputData}
                        defaultValue={invocesetting.bankData.bankName}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group">
                      <label htmlFor="">IFSC Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="ifsc"
                        id="ifsc"
                        aria-describedby="helpId"
                        placeholder="IFSC Code"
                        onChange={inputData}
                        defaultValue={invocesetting.bankData.ifsc}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group">
                      <label htmlFor="">Bank & Branch Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="branch"
                        id="branch"
                        aria-describedby="helpId"
                        placeholder="Bank & Branch Name"
                        onChange={inputData}
                        defaultValue={invocesetting.bankData.branch}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group">
                      <label htmlFor="">Account Holder Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="holdername"
                        id="holdername"
                        aria-describedby="helpId"
                        placeholder="Account Holder Name"
                        onChange={inputData}
                        defaultValue={invocesetting.bankData.holdername}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group">
                      <label htmlFor="">Account Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="ac_no"
                        id="ac_no"
                        aria-describedby="helpId"
                        placeholder="Account Number"
                        onChange={inputData}
                        defaultValue={invocesetting.bankData.ac_no}
                      />
                    </div>
                  </div>
                </div>

                <h6>Authorized signatory</h6>
                <div className="row">
                  <div className="col-lg-6">
                    {invDatasetting.signatory === "" ? (
                      <div className="additem_div mt-2" onClick={openField}>
                        <span className="">
                          <i className="bx bx-plus"></i> Upload Image Of
                          Signatory
                        </span>
                      </div>
                    ) : (
                      <img
                        src={invocesetting.signatory}
                        className="img-fluid"
                        alt="signatory image"
                        onClick={openField}
                      />
                    )}

                    <input
                      ref={inputFile}
                      type="file"
                      className="d-none"
                      onChange={selelctFile}
                    />
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="">Invoice Prefix</label>
                      <input
                        type="text"
                        className="form-control"
                        name="invoice_prefix"
                        id="invoice_prefix"
                        aria-describedby="helpId"
                        placeholder="Invoice Prefix"
                        onChange={invoiceInput}
                        defaultValue={invocesetting.invoice_prefix}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 mt-4">
                    <button type="submit" className="btn orange-btn">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
