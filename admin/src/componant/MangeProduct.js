import React, { useContext, useEffect, useState } from "react";
import productContext from "../context/Product/productContext";

export default function ManageProduct(props) {
  const context = useContext(productContext);
  const {
    product,
    getAllProduct,
    setProduct,
    getAllProductbyChecked,
  } = context;

  useEffect(() => {
    getAllProductbyChecked(props.cat_data);
  }, []);

  const [selectCustomer, setSelecteCustomer] = useState([]);
  
  const handleChange = (e) => {
    const { name, checked } = e.target;
    
    if (name.toString() === "all") {
      const myArr = [];
      let tempUser = product.map((pro) => {
        myArr.push({ p_id: pro._id });
        return { ...pro, ischecked: checked };
      });
      setProduct(tempUser);
      setSelecteCustomer(myArr);
    } else {
      const myArr = [];
      let tempUser = product.map((pro) =>
        pro._id.toString() === name.toString()
          ? { ...pro, ischecked: checked }
          : pro
      );


      tempUser.map((cus) => {        
        if (cus.ischecked) {
          myArr.push({ p_id: cus._id });
        }    
      });

      setProduct(tempUser);
      setSelecteCustomer(myArr);
    }
  };

  const assignCustomer = (e) => {
    e.preventDefault();
    props.updateProductCatalog(selectCustomer, props.cat_data._id);
  };

  return (
    <>
      <div className="card p-2 mamnageProductCard">
        {/* {catalogDetails._id} */}
        <div className="card-datatable table-responsive">
          <table className="datatables-basic table border-top">
            <thead className="order_history_header">
              <tr>
                <th>
                  <div className="form-check mt-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="mpkg_unit"
                      id="defaultRadio1"
                      name="all"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="defaultRadio1">
                      P. Name ({selectCustomer.length})
                    </label>
                  </div>
                </th>
                <th>Image</th>

                <th>
                  Variations/ Pricing{" "}
                  <span class="badge rounded-pill bg-success discount">
                    {props.cat_data.flattDiscount ? "₹ " : ""}
                    {props.cat_data.discount}
                    {props.cat_data.flattDiscount ? " OFF" : "% OFF"}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {product.map((pro) => {
                return (
                  <tr key={pro._id}>
                    <td>
                      <div className="form-check mt-3">
                        <input
                          // name="default-radio-1"
                          className="form-check-input"
                          type="checkbox"
                          value="mpkg_unit"
                          id="defaultRadio1"
                          name={pro._id}
                          onChange={handleChange}
                          checked={pro.ischecked || false}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="defaultRadio1"
                        >
                          {pro.p_name}
                        </label>
                      </div>
                    </td>
                    <td>
                      <img
                        src={pro.p_gallery_image[0].link}
                        className="img-fluid"
                        width="50"
                      />
                    </td>

                    <td>
                      ₹ <del>{pro.price}</del>
                      <b>
                        {" "}
                        {props.cat_data.flattDiscount
                          ? pro.price - props.cat_data.discount
                          : (pro.price * (100 - props.cat_data.discount)) /
                            100}{" "}
                      </b>
                      <span className="unitSpan">
                        per {pro.unit_value + " " + pro.unit_name}
                      </span>
                      <br />₹ <del>{pro.price * pro.pkg}</del>
                      <b>
                        {" "}
                        {props.cat_data.flattDiscount
                          ? (pro.price - props.cat_data.discount) * pro.pkg
                          : (pro.price *
                              pro.pkg *
                              (100 - props.cat_data.discount)) /
                            100}{" "}
                      </b>
                      <span className="unitSpan">per {pro.pkg_unit}</span>
                      <br />₹ <del>{pro.price * pro.mpkg * pro.pkg}</del>
                      <b>
                        {" "}
                        {props.cat_data.flattDiscount
                          ? (pro.price - props.cat_data.discount) *
                            pro.mpkg *
                            pro.pkg
                          : (pro.price *
                              pro.mpkg *
                              (100 - props.cat_data.discount)) /
                            100}{" "}
                      </b>
                      <span className="unitSpan">per {pro.mpkg_unit}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th>
                  <p className="btn orange-btn" onClick={assignCustomer}>
                    Save
                  </p>
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
}
