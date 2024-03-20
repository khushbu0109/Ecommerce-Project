import React, { useContext, useEffect, useState } from "react";
import Preloader from "../componant/Preloader";

import orderCon from "../context/Order/OrderContext";
import DataTable from "react-data-table-component";

const Order = (props) => {
  const [preloader, setPreloader] = useState("");
  const [editOrderModel, setEditOrderModel] = useState(false);
  const [updateOrd, setUpdateOrd] = useState({});
  const [query, setQuery] = useState("");

  const myContext = useContext(orderCon);
  const { order, getAllOrder, createOrder, deleteOrder, updateOrder } =
    myContext;

  useEffect(() => {
    getAllOrder();
  }, []);
  const style = {
    background: "#00000080",
    display: "block",
  };
  const [newOrder, setnewOrder] = useState({

    p_name: "",
    quantity: "",
    price: "",
    total:""
  });

  const [addOrderModal, setAddOrderModal] = useState(false);

  const openData = () => {
    setAddOrderModal(!addOrderModal);
  };

  const onChange = (e) => {
    setnewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  /*  const onChange = (e) => {
      setTerm({ ...term, [e.target.name]: e.target.value });
      setnewOrder({ ...newOrder, term: term });
    };
 */
  const handleClick = async (e) => {
    e.preventDefault();
    setPreloader("preShow");
    const response = await createOrder(newOrder);
    if (response.status === "Success") {
      openData();
      props.showAlert(response.message, "success");
    } else {
      props.showAlert(response.message, "warning");
    }
    setPreloader("");
  };
  /*   const metaChange = (e) => {
    setOrder_data({ ...order_data, [e.target.name]: e.target.value });
    setnewOrder({ ...newOrder, meta_data: order_data });
  }; */

  /*   delete category */

  const delete_order = async (id) => {
    setPreloader("preShow");
    const response = await deleteOrder(id);
    console.log(id);
    if (response.status === "Success") {
      props.showAlert(response.message, "success");
    } else {
      props.showAlert(response.messae, "warning");
    }
    setPreloader("");
  };
  const onEdit = (e) => {
    setUpdateOrd({ ...updateOrd, [e.target.name]: e.target.value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    setPreloader("preShow");
    const response = await updateOrder(updateOrd._id, updateOrd);
    if (response.status === "Success") {
      openOrderEdit({});
      props.showAlert(response.message, "success");
    } else {
      props.showAlert(response.message, "warning");
    }
    setPreloader("");
  };
  const openOrderEdit = (cat) => {
    setEditOrderModel(!editOrderModel);
    if (cat) {
      setUpdateOrd(cat);
    }
  };
  const changeStatus = async (id, status, type) => {
    setPreloader("preShow");
    let response = {};
    if (type === "status") {
      response = await updateOrder(id,{ status: status });
    } else {
      response = await updateOrder(id,{ status: status });
    }
    response.status === "Success"
      ? props.showAlert(`${type} status is update`, "success")
      : props.showAlert(response.messae, "danger");
    setPreloader("");

  };
  const[statusChange,setStatusChange]=useState(null);
  const columns = [
    {
      name: "Product name",
      selector: (row) => row.p_name,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => row.total,
      sortable: true,
    },
    {
      name: "status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name:"Action",
      selector:row=>row.action
    }

  ];

const data=order.filter((ord)=>{
    return((statusChange===null || ord.status===statusChange)&&ord.p_name.toLowerCase().includes(query.toLowerCase()));
})
.map((ord,index)=>{
return{
  id:index,
  p_name:ord.p_name,
  quantity:ord.quantity,
  price:ord.price,
  total:ord.total,
  status: ord.status ? (
    <span class="badge bg-success me-1" onClick={() => {
      changeStatus(ord._id, false, "status");

    }}>Aporved</span>

  ) : (
    <span class="badge bg-danger me-1" onClick={() => {
      changeStatus(ord._id, true, "status");

    }}>Pending</span>
  ),
  action: (
    <div className="dropdown">
    <span class="badge bg-warning me-1">
      <i
        className="bx bx-edit me-1"
        onClick={() => {
          openOrderEdit(ord);
        }}
      ></i>
      </span>
      <span class="badge bg-danger">
      <i
        className="bx bx-trash me-1"
        onClick={() => {
          delete_order(ord._id);
        }}
      ></i>
      </span>
    </div>
  ),
}
})

  return (
    <>
      <Preloader show={preloader} />

      {editOrderModel && (
        <div className="modal reviewModal" style={style}>
          <div className="modal-dialog" style={{ width: "40%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Order Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={()=>{
                    openOrderEdit()
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
                        <label className="form-label">Enter Order Name</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="p_name"
                          defaultValue={updateOrd.p_name}
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter  Product Name"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label">Enter quantity</label>
                        <input
                          type="Number"
                          className="form-control    m-0"
                          name="quantity"
                          defaultValue=                     {updateOrd.quantity}
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter  Phone"
                          onChange={onEdit}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <label className="form-label">Enter Price</label>
                        <input
                          type="price"
                          className="form-control    m-0"
                          name="price"
                          defaultValue={updateOrd.price}
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter Price "
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label">total</label>
                        <input
                          type="Number"
                          className="form-control    m-0"
                          name="total"
                          defaultValue={updateOrd.total}
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter total "
                          onChange={onEdit}
                        />
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Status True
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          checked
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          Status False
                        </label>
                      </div>
                    </div>
                    {/* category add section end */}
                  </div>
                  <div className="mt-3">
                    <button
                      type="reset"
                      className="btn btn-outline-primary me-2 my-btn"
                      onClick={openOrderEdit}
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
      {addOrderModal && (
        <div className="modal reviewModal" style={style}>
          <div className="modal-dialog" style={{ width: "40%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Order Details
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
                        <label className="form-label">Enter Order Name</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="p_name"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter  Product Name"
                          onChange={onChange}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label">Enter quantity</label>
                        <input
                          type="Number"
                          className="form-control    m-0"
                          name="quantity"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter  Phone"
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <label className="form-label">Enter Price</label>
                        <input
                          type="price"
                          className="form-control    m-0"
                          name="price"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter Price "
                          onChange={onChange}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label">total</label>
                        <input
                          type="Number"
                          className="form-control    m-0"
                          name="total"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter total "
                          onChange={onChange}
                        />
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Status True
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          checked
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          Status False
                        </label>
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
              + Add Order Details
            </div>
          </div>
          <div className="row">
            <h4 className="card-header c_heading">
              <span className="headingcontent">My Orders</span>

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
                        <li className="slider-active me-3">Order</li>
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
                <DataTable pagination columns={columns} data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
