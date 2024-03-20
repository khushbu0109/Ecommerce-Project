import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import productContext from "../../context/Product/productContext";
export default function AddProductModal(props) {
  const style = {
    background: "#00000080",
    display: "block",
  };

  const mycontext = useContext(productContext);
  const { product, getAllProduct, updateProduct, deleteProduct, setProduct } = mycontext;
  useEffect(() => {
    getAllProduct();
  }, []);

  const [mycart, setMycart] = useState({});

  


  const updateProductPrice = (value, id, p_id) => {
    const updatedat = product.map((pro) => {
      return pro._id === p_id 
        ? { ...pro, price: value, attr_id: id }
        : pro;
    });
    setProduct(updatedat);
  };

//   console.log(product);

  const [query, setQuery] = useState("");

  const [selectedProduct, setSelectedProduct] = useState([]);



  const setAttrPrice = async (type, key, pro) => {
    setMycart({
      ...mycart,
      product_id: pro.product_data._id,
      catlog_id: pro.catdata._id,

      type,
      key,
      price: pro.price,
    });
  };




  const handleChange = (e) => {
    const { name, checked } = e.target;
    const checkproduct = product.filter((pro) => {
      return pro._id === name;
    });    
    setSelectedProduct([...selectedProduct, checkproduct[0]]);
  };

  const goToParentData = () => {
    props.open();
    props.setItem(selectedProduct);
  };

  

  return (
    <>
      <div className={`modal reviewModal`} style={style}>
        <div
          className="modal-dialog"
          style={{ width: "80em", maxWidth: "80%", maxHeight: "80%" }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Item
              </h5>
              <input
                type={"text"}
                className="search modalSearch form-control"
                placeholder="Search Product...."
              />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={props.open}
              ></button>
            </div>
            <div className="modal-body">
              {/* <div className="table-responsive text-nowrap mb-1 ">
                <table className="table table-hover product_table">
                  <thead className="product_table_header">
                    <tr>
                      <th>Product</th>
                      <th>Choose Variation</th>
                      <th>Choose Pricing/Packaging</th>
                    </tr>
                  </thead>
                  <tbody className="product_table_body">
                    {product.map((pro, index) => {
                      return (
                        <tr>
                          <td>
                            <div className="row ">
                              <div className="col-lg-5">
                                <img
                                  src={pro.p_gallery_image[0].link}
                                  className="img-fluid"
                                />
                              </div>
                              <div className="col-lg-7">
                                <span className="product_title m-0">
                                  {pro.p_name}
                                </span>
                                <small className="p-0  product_brand">
                                  {" "}
                                  {pro.brand}
                                </small>
                                <small className="p-0 m-0 product_mrp">
                                  MRP. <del>200</del>{" "}
                                  <span
                                    className="font-bold"
                                    style={{ color: "black" }}
                                  >
                                    Rs. 164
                                  </span>{" "}
                                  / piece
                                </small>

                                <span className="product_desc">
                                  {pro.description}
                                </span>

                                <span className="">MOQ ( {pro.m_o_q} )</span>
                              </div>
                            </div>
                          </td>
                          <td className="">
                            <div className="row ">
                              {pro.p_price.map((attprice) => {
                                return (
                                  <div className="col-lg-4 variationList">
                                    <span
                                      onClick={() => {
                                        updateProductPrice(
                                          attprice.value,
                                          attprice._id,
                                          pro._id,                                          
                                        );
                                      }}
                                      className={`variation ${
                                        attprice.value === pro.price
                                          ? "active"
                                          : ""
                                      } `}
                                    >
                                      {attprice.name}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </td>
                          <td>
                            <div className="row">
                              <div className="col-lg-7">
                                <ul className="pricingList">
                                  <li
                                    onClick={() => {
                                      setAttrPrice("unit", pro.unit_name, pro);
                                    }}
                                  >
                                    <span
                                      className="font-bold"
                                      style={{ color: "black" }}
                                    >
                                      Rs. {pro.price} /{" "}
                                    </span>
                                    <small>
                                      {pro.unit_value} {pro.unit_name}
                                    </small>
                                  </li>

                                  <li
                                    onClick={() => {
                                      setAttrPrice("pkg", pro.pkg_unit, pro);
                                    }}
                                  >
                                    <span
                                      className="font-bold"
                                      style={{ color: "black" }}
                                    >
                                      Rs. {pro.price * pro.pkg} /{" "}
                                    </span>
                                    <small>{pro.pkg_unit}</small>
                                  </li>

                                  <li
                                    onClick={() => {
                                      setAttrPrice("mpkg", pro.mpkg_unit, pro);
                                    }}
                                  >
                                    <span
                                      className="font-bold"
                                      style={{ color: "black" }}
                                    >
                                      Rs. {pro.price * pro.pkg * pro.mpkg} /{" "}
                                    </span>
                                    <small>{pro.mpkg_unit}</small>
                                  </li>
                                </ul>
                              </div>

                              <div className="col-lg-5">
                                <form method="post">
                                  <div className="input-group product_qty">
                                    <input
                                      type="number"
                                      className="form-control product_no"
                                      aria-label=""
                                      placeholder="QTY"
                                      name="qty"
                                      defaultValue={1}
                                      // onChange={onQtyChange}
                                    />
                                    <button
                                      className="btn btn-outline-primary "
                                      type="submit"
                                      // onClick={(e) => {
                                      //   addToCart(e, pro);
                                      // }}
                                    >
                                      Add
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div> */}
              <div className="table-responsive text-nowrap mb-1">
                <table className="table table-hover">
                  <thead className="order_history_header">
                    <tr>
                      <th>Product Pic.</th>
                      <th>P. Name</th>
                      <th>Price/Variation</th>
                      <th>P.Sku/Barcode</th>
                      <th>Categories</th>
                      <th className="action">Action</th>
                    </tr>
                  </thead>
                  <tbody className="table-border-bottom-0 order_history_body">
                    {product
                      .filter((product) =>
                        product.p_name.toLowerCase().includes(query)
                      )
                      .map((pro, i) => {
                        const subCategory = pro.cat_id.sub_items.filter(
                          (sub_cat) => {
                            return sub_cat._id === pro.sub_cat_id;
                          }
                        );
                        return (
                          <tr key={pro._id}>
                            <td>
                              <input
                                className="form-check-input my-auto"
                                type="checkbox"
                                value="mpkg_unit"
                                id="defaultRadio1"
                                name={pro._id}
                                onChange={handleChange}                                
                              />

                              <img
                                src={
                                  pro.p_gallery_image.length !== 0
                                    ? pro.p_gallery_image[0].link
                                    : "../assets/img/avatars/5.png"
                                }
                                alt="Avatar"
                                width="60"
                                height="60"
                                className="rounded-circle  my-auto"
                              />
                            </td>
                            <td>{pro.p_name}</td>
                            <td>
                              {pro.p_price.length !== 0 ? (
                                <ul className="attrContainer">
                                  {pro.p_price.map((attr) => {
                                    return (
                                      <li key={attr._id}>
                                        <span className="unitSpan">
                                          {attr.name} -
                                          <ul className="attrprice">
                                            <li>
                                              {attr.value}/{" "}
                                              {pro.unit_value +
                                                " " +
                                                pro.unit_name}
                                            </li>
                                            <li>
                                              {attr.value * pro.pkg}/{" "}
                                              {pro.pkg_unit}
                                            </li>
                                            <li>
                                              {attr.value * pro.pkg * pro.mpkg}/{" "}
                                              {pro.mpkg_unit}
                                            </li>
                                          </ul>
                                        </span>
                                      </li>
                                    );
                                  })}
                                </ul>
                              ) : (
                                <div>
                                  ₹ {pro.price} per{" "}
                                  {pro.unit_value + " " + pro.unit_name}
                                  <br />₹ {pro.price * pro.pkg} per{" "}
                                  {pro.pkg_unit}
                                  <br />₹ {pro.price *
                                    pro.pkg *
                                    pro.mpkg} per {pro.mpkg_unit}
                                </div>
                              )}
                            </td>

                            <td>
                              {pro.p_sku}
                              <br />
                              <small>{pro.barcode}</small>
                            </td>
                            <td>
                              {pro.cat_id.cat_name} <br />
                              <small> ({subCategory[0].name})</small>
                            </td>

                            <td className="action">
                              <span className="badge badge-secondary mx-2 my-delete">
                                <i className="bx bx-edit-alt "></i>
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                  <tfoot style={{ border: "none!important" }}>
                    <tr>
                      <td
                        colSpan={5}
                        className="text-right"
                        onClick={props.open}
                      >
                        cancel
                      </td>
                      <td>
                        <button
                          className="btn orange-btn"
                          onClick={goToParentData}
                        >
                          Done
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
