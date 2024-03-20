import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Preloader from "../componant/Preloader";
import ProCon from "../context/Product/ProCon";
import { Link } from "react-router-dom";


export default function Product(props) {
  const [preloader, setPreloader] = useState("");
  const [editProductModel, setEditProductModel] = useState(false);
  const [updateProd, setUpdateProd] = useState({});
  const [statusChange, setStatusChange] = useState(null);

  const [query, setQuery] = useState("");

  const myContext = useContext(ProCon);
  const {
    product,
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  } = myContext;

  useEffect(() => {
    getAllProduct();
  }, []);
  const style = {
    background: "#00000080",
    display: "block",
  };
  const [newProduct, setnewProduct] = useState({
    p_name: "",
    slug: "",
    featured: "",
    date_created: "",
    date_modified: "",
    status: true,
    sku: "",
    price: "",
    regular_price: "",
    sale_price: "",
    tags: "",
    categories: "",
    images: "",
    attributes: "",
    variations: "",
    stock_status: "",
    Delivery_Day: "",
    Customer_Review: "",
    Discount: "",
    Sizes: "",
    Availability: "",
  });

  const [addProductModel, setAddProductModel] = useState(false);

  const openData = () => {
    setAddProductModel(!addProductModel);
  };

  const onChange = (e) => {
    setnewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setPreloader("preShow");
    const response = await createProduct(newProduct);
    if (response.status === "success") {
      openData();
      props.showAlert(response.message, "success");
    } else {
      props.showAlert(response.message, "warning");
    }
    setPreloader("");
  };
  const onEdit = (e) => {
    setUpdateProd({ ...updateProd, [e.target.name]: e.target.value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    setPreloader("preShow");
    const response = await updateProduct(updateProd._id, updateProd);
    if (response.status === "Success") {
      openProEdit({});
      props.showAlert(response.message, "success");
    } else {
      props.showAlert(response.message, "warning");
    }
    setPreloader("");
  };
  const openProEdit = (cat) => {
    setEditProductModel(!editProductModel);
    if (cat) {
      setUpdateProd(cat);
    }
  };
  /*   delete category */

  const delete_prod = async (id) => {
    setPreloader("preShow");
    const response = await deleteProduct(id);
    console.log(id);
    if (response.status === "Success") {
      props.showAlert(response.message, "success");
    } else {
      props.showAlert(response.messae, "warning");
    }
    setPreloader("");
  };
  const changeStatus = async (id, status, type) => {
    setPreloader("preShow");
    let response = {};
    if (type === "status") {
      response = await updateProduct(id, { status: status });
    } else {
      response = await updateProduct(id, { status: status });
    }
    response.status === "Success"
      ? props.showAlert(`${type} status is update`, "success")
      : props.showAlert(response.messae, "danger");
    setPreloader("");
  };

  /* upload image section */

  const [mediaModel, setMediaModel] = useState(false);
  const openMedia = (e) => {
    setMediaModel(!mediaModel);
  };

  const selectImage = (url)=>{
    openMedia();
    if(editProductModel){
      setUpdateProd({...updateProd,images:url})
    }
    else{
      setnewProduct({...newProduct,images:url})
    }
  }

  const columns = [
    {
      name: "Images",
      selector: (row) => (
        <img src={row.images} alt="Product" style={{ width: "60px", height: "auto" }} />
      ),
      sortable: true,
    },
    {
      name: "Product_Name",
      selector: (row) => row.p_name,
      sortable: true,
    },


    {
      name: "DateCreated",
      selector: (row) => row.date_created,
      sortable: true,
    },

    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },

    {
      name: "Sale_price",
      selector: (row) => row.sale_price,
      sortable: true,
    },


    {
      name: "Stock_status",
      selector: (row) => row.stock_status,
      sortable: true,
    },


    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => row.action,
    },
  ];
  const data = product.map((pro, i) => {
    return {
      images: pro.images,
      id: i,
      p_name: pro.p_name,


      date_created: pro.date_created,
      price: pro.price,

      sale_price: pro.sale_price,

      stock_status: pro.stock_status,


      status: pro.status ? (
        <span
          class="badge bg-success me-1"
          onClick={() => {
            changeStatus(pro._id, false, "status");
          }}
        >
          Approved
        </span>
      ) : (
        <span
          class="badge bg-danger me-1"
          onClick={() => {
            changeStatus(pro._id, true, "status");
          }}
        >
          Pending
        </span>
      ),
      action: (
        <div className="dropdown">
          <span class="badge bg-warning me-1">
            <i
              className="bx bx-edit me-1"
              onClick={() => {
                openProEdit(pro);
              }}
            ></i>
          </span>
          <span class="badge bg-danger">
            <i
              className="bx bx-trash me-1"
              onClick={() => {
                delete_prod(pro._id);
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
      {editProductModel && (
        <div className="modal reviewModal" style={style}>
          <div className="modal-dialog" style={{ width: "40%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add New Category
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    openProEdit();
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
                        <label className="form-label">Product Name</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="p_name"
                          id=""
                          defaultValue={updateProd.p_name}
                          aria-describedby="helpId"
                          placeholder="Enter Product Name"
                          onChange={onEdit}
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label className="form-label"> Enter slug</label>
                        <input
                          type="text"
                          defaultValue={updateProd.slug}
                          className="form-control    m-0"
                          name="slug"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter slug"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label"> Enter featured</label>
                        <input
                          type="text"
                          defaultValue={updateProd.featured}
                          className="form-control    m-0"
                          name="featured"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter Meta featured"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label">
                          {" "}
                          Enter Delivery_Day
                        </label>
                        <input
                          type="text"
                          defaultValue={updateProd.Delivery_Day}
                          className="form-control    m-0"
                          name="Delivery_Day"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Delivery_Day"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label"> Enter Discount</label>
                        <input
                          type="text"
                          defaultValue={updateProd.Discount}
                          className="form-control    m-0"
                          name="Discount"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Discount"
                          onChange={onEdit}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <label className="form-label">Enter sale_price</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="sale_price"
                          id=""
                          defaultValue={updateProd.sale_price}
                          aria-describedby="helpId"
                          placeholder="sale_price"
                          onChange={onEdit}
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label className="form-label"> product tags</label>
                        <input
                          type="text"
                          defaultValue={updateProd.tags}
                          className="form-control    m-0"
                          name="tags"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter tags"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label"> images</label>
                        <input
                          type="text"
                          defaultValue={updateProd.images}
                          className="form-control    m-0"
                          name="images"
                          id=""
                          aria-describedby="helpId"
                          placeholder=" images"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label"> Customer_Review</label>
                        <input
                          type="text"
                          defaultValue={updateProd.Customer_Review}
                          className="form-control    m-0"
                          name="Customer_Review"
                          id=""
                          aria-describedby="helpId"
                          placeholder=" Customer_Review"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label"> Sizes</label>
                        <input
                          type="text"
                          defaultValue={updateProd.Sizes}
                          className="form-control    m-0"
                          name="Sizes"
                          id=""
                          aria-describedby="helpId"
                          placeholder=" Sizes"
                          onChange={onEdit}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <label className="form-label">Enter description</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="description"
                          id=""
                          defaultValue={updateProd.description}
                          aria-describedby="helpId"
                          placeholder="Product description"
                          onChange={onEdit}
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label className="form-label"> Enter price</label>
                        <input
                          type="text"
                          defaultValue={updateProd.price}
                          className="form-control    m-0"
                          name="price"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter price"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label">
                          {" "}
                          Enter regular_price
                        </label>
                        <input
                          type="text"
                          defaultValue={updateProd.regular_price}
                          className="form-control    m-0"
                          name="regular_price"
                          id=""
                          aria-describedby="helpId"
                          placeholder="regular_price"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label">date_created</label>
                        <input
                          type="date"
                          className="form-control    m-0"
                          name="date_created"
                          defaultValue={updateProd.date_created}
                          id=""
                          aria-describedby="helpId"
                          placeholder="date_created"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label">enter Availability</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="Availability"
                          defaultValue={updateProd.Availability}
                          id=""
                          aria-describedby="helpId"
                          placeholder="Availability"
                          onChange={onEdit}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <label className="form-label">Enter attributes</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="attributes"
                          id=""
                          defaultValue={updateProd.attributes}
                          aria-describedby="helpId"
                          placeholder="Product attributes"
                          onChange={onEdit}
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label className="form-label"> Enter variations</label>
                        <input
                          type="text"
                          defaultValue={updateProd.variations}
                          className="form-control    m-0"
                          name="variations"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter variations"
                          onChange={onEdit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label">Stock status</label>
                        <table width="100%" className="mb-3">
                          <tr>
                            <td>
                              <div className="form-check">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="stock_status"
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
                                  name="stock_status"
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
                        <label className="form-label">Product status</label>
                        <table width="100%" className="mb-3">
                          <tr>
                            <td>
                              <div className="form-check">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="status"
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
                        <label className="form-label">date_modified</label>
                        <input
                          type="date"
                          className="form-control    m-0"
                          name="date_modified"
                          defaultValue={updateProd.date_modified}
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter Meta Others"
                          onChange={onEdit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button
                      type="reset"
                      className="btn btn-outline-primary me-2 my-btn"
                      onClick={openProEdit}
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

      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="fixed-button">
            <div
              className="btn btn-sm fixed_button btn-outline-primary"
              onClick={openData}
            >
              <Link to={`/addProduct`}>
                <li
                  className="menu-link"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <i class="fa-solid fa-eye"></i>
                  <div data-i18n="Layouts">Add New Product</div>
                </li>
              </Link>
            </div>
          </div>
          <div className="row">
            <h4 className="card-header c_heading">
              <span className="headingcontent">My Products</span>
            </h4>

            <div className="col-lg-12 mb-4 ">
              <div className="card">
                <h5 className="card-header">
                  <div className="row">
                    <div className="col-lg-6 font-bold">
                      <ul className="slider_button slider-white plain-orange">
                        <li className="slider-active me-3">Products</li>
                      </ul>
                    </div>
                    <div className="col-lg-6 text-right">
                      <input
                        type="text"
                        className="form-control search"
                        placeholder="Search Product..."
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
