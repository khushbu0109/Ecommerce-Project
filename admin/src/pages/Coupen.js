import React, { useContext, useEffect, useState } from "react";
import Preloader from "../componant/Preloader";
import couponCon from "../context/Coupen/CoupenContext";

export default function Coupon(props) {
  const [preloader, setPreloader] = useState("");
  const [editCouponModel, setEditCouponModel] = useState(false);
  const [updateCop, setupdateCop] = useState({});
  const [query, setQuery] = useState("");

  const myContext = useContext(couponCon);
  const { coupon, getAllCoupon, createCoupon, deleteCoupon,updateCoupon} =
    myContext;

  useEffect(() => {
    getAllCoupon();
  }, []);

  const style = {
    background: "#00000080",
    display: "block",
  };
  const [newCoupon, setnewCoupon] = useState({
    name:"",
    desc:"",
    discount:"",
    amount:"",
    expiry_date:"",
    usage_limit:"",
    individual_use:"",
    product_id:"",
    shippig_tags:"",
    exclude_sale_items:"",
    minimum_amount:"",

  });

  const [addCouponModal, setAddCouponModal] = useState(false);

  const openData = () => {
    setAddCouponModal(!addCouponModal);
  };

  const onChange = (e) => {
    setnewCoupon({ ...newCoupon, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setPreloader("preShow");
    const response = await createCoupon(newCoupon);
    if (response.status === "Success") {
      openData();
      props.showAlert(response.message, "success");
    } else {
      props.showAlert(response.message, "warning");
    }
    setPreloader("");
  };

  /*   delete category */

  const delete_cat = async (id) => {
    setPreloader("preShow");
    const response = await deleteCoupon(id);
    console.log(id);
    if (response.status === "Success") {
      props.showAlert(response.message, "success");
    } else {
      props.showAlert(response.messae, "warning");
    }
    setPreloader("");
  };


  const onEdit = (e) => {
    setupdateCop({ ...updateCop, [e.target.name]: e.target.value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    setPreloader("preShow");
    const response = await updateCoupon(updateCop._id, updateCop);
    if (response.status === "Success") {
      openCopEdit({});
      props.showAlert(response.message, "success");
    } else {
      props.showAlert(response.message, "warning");
    }
    setPreloader("");
  };
  const openCopEdit = (cat) => {
    setEditCouponModel(!editCouponModel);
    if (cat) {
      setupdateCop(cat);
    }
  };


  return (
    <>
      <Preloader show={preloader} />
      {editCouponModel && (
        <div className="modal reviewModal" style={style}>
          <div className="modal-dialog" style={{ width: "40%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add New Coupon
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={()=>{
                    openCopEdit()
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <form
                  id="formAccountSettings"
                  method="POST"
                  onSubmit={handleUpdate}

                >
                  <div className="row">
                    {/* category add section */}

                    <div className="col-6">
                      <div className="form-group mb-3">
                        <label className="form-label">Enter Coupon Name</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="name"
                          defaultValue={updateCop.name}
                          id=""
                          aria-describedby="helpId"
                          placeholder="Coupon Name"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label">Enter description</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="desc"
                          id=""
                          aria-describedby="helpId"
                          defaultValue={updateCop.desc}
                          placeholder=" description"
                          onChange={onEdit}
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label className="form-label">
                          Enter discounted amount
                        </label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="discount" defaultValue={updateCop.discount}
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter discount"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label">
                          Enter usage_limit
                        </label>
                        <input
                          type="Number"
                          className="form-control    m-0"
                          name="usage_limit" defaultValue={updateCop.usage_limit}
                          id=""
                          aria-describedby="helpId"
                          placeholder="usage_limit"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label">
                          Enter individual_use
                        </label>
                        <input
                          type="Number"
                          className="form-control    m-0"
                          name="individual_use" defaultValue={updateCop.individual_use}
                          id=""
                          aria-describedby="helpId"
                          placeholder="individual_use"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label">
                          Enter product_id
                        </label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="product_id" defaultValue={updateCop.product_id}
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter product_id"
                          onChange={onEdit}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <label className="form-label">Enter amount</label>
                        <input
                          type="Number"
                          defaultValue={updateCop.amount}
                          className="form-control    m-0"
                          name="amount"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter amount"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label">Enter expiry date</label>
                        <input
                          type="date"
                          className="form-control    m-0"
                          name="expiry_date"
                          id=""
                          aria-describedby="helpId"
                          defaultValue={updateCop.expiry_date}
                          placeholder="Expiry date"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label">Enter shippig_tags</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="shippig_tags"
                          id=""
                          aria-describedby="helpId"
                          defaultValue={updateCop.shippig_tags}
                          placeholder="shippig_tags"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label">Enter exclude_sale_itemse</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="exclude_sale_items"
                          id=""
                          aria-describedby="helpId"
                          defaultValue={updateCop.exclude_sale_items}
                          placeholder="exclude_sale_items"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label">Enter minimum_amount</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="minimum_amount"
                          id=""
                          aria-describedby="helpId"
                          defaultValue={updateCop.minimum_amount}
                          placeholder="Expiry date"
                          onChange={onEdit}
                        />
                      </div>

                    </div>
                    {/* category add section end */}
                  </div>
                  <div className="mt-3">
                    <button
                      type="reset"
                      className="btn btn-outline-primary me-2 my-btn"
                      onClick={openCopEdit}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn orange-btn btn-primary me-2"
                      onClick={handleUpdate}
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}



      {addCouponModal && (
        <div className="modal reviewModal" style={style}>
          <div className="modal-dialog" style={{ width: "40%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add New Coupon
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={openData}
                ></button>
              </div>
              <div className="modal-body">
                <form
                  id="formAccountSettings"
                  method="POST"
                  onSubmit={handleClick}

                >
                  <div className="row">
                    {/* category add section */}

                    <div className="col-6">
                      <div className="form-group mb-3">
                        <label className="form-label">Enter Coupon Name</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="name"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Coupon Name"
                          onChange={onChange}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label">Enter description</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="desc"
                          id=""
                          aria-describedby="helpId"
                          placeholder=" description"
                          onChange={onChange}
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label className="form-label">
                          Enter discounted amount
                        </label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="discount"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter discount"
                          onChange={onChange}
                        />
                      </div>
                      <div className="form-group mb-3">
                      <label className="form-label">
                        Enter usage_limit
                      </label>
                      <input
                        type="Number"
                        className="form-control    m-0"
                        name="usage_limit"
                        id=""
                        aria-describedby="helpId"
                        placeholder="usage_limit"
                        onChange={onchange}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">
                        Enter individual_use
                      </label>
                      <input
                        type="Number"
                        className="form-control    m-0"
                        name="individual_use"
                        id=""
                        aria-describedby="helpId"
                        placeholder="individual_use"
                        onChange={onchange}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">
                        Enter product_id
                      </label>
                      <input
                        type="text"
                        className="form-control    m-0"
                        name="product_id"
                        id=""
                        aria-describedby="helpId"
                        placeholder="Enter product_id"
                        onChange={onchange}
                      />
                    </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <label className="form-label">Enter amount</label>
                        <input
                          type="Number"
                          className="form-control    m-0"
                          name="amount"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter amount"
                          onChange={onChange}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label">Enter expiry date</label>
                        <input
                          type="date"
                          className="form-control    m-0"
                          name="expiry_date"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Expiry date"
                          onChange={onChange}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label">Enter shippig_tags</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="shippig_tags"
                          id=""
                          aria-describedby="helpId"

                          placeholder="shippig_tags"
                          onChange={onchange}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label">Enter exclude_sale_itemse</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="exclude_sale_items"
                          id=""
                          aria-describedby="helpId"

                          placeholder="exclude_sale_items"
                          onChange={onchange}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label">Enter minimum_amount</label>
                        <input
                          type="Number"
                          className="form-control    m-0"
                          name="minimum_amount"
                          id=""
                          aria-describedby="helpId"

                          placeholder="Expiry date"
                          onChange={onchange}
                        />
                      </div>

                    </div>
                    {/* category add section end */}
                  </div>
                  <div className="mt-3">
                    <button
                      type="reset"
                      className="btn btn-outline-primary me-2 my-btn"
                      onClick={openData}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn orange-btn btn-primary me-2"
                      onClick={handleClick}
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="fixed-button">
            <div
              className="btn btn-sm fixed_button btn-outline-primary"
              onClick={openData}
            >
              + Add Coupon
            </div>
          </div>
          <div className="row">
            <h4 className="card-header c_heading">
              <span className="headingcontent">My Coupon</span>

              <div className="heading_buttons">
                {/* <input
                  className="form-control  search  mb-4"
                  placeholder="Search category..."
                /> */}
              </div>
            </h4>

            <div className="col-lg-12 mb-4 ">
              <div className="card">
                <h5 className="card-header">
                  <div className="row">
                    <div className="col-lg-6 font-bold">
                      <ul className="slider_button slider-white plain-orange">
                        <li className="slider-active me-3">Coupon</li>
                      </ul>
                    </div>
                    <div className="col-lg-6 text-right">
                      <input
                        type="text"
                        className="form-control search"
                        placeholder="Search Category..."
                        onChange={(e) => {
                          setQuery(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </h5>

                <div className="table-responsive text-nowrap mb-1">
                  <table className="table table-hover">
                    <thead className="order_history_header">
                      <tr>
                        <th>Name</th>

                        <th>Description </th>

                        <th>Discount</th>
                        <th>Expire Date</th>
                        <th>Amount</th>
                        <th>Usage_Limit</th>
                        <th>individual_Use</th>
                        <th>Product_Id</th>
                        <th>Shippig_Tags</th>
                        <th>Exclude_sale_items</th>
                        <th>Minimum_Amount</th>


                        <th className="action">Action</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0 order_history_body">
                      {coupon
                        .filter((cop) => {
                          return cop.name
                            .toLowerCase()
                            .includes(query.toLowerCase());
                        }).map((cop, index) => {
                        return (
                          <tr key={index}>
                            <td>{cop.name}</td>

                            <td>{cop.desc}</td>
                            <td>{cop.discount}</td>
                            <td>{cop.expiry_date}</td>
                            <td>{cop.amount}</td>
                            <td>{cop.usage_limit}</td>
                            <td>{cop.individual_use}</td>
                            <td>{cop.product_id}</td>
                            <td>{cop.shippig_tags}</td>
                            <td>{cop.exclude_sale_items}</td>
                            <td>{cop.minimum_amount}</td>


                            <td className="action">
                              <i className="bx bx-edit me-1" onClick={()=>{
                                openCopEdit(cop)
                              }}></i>

                              <i
                                className="bx bx-trash me-1"
                                onClick={() => {
                                  delete_cat(cop._id);
                                }}
                              ></i>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
