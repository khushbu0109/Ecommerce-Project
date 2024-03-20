import React, { useContext, useEffect, useState } from "react";
import catContext from "../../context/Category/catContext";

require("dotenv").config();

export default function BulkPriceChange(props) {
  const host = process.env.REACT_APP_URL;
  const style = {
    background: "#00000080",
    display: "block",
  };

  const context = useContext(catContext);
  const { category, getAllCategory } = context;

  useEffect(() => {
    if (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("com_id")
    ) {
      getAllCategory();
    }
  }, []);

  const [type, setType] = useState("Percentage");
  const [bodyData, setBodyData] = useState({
    cat_id: "",
    discount: "",
    discountPer: true,
    type: true,
  });

  const setFormdata = (e) => {
    setBodyData({ ...bodyData, [e.target.name]: e.target.value });
  };

  const typeSet = (e) => {
    
    if (e.target.value === "increment") {
      setBodyData({ ...bodyData, type: true });
    } else {
      setBodyData({ ...bodyData, type: false });
    }
  };

  const typeChange = (text) => {
    setType(text);
    if (text === "Percentage") {
      setBodyData({ ...bodyData, discountPer: true });
    } else {
      setBodyData({ ...bodyData, discountPer: false });
    }
  };

  const submitformdata = async (e) => {
    e.preventDefault();
    const requestOptions2 = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(bodyData),
    };
    const response2 = await fetch(
      `${host}/api/product/bulkUpdateProductPrice`,
      requestOptions2
    );
    const updatePrice = await response2.json();
    if(updatePrice.status === "Success"){
        props.open();
        props.reload();        
    }
  };

  return (
    <>
      <div className="modal reviewModal" style={style}>
        <div className="modal-dialog" style={{ width: "35em" }}>
          <div className="modal-content">
            <form method="post" onSubmit={submitformdata}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Bulk Change Price
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
                <div className="mb-3">
                  <label htmlFor="cat_id" className="col-form-label">
                    Choose Category
                  </label>
                  <select
                    type="text"
                    className="form-control"
                    name="cat_id"
                    id="cat_id"
                    onChange={setFormdata}
                  >
                    {category.length === 0 ? (
                      <option>No Category Found</option>
                    ) : (
                      <option>Select Category</option>
                    )}
                    {category.map((cat) => {
                      return <option value={cat._id}>{cat.cat_name}</option>;
                    })}
                  </select>
                </div>

                <div class="form-check mt-3">
                  <input
                    name="type"
                    class="form-check-input"
                    type="radio"
                    value="decrement"
                    id="defaultRadio1"
                    onChange={typeSet}
                  />
                  <label class="form-check-label" for="defaultRadio1">
                    Decrement
                  </label>
                </div>

                <div class="form-check mt-3">
                  <input
                    name="type"
                    class="form-check-input"
                    type="radio"
                    value="increment"
                    id="defaultRadio1"
                    onChange={typeSet}
                    defaultChecked
                  />
                  <label class="form-check-label" for="defaultRadio1">
                    Increment
                  </label>
                </div>

                <label htmlFor="discount" className="col-form-label">
                  Changed Price
                </label>

                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Text input with dropdown button"
                    placeholder="Give discounts on MRP "
                    name="discount"
                    onChange={setFormdata}
                  />

                  <button
                    className="btn btn-outline-primary dropdown-toggle my-dropdown"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {type}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <p
                        className="dropdown-item"
                        onClick={() => {
                          typeChange("Percentage");
                        }}
                      >
                        Percentage
                      </p>
                    </li>
                    <li>
                      <p
                        className="dropdown-item"
                        onClick={() => {
                          typeChange("Amount");
                        }}
                      >
                        Amount
                      </p>
                    </li>
                  </ul>
                  <small className="text-muted">
                    Give Discount percetange wise or flat rate wise on MRP of
                    your products. All the products in the catalog will be
                    discounted by same percentage or amount you choose. When you
                    give discount amount wise the amount wil be discounted on
                    product unit and then the price of packaging and master
                    packaging will be auto calculated.
                  </small>
                </div>

                <p className="instruction_para">
                  You can manage the customers and products of this catalog in
                  the next step.
                </p>
              </div>
              <div className="modal-footer">
                {/* <button type="button" className="btn  my-btn me-2 mb-2">
                  Watch Demo Video
                </button> */}
                <button
                  type="submit"
                  className="btn btn-primary orange-btn me-2 mb-2"
                >
                  Change Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
