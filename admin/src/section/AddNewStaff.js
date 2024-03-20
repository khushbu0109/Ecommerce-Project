import React, { useState } from "react";
export const AddNewStaff = (props) => {
  const [newStaff, setNewStaff] = useState({
    phone: "",
    name: "",
    com_id: localStorage.getItem("com_id"),
    email: "",
    staff_id: "",
    password: "",
    role: "",
    accessTypes: [],
  });

  const [newRole, setNewRole] = useState([]);

  const inputFuction = (e) => {
    setNewStaff({ ...newStaff, [e.target.name]: e.target.value });
  };

  const checkBox = (e) => {
    for (let i = 0; i < newRole.length; i++) {
      const element = newRole[i];
      if (element.permission_name.toString() === e.target.name.toString()) {
        element.value = e.target.checked;
        break;
      }
    }
  };

  const uploadStaff = (e) => {
    e.preventDefault();
    setNewStaff({ ...newStaff, accessTypes: newRole });
    console.log(newStaff);
  };

  return (
    <>
      <div className="modal reviewModal" style={props.style}>
        <div className="modal-dialog">
          <form method="POST" onSubmit={uploadStaff}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add New Staff
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={props.openManageRole}
                ></button>
              </div>
              <div className="modal-body">
                <table width="100%">
                  <tr>
                    <td>
                      <div class="form-group mb-3">
                        <label htmlFor="name" className="col-form-label">
                          Choose Role :
                        </label>
                        <select className="form-control">
                          <option value="asf">asdf</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="mb-3">
                        <label htmlFor="phone" className="col-form-label">
                          Staff Phone No.
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          name="phone"
                          placeholder="Customer Phone No."
                          onChange={inputFuction}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="mb-3">
                        <label htmlFor="phone" className="col-form-label">
                          Staff Email :
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="phone"
                          name="phone"
                          placeholder="Customer Phone No."
                          onChange={inputFuction}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="mb-3">
                        <label htmlFor="name" className="col-form-label">
                          Staff Name :
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          id="name"
                          placeholder="Customer Name"
                          onChange={inputFuction}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="mb-3">
                        <label htmlFor="phone" className="col-form-label">
                          Staff ID :
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          name="phone"
                          placeholder="Customer Phone No."
                          onChange={inputFuction}
                        />
                      </div>
                    </td>

                    <td>
                      <div className="mb-3">
                        <label htmlFor="phone" className="col-form-label">
                          Password :
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="phone"
                          name="phone"
                          placeholder="Customer Phone No."
                          onChange={inputFuction}
                        />
                      </div>
                    </td>
                  </tr>
                </table>                

                <p className="instruction_para">Instruction -</p>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary orange-btn me-2 mb-2"
                >
                  Add Now
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
