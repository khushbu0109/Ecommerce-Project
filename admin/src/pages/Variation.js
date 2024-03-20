import React, { useContext, useEffect, useState } from "react";
import Preloader from "../componant/Preloader";

import VarCon from "../context/Variation/VariationContext";
import DataTable from "react-data-table-component";

export default function Variation(props) {
  const [preloader, setPreloader] = useState("");
  const [editVarModel, setEditVarModel] = useState(false);
  const [updateVar, setUpdateVar] = useState({});

  const [query, setQuery] = useState("");

  const myContext = useContext(VarCon);
  const {
    variation,
    getAllVariation,
    createVariation,
    updateVariation,
    deleteVariation,
  } = myContext;

  useEffect(() => {
    getAllVariation();
  }, []);
  const style = {
    background: "#00000080",
    display: "block",
  };
  const [newVariation, setnewVariation] = useState({
    attribute: "",
    date_created: "",
    description: "",
    sku: "",
    price: "",
    regular_price: "",
    sale_price: "",
    status: "",
    image: "",
  });

  const [addVariationModel, setAddVariationModel] = useState(false);

  const openData = () => {
    setAddVariationModel(!addVariationModel);
  };

  const onChange = (e) => {
    setnewVariation({ ...newVariation, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setPreloader("preShow");
    const response = await createVariation(newVariation);
    if (response.status === "Success") {
      openData();
      props.showAlert(response.message, "success");
    } else {
      props.showAlert(response.message, "warning");
    }
    setPreloader("");
  };
  /*   delete category */

  const delete_prod = async (id) => {
    setPreloader("preShow");
    const response = await deleteVariation(id);
    console.log(id);
    if (response.status === "Success") {
      props.showAlert(response.message, "success");
    } else {
      props.showAlert(response.messae, "warning");
    }
    setPreloader("");
  };

  const onEdit = (e) => {
    setUpdateVar({ ...updateVar, [e.target.name]: e.target.value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    setPreloader("preShow");
    const response = await updateVariation(updateVar._id, updateVar);
    if (response.status === "Success") {
      openVarEdit({});
      props.showAlert(response.message, "success");
    } else {
      props.showAlert(response.message, "warning");
    }
    setPreloader("");
  };
  const openVarEdit = (cat) => {
    setEditVarModel(!editVarModel);
    if (cat) {
      setUpdateVar(cat);
    }
  };
  const changeStatus = async (id, status, type) => {
    setPreloader("preShow");
    let response = {};
    if (type === "status") {
      response = await updateVariation(id,{ status: status });
    } else {
      response = await updateVariation(id,{ status: status });
    }
    response.status === "Success"
      ? props.showAlert(`${type} status is update`, "success")
      : props.showAlert(response.messae, "danger");
    setPreloader("");

  };
  const[statusChange,setStatusChange]=useState(null);
  const columns = [
    {
      name: "Attribute",
      selector: (row) => row.attribute,
      sortable: true,
    },
    {
      name: "Date_Created",
      selector: (row) => row.date_created,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "SKU",
      selector: (row) => row.sku,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Regular_price",
      selector: (row) => row.regular_price,
      sortable: true,
    },
    {
      name: "Sale_price",
      selector: (row) => row.sale_price,
      sortable: true,
    },
    {
      name: "status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => row.image,
      sortable: true,
    },

  ];
  const data = variation

  .map((vari, index) => {
    return {
      id: index,
      attribute: vari.attribute,
    date_created: vari.date_created,
    description: vari.description,
    sku: vari.sku,
    price: vari.price,
    regular_price: vari.regular_price,
    sale_price: vari.sale_price,

    image: vari.image,
      status: vari.status ? (
        <i
          className="bx bx-check"
          onClick={() => {
            changeStatus(vari._id, false, "status");
            console.log(vari._id);
          }}
        ></i>
      ) : (
        <i
          className="bx bx-block"
          onClick={() => {
            changeStatus(vari._id, true, "status");
          }}
        ></i>
      )
        }
      })
  return (
    <>
      <Preloader show={preloader} />

      {editVarModel && (
        <div className="modal reviewModal" style={style}>
          <div className="modal-dialog" style={{ width: "80%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add New Variation
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={openVarEdit}
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
                          <label className="form-label">Enter attribute</label>
                          <input
                            type="text"
                            className="form-control    m-0"
                            name="attribute"
                            defaultValue={updateVariation.attribute}
                            id=""
                            aria-describedby="helpId"
                            placeholder="Attribute Name"
                            onChange={onEdit}
                          />
                        </div>
                      </form>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <label className="form-label"> date_created</label>
                        <input
                          type="date"
                          className="form-control    m-0"
                          name="date_created"
                          defaultValue={updateVariation.date_created}
                          id=""
                          aria-describedby="helpId"
                          placeholder=" date_created"
                          onChange={onEdit}
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label className="form-label"> Enter description</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="description"
                          defaultValue={updateVariation.description}
                          id=""
                          aria-describedby="helpId"
                          placeholder=" description"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label"> Enter sku</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="sku"
                          defaultValue={updateVariation.sku}
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter sku"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label"> Enter price</label>
                        <input
                          type="Number"
                          className="form-control    m-0"
                          name="price"
                          defaultValue={updateVariation.price}
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter price"
                          onChange={onEdit}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <label className="form-label">
                          Enter regular_price
                        </label>
                        <input
                          type="Number"
                          className="form-control    m-0"
                          name="regular_price"
                          defaultValue={updateVariation.regular_price}
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter regular_price"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label"> Enter sale_price</label>
                        <input
                          type="Number"
                          className="form-control    m-0"
                          name="sale_price"
                          defaultValue={updateVariation.sale_price}
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter sale_price"
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
                                  defaultValue={updateVariation.status}
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
                                  defaultValue={updateVariation.status}
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
                        <label className="form-label"> import images</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="image"
                          defaultValue={updateVariation.image}
                          id=""
                          aria-describedby="helpId"
                          placeholder=" images"
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
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {addVariationModel && (
        <div className="modal reviewModal" style={style}>
          <div className="modal-dialog" style={{ width: "80%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add New Variation
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
                          <label className="form-label">Enter attribute</label>
                          <input
                            type="text"
                            className="form-control    m-0"
                            name="attribute"
                            id=""
                            aria-describedby="helpId"
                            placeholder="Attribute Name"
                            onChange={onChange}
                          />
                        </div>
                      </form>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <label className="form-label"> date_created</label>
                        <input
                          type="date"
                          className="form-control    m-0"
                          name="date_created"
                          id=""
                          aria-describedby="helpId"
                          placeholder=" date_created"
                          onChange={onChange}
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label className="form-label"> Enter description</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="description"
                          id=""
                          aria-describedby="helpId"
                          placeholder=" description"
                          onChange={onChange}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label"> Enter sku</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="sku"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter sku"
                          onChange={onChange}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label"> Enter price</label>
                        <input
                          type="Number"
                          className="form-control    m-0"
                          name="price"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter price"
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <label className="form-label">
                          Enter regular_price
                        </label>
                        <input
                          type="Number"
                          className="form-control    m-0"
                          name="regular_price"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter regular_price"
                          onChange={onChange}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label"> Enter sale_price</label>
                        <input
                          type="Number"
                          className="form-control    m-0"
                          name="sale_price"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter sale_price"
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
                      <div className="form-group mb-3">
                        <label className="form-label"> import images</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="images"
                          id=""
                          aria-describedby="helpId"
                          placeholder=" images"
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
              <div data-i18n="Layouts">Add New Variation</div>
            </div>
          </div>
          <div className="row">
            <h4 className="card-header c_heading">
              <span className="headingcontent">My Variations</span>

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
                        <li className="slider-active me-3">Variations</li>
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
}
