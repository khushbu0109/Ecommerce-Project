import React from "react";
export default function ConfirmAlert(props) {
  return (
    <>
      <div className={`modal reviewModal`} style={props.style}>
        <div className="modal-dialog" style={{ width: "30em" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {props.heading}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={props.open}
              ></button>
            </div>
            <div className="row">
              <div className="col-md-6"></div>
              <div className="col-md-6 mr-0">
                <p className="my-btn btn" onClick={props.open}>Cancel</p>
                <p className="orange-btn btn me-2" onClick={props.confirm}>Confirm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
