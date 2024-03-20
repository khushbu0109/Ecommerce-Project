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
              <div className="col-lg-6 mb-4 ">
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
                        <label className="form-label">Enter Slug</label>
                        <input
                          type="text"
                          className="form-control  mb-3   m-0"
                          name="slug"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter Slug"
                          onChange={onChange}
                        />
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

              <div className="col-lg-6 mb-4 ">
                <div className="card two">
                  <h5 className="card-header">
                    <div className="row">
                      <div className="col-lg-6 font-bold mb-4">
                        <ul className="slider_button slider-white plain-orange">
                          <li className="slider-active me-3">
                            Pricing
                          </li>
                        </ul>
                      </div>
                      <div className=" text-left">
                        <label className="form-label">Product price</label>
                        <input
                          type="text"
                          className="form-control  mb-3  m-0"
                          name="price"
                          id=""
                          aria-describedby="helpId"
                          placeholder="price"
                          onChange={onChange}
                        />
                        <label className="form-label">Regular Price</label>
                        <input
                          type="Number"
                          className="form-control  mb-3  m-0"
                          name="regular_price"
                          id=""
                          aria-describedby="helpId"
                          placeholder="regular_price"
                          onChange={onChange}
                        />
                        <label className="form-label">Sale Price</label>
                        <input
                          type="Number"
                          className="form-control  mb-3  m-0"
                          name="sale_price"
                          id=""
                          aria-describedby="helpId"
                          placeholder="sale_price "
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </h5>
                </div>
              </div>


              <div className="col-lg-6 mb-4 ">
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
                      <div className=" text-left">
                        <label className="form-label"> Delivery_Day</label>
                        <input
                          type="text"
                          className="form-control  mb-3  m-0"
                          name="Delivery_Day"
                          id=""
                          aria-describedby="helpId"
                          placeholder=" Delivery_Day "
                          onChange={onChange}
                        />
                        <label className="form-label">Customer_Review</label>
                        <input
                          type="text"
                          className="form-control  mb-3  m-0"
                          name="Customer_Review"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Customer_Review"
                          onChange={onChange}
                        />
                        <label className="form-label">Discount</label>
                        <input
                          type="text"
                          className="form-control  mb-3  m-0"
                          name="Discount"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Discount"
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </h5>
                </div>
              </div>
              <div className="col-lg-6 mb-4 ">
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
                      <div className=" text-left">
                        <label className="form-label">Variations</label>
                        <input
                          type="text"
                          className="form-control  mb-3  m-0"
                          name="variations"
                          id=""
                          aria-describedby="helpId"
                          placeholder="variations"
                          onChange={onChange}
                        />
                        <label className="form-label"> Availability</label>
                        <input
                          type="text"
                          className="form-control  mb-3  m-0"
                          name="Availability"
                          id=""
                          aria-describedby="helpId"
                          placeholder=" Availability"
                          onChange={onChange}
                        />
                        <label className="form-label">Product Tags</label>
                        <input
                          type="text"
                          className="form-control  mb-3  m-0"
                          name="tags"
                          id=""
                          aria-describedby="helpId"
                          placeholder="tags"
                          onChange={onChange}
                        />

                      </div>
                    </div>
                  </h5>
                </div>
              </div>
              <div className="col-lg-6 mb-4 ">
                <div className="card two">
                  <h5 className="card-header">
                    <div className="row">
                      <div className="col-lg-6 font-bold mb-4">
                        <ul className="slider_button slider-white plain-orange">
                          <li className="slider-active me-3">Inventory</li>
                        </ul>
                      </div>
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
                  </h5>
                </div>
              </div>
              <div className="col-lg-6 mb-4 ">
                <div className="card two">
                  <h5 className="card-header">
                    <div className="row">
                      <div className="col-lg-6 font-bold mb-4">
                        <ul className="slider_button slider-white plain-orange">
                          <li className="slider-active me-3">Attribute</li>
                        </ul>
                      </div>
                      <div className=" text-left">
                        <div className="d-flex  mb-3  m-0" style={{gap: "47px"}}>
                          <button type="button" class="btn btn-outline-primary btns">
                            Add new
                          </button>
                          <div class="dropdown">
                            <button
                              class="btn btn-secondary dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Dropdown button
                            </button>
                            <ul
                              class="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              <li>Action</li>
                              <li>Another action</li>
                              <li>Something else here</li>
                            </ul>
                          </div>
                        </div>
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control  mb-3  m-0"
                          name="attribute"
                          id=""
                          aria-describedby="helpId"
                          placeholder="f.e. size or color"
                          onChange={onChange}
                        />
                        <label className="form-label"> Value</label>
                        <input
                          type="text"
                          className="form-control  mb-3  m-0"
                          name="description"
                          id=""
                          aria-describedby="helpId"
                          placeholder=" Enter some description"
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </h5>
                </div>
              </div>
              <div className="col-lg-6 mb-4 ">
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
                    <div className=" text-left">
                      <label className="form-label">Date Modified</label>
                      <input
                        type="date"
                        className="form-control  mb-3  m-0"
                        name="date_modified"
                        id=""
                        aria-describedby="helpId"
                        placeholder="date_modified"
                        onChange={onChange}
                      />
                      <label className="form-label">Date Created</label>
                      <input
                        type="date"
                        className="form-control mb-3   m-0"
                        name="date_created"
                        id=""
                        aria-describedby="helpId"
                        placeholder="date_created"
                        onChange={onChange}
                      />



                    </div>
                  </div>
                </h5>
              </div>
            </div>
            <div className="col-lg-6 mb-4 ">
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
{mediaModel &&  <ChooseMedia open={openMedia} selectImage={selectImage} showAlert={props.showAlert}/>}
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
