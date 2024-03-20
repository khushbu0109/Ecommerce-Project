import React, { useContext, useEffect, useState } from "react";
import Preloader from "../componant/Preloader";
import attributeCon from "../context/Attribute/AttributeContext";
import DataTable from "react-data-table-component";



const Attribute = (props) => {
    const [preloader, setPreloader] = useState("");
    const [editAttModel, setEditAttModel] = useState(false);
    const [updateattribute, setupdateattribute] = useState({});

    const [query, setQuery] = useState("");

    const myContext = useContext(attributeCon);
    const {
      attribute,
      getAllAttribute,
      createAttribute,
      deleteattribute,
      updateAttribute

    } = myContext;

    useEffect(() => {
      getAllAttribute();
    }, []);
    const style = {
      background: "#00000080",
      display: "block",
    };
    const [newAttribute, setnewAttribute] = useState({
      name: "",
 });

    const [addAttribteModal, setAddAttribteModal] = useState(false);

    const openData = () => {
      setAddAttribteModal(!addAttribteModal);
    };

    const onChange = (e) => {
      setnewAttribute({ ...newAttribute, [e.target.name]: e.target.value });
    };

   /*  const metaChange = (e) => {
      setTerm({ ...term, [e.target.name]: e.target.value });
      setnewAttribute({ ...newAttribute, term: term });
    };
 */
    const handleClick = async (e) => {
      e.preventDefault();
      setPreloader("preShow");
      const response = await createAttribute(newAttribute);
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
      const response = await deleteattribute(id);
      console.log(id);
      if (response.status === "Success") {
        props.showAlert(response.message, "success");
      } else {
        props.showAlert(response.messae, "warning");
      }
      setPreloader("");
    };
    const onEdit = (e) => {
      setupdateattribute({ ...updateattribute, [e.target.name]: e.target.value });
    };
    const handleUpdate = async (e) => {
      e.preventDefault();
      setPreloader("preShow");
      const response = await updateAttribute(updateattribute._id, updateattribute);
      if (response.status === "Success") {
        openAttEdit({});
        props.showAlert(response.message, "success");
      } else {
        props.showAlert(response.message, "warning");
      }
      setPreloader("");
    };
    const openAttEdit = (cat) => {
      setEditAttModel(!editAttModel);
      if (cat) {
        setupdateattribute(cat);
      }
    };
    const [statusChange, setStatusChange] = useState(null);
    const columns=[
      {name:"Name",
      selector:(row)=>row.name,
    sortable:true,
      }
    ]
    const data=attribute.filter((att) => {
      return (
        (statusChange === null || att.status === statusChange) &&
        att.name.toLowerCase().includes(query.toLowerCase())
      );
    })
    .map((att,index)=>{
return{
  id:index,
  name:att.name,
}
    })

    return (
      <>
        <Preloader show={preloader} />

        {editAttModel && (
          <div className="modal reviewModal" style={style}>
            <div className="modal-dialog" style={{ width: "40%" }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add New Attribute
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={()=>{
                      openAttEdit()
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
                      <div className="col-md-12  my-1">
                        <form method="post">
                          <div className="form-group mb-3">
                            <input
                              type="text"
                              className="form-control    m-0"
                              name="name"
                              defaultValue={updateattribute.name}
                              id=""
                              aria-describedby="helpId"
                              placeholder="Attribute Name"
                              onChange={onEdit}
                            />
                          </div>
                        </form>

                      </div>

                      {/* category add section end */}
                    </div>
                    <div className="mt-3">
                      <button
                        type="reset"
                        className="btn btn-outline-primary me-2 my-btn"
                        onClick={openAttEdit}
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
        {addAttribteModal && (
          <div className="modal reviewModal" style={style}>
            <div className="modal-dialog" style={{ width: "40%" }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add New Attribute
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
                              name="name"
                              id=""
                              aria-describedby="helpId"
                              placeholder="Attribute Name"
                              onChange={onChange}
                            />
                          </div>
                        </form>

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
                + Add Attribute
              </div>
            </div>
            <div className="row">
              <h4 className="card-header c_heading">
                <span className="headingcontent">My Attributes</span>

                <div className="heading_buttons">
                  {/* <input
                    className="form-control  search  mb-4"
                    placeholder="Search category..."
                  /> */}
                </div>
              </h4>

              <div className="col-lg-6 mb-4 ">
                <div className="card two">
                  <h5 className="card-header">
                    <div className="row">
                      <div className="col-lg-6 font-bold">
                        <ul className="slider_button slider-white plain-orange">
                          <li className="slider-active me-3">Attributes</li>
                        </ul>
                      </div>
                      <div className="col-lg-6 text-right">
                        <input
                          type="text"
                          className="form-control search one"
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
              <div className="col-lg-6 mb-4 ">
                <div className="card two">
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
                          className="form-control search one"
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


                          <th className="actions">Action</th>
                        </tr>
                      </thead>
                      <tbody className="table-border-bottom-0 order_history_body">

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

export default Attribute