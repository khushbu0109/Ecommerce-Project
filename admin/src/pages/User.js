import React, { useContext, useEffect, useState } from "react";
import Preloader from "../componant/Preloader";
import userCon from "../context/User/UserCon";



const User = (props) => {
    const [preloader, setPreloader] = useState("");
    const [editUserModel, setEditUserModel] = useState(false);
    const [updateUser, setUpdateUser] = useState({});
    const [query, setQuery] = useState("");

    const myContext = useContext(userCon);
    const {
      user,
      getAllUser,
      createUser,
      deleteUser,

    } = myContext;

    useEffect(() => {
      getAllUser();
    }, []);
    const style = {
      background: "#00000080",
      display: "block",
    };
    const [newUser, setnewUser] = useState({
      name: "",
      address:"",
      phone:"",
      email:"",
      password:""
 });

    const [addUserModal, setAddUserModal] = useState(false);

    const openData = () => {
      setAddUserModal(!addUserModal);
    };

    const onChange = (e) => {
      setnewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const metaChange = (e) => {

      setnewUser({ ...newUser});
    };

    const handleClick = async (e) => {
      e.preventDefault();
      setPreloader("preShow");
      const response = await createUser(newUser);
      if (response.status === "success") {
        openData();
        props.showAlert(response.message, "success");
      } else {
        props.showAlert(response.message, "warning");
      }
      setPreloader("");
    };

    /*   delete category */

    const delete_att = async (id) => {
      setPreloader("preShow");
      const response = await deleteUser(id);
      console.log(id);
      if (response.status === "Success") {
        props.showAlert(response.message, "success");
      } else {
        props.showAlert(response.messae, "warning");
      }
      setPreloader("");
    };

    const onEdit = (e) => {
      setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
    };
    const handleUpdate = async (e) => {
      e.preventDefault();
      setPreloader("preShow");
      const response = await updateUser(updateUser._id, updateUser);
      if (response.status === "Success") {
        openCatEdit({});
        props.showAlert(response.message, "success");
      } else {
        props.showAlert(response.message, "warning");
      }
      setPreloader("");
    };
    const openCatEdit = (cat) => {
      setEditUserModel(!editUserModel);
      if (cat) {
        setUpdateUser(cat);
      }
    };


    return (
      <>
        <Preloader show={preloader} />

        {editUserModel && (
          <div className="modal reviewModal" style={style}>
            <div className="modal-dialog" style={{ width: "40%" }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add New User
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
                    onSubmit={handleUpdate}
                  >
                    <div className="row">
                      {/* category add section */}
                      <div className="col-md-12  my-1">
                        <form method="post">
                          <div className="form-group mb-3">
                            <input
                              type="text"
                              className="form-control    m-0"
                              name="address"
                              defaultValue={updateUser.address}
                              id=""
                              aria-describedby="helpId"
                              placeholder="User Address"
                              onChange={onEdit}
                            />
                          </div>
                        </form>

                      </div>
                      <div className="col-6">
                        <div className="form-group mb-3">
                          <label className="form-label">Enter Name</label>
                          <input
                            type="text"
                            className="form-control    m-0"
                            name="name"
                            defaultValue={updateUser.name}
                            id=""
                            aria-describedby="helpId"
                            placeholder="Enter  Name"
                            onChange={onEdit}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label">Enter Phone</label>
                          <input
                            type="text"
                            className="form-control    m-0"
                            name="phone"
                            defaultValue={updateUser.phone}
                            id=""
                            aria-describedby="helpId"
                            placeholder="Enter  Phone"
                            onChange={metaChange}
                          />
                        </div>


                      </div>
                      <div className="col-6">
                        <div className="form-group mb-3">
                          <label className="form-label">
                            Enter Email
                          </label>
                          <input
                            type="text"
                            className="form-control    m-0"
                            name="email"
                            defaultValue={updateUser.email}
                            id=""
                            aria-describedby="helpId"
                            placeholder="Enter Email "
                            onChange={onEdit}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label">
                            Enter Password
                          </label>
                          <input
                            type="text"
                            className="form-control    m-0"
                            name="password"
                            defaultValue={updateUser.password}
                            id=""
                            aria-describedby="helpId"
                            placeholder="Enter Password "
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
                        onClick={openData}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn orange-btn btn-primary me-2"
                        onClick={handleUpdate}
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
        {addUserModal && (
          <div className="modal reviewModal" style={style}>
            <div className="modal-dialog" style={{ width: "40%" }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add New User
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
                      <div className="col-md-12  my-1">
                        <form method="post">
                          <div className="form-group mb-3">
                            <input
                              type="text"
                              className="form-control    m-0"
                              name="address"
                              id=""
                              aria-describedby="helpId"
                              placeholder="User Address"
                              onChange={onChange}
                            />
                          </div>
                        </form>

                      </div>
                      <div className="col-6">
                        <div className="form-group mb-3">
                          <label className="form-label">Enter Name</label>
                          <input
                            type="text"
                            className="form-control    m-0"
                            name="Name"
                            id=""
                            aria-describedby="helpId"
                            placeholder="Enter  Name"
                            onChange={metaChange}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label">Enter Phone</label>
                          <input
                            type="text"
                            className="form-control    m-0"
                            name="Phone"
                            id=""
                            aria-describedby="helpId"
                            placeholder="Enter  Phone"
                            onChange={metaChange}
                          />
                        </div>


                      </div>
                      <div className="col-6">
                        <div className="form-group mb-3">
                          <label className="form-label">
                            Enter Email
                          </label>
                          <input
                            type="text"
                            className="form-control    m-0"
                            name="Email"
                            id=""
                            aria-describedby="helpId"
                            placeholder="Enter Email "
                            onChange={metaChange}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label">
                            Enter Password
                          </label>
                          <input
                            type="text"
                            className="form-control    m-0"
                            name="Password"
                            id=""
                            aria-describedby="helpId"
                            placeholder="Enter Password "
                            onChange={metaChange}
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
                + Add User
              </div>
            </div>
            <div className="row">
              <h4 className="card-header c_heading">
                <span className="headingcontent">My Users</span>

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
                          <li className="slider-active me-3">Users</li>
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


                          <th className="action">Action</th>
                        </tr>
                      </thead>
                      <tbody className="table-border-bottom-0 order_history_body">
                        {User
                          .filter((att) => {
                            return att.name
                              .toLowerCase()
                              .includes(query.toLowerCase());
                          })
                          .map((att, index) => {
                            return (
                              <tr key={index}>
                                <td>{att.name}</td>


                                <td className="action">
                                  <i className="bx bx-edit me-1"></i>

                                  <i
                                    className="bx bx-trash me-1"
                                    onClick={() => {
                                      delete_att(att._id);
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

export default User