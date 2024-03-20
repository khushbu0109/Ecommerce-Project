import React, { useContext, useEffect, useState } from "react";

import Preloader from "../componant/Preloader";
import DataTable from "react-data-table-component";
import Cuscon from "../context/Customer/CustomerCon";

const Custmr = (props) => {
  const [preloader, setPreloader] = useState("");
  const [editCusModel, seteditCusModel] = useState(false);
  const [updateCus, setupdateCus] = useState({});

  const [query, setQuery] = useState("");

  const myContext = useContext(Cuscon);
  const {
    customer,
    getAllcustomer,
    createCustomer,
    updatecustomer,
    deleteCustomer,
  } = myContext;

  useEffect(() => {
    getAllcustomer();
  }, []);
  const style = {
    background: "#00000080",
    display: "block",
  };
  const [newCustomer, setnewCustomer] = useState({
    f_name: "",
    l_name: "",
    image: "",
    address: "",
    city: "",
    email: "",
    phone: "",
    country: "",
    orders: "",
    password: "",
    status: "",
  });

  const [addCustomerModel, setaddCustomerModel] = useState(false);

  const openData = () => {
    setaddCustomerModel(!addCustomerModel);
  };

  const onChange = (e) => {
    setnewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setPreloader("preShow");
    const response = await createCustomer(newCustomer);
    if (response.status === "Success") {
      openData();
      props.showAlert(response.message, "success");
    } else {
      props.showAlert(response.message, "warning");
    }
    setPreloader("");
  };
  /*   delete category */

  const delete_cust = async (id) => {
    setPreloader("preShow");
    const response = await deleteCustomer(id);
    console.log(id);
    if (response.status === "Success") {
      props.showAlert(response.message, "success");
    } else {
      props.showAlert(response.messae, "warning");
    }
    setPreloader("");
  };

  const onEdit = (e) => {
    setupdateCus({ ...updateCus, [e.target.name]: e.target.value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    setPreloader("preShow");
    const response = await updatecustomer(updateCus._id, updateCus);
    if (response.status === "Success") {
      openCusEdit({});
      props.showAlert(response.message, "success");
    } else {
      props.showAlert(response.message, "warning");
    }
    setPreloader("");
  };
  const openCusEdit = (cat) => {
    seteditCusModel(!editCusModel);
    if (cat) {
      setupdateCus(cat);
    }
  };
  const changeStatus = async (id, status, type) => {
    setPreloader("preShow");
    let response = {};
    if (type === "status") {
      response = await updatecustomer(id, { status: status });
    } else {
      response = await updatecustomer(id, { status: status });
    }
    response.status === "Success"
      ? props.showAlert(`${type} status is update`, "success")
      : props.showAlert(response.message, "danger");
    setPreloader("");
  };
  const [statusChange, setStatusChange] = useState(null);
const columns=[
  {
    name: "FName",
    selector: (row) => row.f_name,
    sortable: true,
  },
  {
    name: "LName",
    selector: (row) => row.l_name,
    sortable: true,
  },
  {
    name: "Image",
    selector: (row) => row.image,
    sortable: true,
  },
  {
    name: "Orders",
    selector: (row) => row.orders,
    sortable: true,
  },
  {
    name: "Address",
    selector: (row) => row.address,
    sortable: true,
  },
  {
    name: "City",
    selector: (row) => row.city,
    sortable: true,
  },
  {
    name: "Country",
    selector: (row) => row.country,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Phone",
    selector: (row) => row.phone,
    sortable: true,
  },
  {
    name: "Password",
    selector: (row) => row.password,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
  },
  {
    name:"Action",
    selector:row=>row.action
  }
]
 const data=customer.filter((cus) => {
  return (
    (statusChange === null || cus.status === statusChange) &&
    cus.f_name.toLowerCase().includes(query.toLowerCase())
  );
}).map((cus,index)=>{
 return{
  id:index,
  f_name:cus.f_name,
  l_name:cus.l_name,
  image:cus.image,
  orders:cus.orders,
  address:cus.address,
  city:cus.city,
  country:cus.country,
  email:cus.email,
  phone:cus.phone,
  Password:cus.password,
  status: cus.status ? (
    <span class="badge bg-success me-1" onClick={() => {
      changeStatus(cus._id, false, "status");

    }}>Approved</span>

  ) : (
    <span class="badge bg-danger me-1" onClick={() => {
      changeStatus(cus._id, true, "status");

    }}>Pending</span>
  ),
  action: (
    <div className="dropdown">
    <span class="badge bg-warning me-1">
      <i
        className="bx bx-edit me-1"
        onClick={() => {
          openCusEdit(cus);
        }}
      ></i>
      </span>
      <span class="badge bg-danger me-1">
      <i
        className="bx bx-trash me-1"
        onClick={() => {
          delete_cust(cus._id);
        }}
      ></i>
</span>
    </div>
  ),
 };
});

  return (
    <>
      <Preloader show={preloader} />

      {editCusModel && (
        <div className="modal reviewModal" style={style}>
          <div className="modal-dialog" style={{ width: "80%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add New Customer
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={openCusEdit}
                ></button>
              </div>
              <div className="modal-body">
                <form
                  id="formAccountSettings"
                  method="POST"
                  onSubmit={handleUpdate}
                >
                  <div className="row">

                    <div className="col-6">
                    <div className="form-group mb-3">
                    <label className="form-label">Enter FirstName</label>
                    <input
                      type="text"
                      className="form-control    m-0"
                      name="f_name"
                      defaultValue={updatecustomer.f_name}
                      id=""
                      aria-describedby="helpId"
                      placeholder="f_name"
                      onChange={onEdit}
                    />
                  </div>
                      <div className="form-group mb-3">
                        <label className="form-label"> Enter LastName</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="l_name"
                          defaultValue={updatecustomer.l_name}
                          id=""
                          aria-describedby="helpId"
                          placeholder=" l_name"
                          onChange={onEdit}
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label className="form-label"> Enter address</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="address"
                          defaultValue={updatecustomer.address}
                          id=""
                          aria-describedby="helpId"
                          placeholder=" address"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label"> upload Image</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="image"
                          defaultValue={updatecustomer.image}
                          id=""
                          aria-describedby="helpId"
                          placeholder="image"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label"> Enter phoneNo.</label>
                        <input
                          type="Number"
                          className="form-control    m-0"
                          name="phone"
                          defaultValue={updatecustomer.phone}
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter price"
                          onChange={onEdit}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <label className="form-label">Enter Email</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="email"
                          defaultValue={updatecustomer.email}
                          id=""
                          aria-describedby="helpId"
                          placeholder="Email"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label">Enter password</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="password"
                          defaultValue={updatecustomer.password}
                          id=""
                          aria-describedby="helpId"
                          placeholder="password"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label"> Enter city</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="city"
                          defaultValue={updatecustomer.city}
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter city"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label"> Enter country</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="country"
                          defaultValue={updatecustomer.country}
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter country"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label"> Enter status</label>
                        <table width="100%" className="mb-3">
                          <tr>
                            <td>
                              <div className="form-check">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="status"
                                  defaultValue={updatecustomer.status}
                                  value={false}
                                  onChange={onEdit}
                                />
                                <label className="form-label">Draft</label>
                              </div>
                            </td>
                            <td>
                              <div className="form-check">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="status"
                                  defaultValue={updatecustomer.status}
                                  value={true}
                                  onChange={onEdit}
                                />
                                <label className="form-label">Publish</label>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label"> Enter Orders</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="orders"
                          defaultValue={updatecustomer.orders}
                          id=""
                          aria-describedby="helpId"
                          placeholder=" orders"
                        />
                      </div>
                    </div>

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
      {addCustomerModel && (
        <div className="modal reviewModal" style={style}>
          <div className="modal-dialog" style={{ width: "80%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add New Customer
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
                        <label className="form-label"> Enter FirstName</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="f_name"
                          id=""
                          aria-describedby="helpId"
                          placeholder=" f_name"
                          onChange={onChange}
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label className="form-label"> Enter LastName</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="l_name"
                          id=""
                          aria-describedby="helpId"
                          placeholder=" l_name"
                          onChange={onChange}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label"> Upload Image</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="image"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter image"
                          onChange={onChange}
                        />
                      </div>
                      <div className="form-group mb-3">
                      <div className="form-group mb-3">
                        <label className="form-label"> Enter address</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="address"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter address"
                          onChange={onChange}
                        />
                      </div>
                    </div>


                  </div>
                  <div className="col-6">
                  <div className="form-group mb-3">
                    <label className="form-label">
                      Enter city
                    </label>
                    <input
                      type="text"
                      className="form-control    m-0"
                      name="city"
                      id=""
                      aria-describedby="helpId"
                      placeholder="Enter city"
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label"> Enter country</label>
                    <input
                      type="text"
                      className="form-control    m-0"
                      name="country"
                      id=""
                      aria-describedby="helpId"
                      placeholder="Enter country"
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label"> Enter Email</label>
                    <input
                      type="text"
                      className="form-control    m-0"
                      name="email"
                      id=""
                      aria-describedby="helpId"
                      placeholder="Enter Email"
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label"> Enter password</label>
                    <input
                      type="text"
                      className="form-control    m-0"
                      name="password"
                      id=""
                      aria-describedby="helpId"
                      placeholder="Enter password"
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label"> Enter status</label>
                    <table width="100%" className="mb-3">
                      <tr>
                        <td>
                          <div className="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="status"
                              value={false}
                              onChange={onChange}
                            />
                            <label className="form-label">Draft</label>
                          </div>
                        </td>
                        <td>
                          <div className="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="status"
                              value={true}
                              onChange={onChange}
                            />
                            <label className="form-label">Publish</label>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>

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
              <div data-i18n="Layouts">Add New Customer</div>
            </div>
          </div>
          <div className="row">
            <h4 className="card-header c_heading">
              <span className="headingcontent">My Customers</span>


            </h4>

            <div className="col-lg-12 mb-4 ">
              <div className="card">
                <h5 className="card-header">
                  <div className="row">
                    <div className="col-lg-6 font-bold">
                      <ul className="slider_button slider-white plain-orange">
                        <li className="slider-active me-3">Customer</li>
                      </ul>
                    </div>
                    <div className="col-lg-6 text-right">
                      <input
                        type="text"
                        className="form-control search"
                        placeholder="Search Variation..."
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
export default Custmr;
