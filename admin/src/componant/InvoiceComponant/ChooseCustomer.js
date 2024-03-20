import React from "react";
export default function ChooseCustomer() {
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
                    <label htmlFor="">Account Holder NAme</label>
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
              </div>

              <h6>Authorized signatory</h6>
              <div className="row">
                <div className="col-lg-6">
                  <div className="additem_div mt-2">
                    <span className="">
                      <i className="bx bx-plus"></i> Upload Image Of Signatory
                    </span>
                  </div>
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
                  <button className="btn orange-btn" onClick={saveBank}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
