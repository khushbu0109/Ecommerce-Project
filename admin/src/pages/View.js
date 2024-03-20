import React, { useContext, useEffect, useState } from "react";
import Preloader from "../componant/Preloader";
import ProCon from "../context/Product/ProCon";
import { Link, NavLink, useNavigate } from "react-router-dom";
import productState from "../context/Product/ProductState";
import ChooseCategory from "../componant/ChooseCategory";
import ChooseMedia from "../componant/Media/ChooseMedia";

export default function View(props) {
  const [preloader, setPreloader] = useState("");
  const navigate = useNavigate();

  const myContext = useContext(ProCon);
  const { product, getAllProduct, createProduct, deleteProduct } = myContext;

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
    status: "",
    date_created: "",
    date_modified: "",
    description: "",
    sku: "",
    price: "",
    regular_price: "",
    sale_price: "",
    tags: "",
    cat_id: "",

    variations: "",
    stock_status: "",
    Delivery_Day: "",
    Customer_Review: "",
    Discount: "",
    Sizes: "",
    Availability: "",
    attributes: [
      {
        id: 0,
        name: "",
        descrption: "",
      },
    ],
  });

  /* attribute state starts here */

  const [attribute, setAttribute] = useState([
    {
      id: 0,
      name: "",
      descrption: "",
    },
  ]);

  const addAttribute = (e) => {
    e.preventDefault();
    const value = {
      id: attribute.length,
      opt: "",
      score: 0,
    };
    setAttribute(attribute.concat(value));
  };
  const removeAttribute = (e, mid) => {
    e.preventDefault();
    const newoption = attribute.filter((com) => {
      return com.id !== mid;
    });
    if (attribute.length > 0) {
      setAttribute(newoption);
    }
  };

  /* attribute state ends here */
  const [addProductModel, setAddProductModel] = useState(false);

  const openData = () => {
    setAddProductModel(!addProductModel);
    setAttribute([
      {
        id: 0,
        name: "",
        descrption: "",
      },
    ]);
  };
  const onAttiChange = (e, index) => {
    const elemet = attribute[index];
    elemet.name = e.target.value;
  };

  const onChange = (e) => {
    setnewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setPreloader("preShow");
    product.attributes = attribute;

    const response = await createProduct(newProduct);

    if (response.status === "Success") {
      openData();
      navigate("/products");
      props.showAlert(response.message, "success");
    } else {
      props.showAlert(response.message, "warning");
    }
    setPreloader("");
  };
  /*   delete category */

  /* upload image section */
  const [editProductModel, setEditProductModel] = useState(false);
  const [updateProd, setUpdateProd] = useState({});
  const [mediaModel, setMediaModel] = useState(false);
  const openMedia = (e) => {
    setMediaModel(!mediaModel);
  };

  const selectImage = (url) => {
    openMedia();
    if (editProductModel) {
      setUpdateProd({ ...updateProd, images: url });
    } else {
      setnewProduct({ ...newProduct, images: url });
    }
  };

  return (
    <>
      <Preloader show={preloader} />

      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <form id="formAccountSettings" method="POST">
            <div className="row">
              <div className="col-md-8">
                <div className="card two">
                  <h5 className="card-header">
                    <div className="row">
                      <div className="col-lg-6 font-bold mb-4">
                        <ul className="slider_button slider-white plain-orange">
                          <li className="slider-active me-3">
                            Products Details
                          </li>
                        </ul>
                      </div>
                      <div className="text-left">
                        <label className="form-label">Product Name</label>
                        <input
                          type="text"
                          className="form-control mb-3   m-0"
                          name="p_name"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Product Name"
                          onChange={onChange}
                        />

                        <label className="form-label">Product Features</label>
                        <input
                          type="text"
                          className="form-control  mb-3  m-0"
                          name="featured"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Product featured"
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </h5>
                </div>
              </div>
              <div className="col-lg-4 mb-4 ">
                <div className="card two">
                  <h5 className="card-header">
                    <div className="row">
                      <div className="col-lg-6 font-bold mb-4">
                        <ul className="slider_button slider-white plain-orange">
                          <li className="slider-active me-3"> Media</li>
                        </ul>
                      </div>
                      <div className=" text-left">
                        <ChooseCategory onChange={onChange} type="blog" />

                        <div className="form-group">
                          <label className="form-label">Choose Image</label>
                          <div className="" onClick={openMedia}>
                            <img
                              className="img-fluid"
                              src={
                                newProduct.images === undefined ||
                                newProduct.images === ""
                                  ? "./assets/img/illus/upload.png"
                                  : newProduct.images
                              }
                              alt=""
                              width={50}
                            />
                          </div>
                        </div>
                        {mediaModel && (
                          <ChooseMedia
                            open={openMedia}
                            selectImage={selectImage}
                            showAlert={props.showAlert}
                          />
                        )}
                        <label className="form-label">Sizes</label>
                        <input
                          type="text"
                          className="form-control  mb-3  m-0"
                          name="Sizes"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Sizes"
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </h5>
                </div>
              </div>

              <div class="row gx-3 gx-lg-5 ">
                <div className="card-title prod-details ">Product Data</div>
                <div className="card two p-3" style={{ flexDirection: "row" }}>
                  <div class="col-3 p-1">
                    <ul
                      class="nav nav-tabs nav-tabs-vertical "
                      style={{ flexDirection: "column" }}
                      role="tablist"
                    >
                      <li class="nav-item m-2" role="presentation">
                        <a
                          class="nav-link active p-2"
                          id="vertical-tab-0"
                          data-bs-toggle="tab"
                          href="#vertical-tabpanel-0"
                          role="tab"
                          aria-controls="vertical-tabpanel-0"
                          aria-selected="true"
                        >
                          <div className="content-icon d-flex">
                            <box-icon name="wrench" type="solid"></box-icon>
                            <div className="heading-title">General</div>
                          </div>
                        </a>
                      </li>
                      <li class="nav-item m-2" role="presentation">
                        <a
                          class="nav-link p-2"
                          id="vertical-tab-1"
                          data-bs-toggle="tab"
                          href="#vertical-tabpanel-1"
                          role="tab"
                          aria-controls="vertical-tabpanel-1"
                          aria-selected="false"
                        >
                          <div className="content-icon d-flex">
                            <box-icon name="notepad" type="solid"></box-icon>
                            <div className="heading-title">Inventory</div>
                          </div>
                        </a>
                      </li>
                      <li class="nav-item m-2" role="presentation">
                        <a
                          class="nav-link p-2"
                          id="vertical-tab-2"
                          data-bs-toggle="tab"
                          href="#vertical-tabpanel-2"
                          role="tab"
                          aria-controls="vertical-tabpanel-2"
                          aria-selected="false"
                        >
                          <div className="content-icon d-flex">
                            <box-icon name="list-check"></box-icon>
                            <div className="heading-title">Attributes</div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="col-9 p-1">
                    <div
                      class="tab-content p-0"
                      id="tab-content"
                      aria-orientation="vertical"
                    >
                      <div
                        class="tab-pane active"
                        id="vertical-tabpanel-0"
                        role="tabpanel"
                        aria-labelledby="vertical-tab-0"
                      >
                        <div className=" text-left">
                          <label className="form-label">Regular Price</label>
                          <input
                            type="text"
                            className="form-control  mb-3  m-0"
                            name="regular_price"
                            id=""
                            aria-describedby="helpId"
                            placeholder="regular price"
                            onChange={onChange}
                          />
                        </div>
                        <div className=" text-left">
                          <label className="form-label">Sale Price</label>
                          <input
                            type="text"
                            className="form-control  mb-3  m-0"
                            name="sale_price"
                            id=""
                            aria-describedby="helpId"
                            placeholder="sale price"
                            onChange={onChange}
                          />
                        </div>
                      </div>
                      <div
                        class="tab-pane"
                        id="vertical-tabpanel-1"
                        role="tabpanel"
                        aria-labelledby="vertical-tab-1"
                      >
                        <div className=" text-left">
                          <label className="form-label">Sku</label>
                          <input
                            type="text"
                            className="form-control  mb-3  m-0"
                            name="sku"
                            id=""
                            aria-describedby="helpId"
                            placeholder="sku"
                            onChange={onChange}
                          />

                          <label className="form-label ">Stock Status</label>
                          <table width="100%" className="mb-3">
                            <tr>
                              <td>
                                <div className="form-check mt-2">
                                  <input
                                    type="radio"
                                    className="form-check-input"
                                    name="stock_status"
                                    value={false}
                                    onChange={onChange}
                                  />
                                  <label className="form-label">In Stock</label>
                                </div>
                              </td>
                              <td>
                                <div className="form-check">
                                  <input
                                    type="radio"
                                    className="form-check-input"
                                    name="stock_status"
                                    value={true}
                                    onChange={onChange}
                                  />
                                  <label className="form-label">
                                    Out of Stock
                                  </label>
                                </div>
                              </td>
                              <td>
                                <div className="form-check">
                                  <input
                                    type="radio"
                                    className="form-check-input"
                                    name="stock_status"
                                    value={true}
                                    onChange={onChange}
                                  />
                                  <label className="form-label">
                                    On Backorder
                                  </label>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <label className="form-label">Product Status</label>

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
                                  <label className="form-label">Pending</label>
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
                                  <label className="form-label">Approved</label>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                      <div
                        class="tab-pane"
                        id="vertical-tabpanel-2"
                        role="tabpanel"
                        aria-labelledby="vertical-tab-2"
                      >
                        {attribute.map((p, i) => {
                          return (
                            <>
                              <span
                                className="spand"
                                onClick={(e) => {
                                  addAttribute(e);
                                }}
                              >
                                Add
                                <i class="fa-solid fa-plus ms-2"></i>
                              </span>
                              <div className="row mt-3">
                                <div className="col-6">
                                  <div className="form-group">
                                    <div id="TextBoxesGroup">
                                      <input
                                        type="text"
                                        className="form-control  mt-2  m-0"
                                        name="name"
                                        id=""
                                        aria-describedby="helpId"
                                        placeholder="Enter Name"
                                        onChange={(e) => {
                                          onAttiChange(e, i);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="form-group">
                                    <div id="TextBoxesGroup">
                                      <input
                                        type="text"
                                        className="form-control  mt-2  m-0"
                                        name="description"
                                        id=""
                                        aria-describedby="helpId"
                                        placeholder="Enter Description"
                                        onChange={(e) => {
                                          onAttiChange(e, i);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="spanded"
                                  onClick={(e) => {
                                    removeAttribute(e, i);
                                  }}
                                >
                                  Remove
                                </div>
                                <div className="attBtns d-flex"></div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
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
                onClick={handleClick}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
