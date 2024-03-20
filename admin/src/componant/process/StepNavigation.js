import React, { useContext, useState, useEffect } from "react";
import catContext from "../../context/Category/catContext";
import StepItem from "./StepItem";
export default function StepNavigation(props) {
  const array = props.labelArray;

  const mycontext = useContext(catContext);
  const { category, getAllCategory, attribute, getAttr } = mycontext;

  const [subCategory, setSubCategory] = useState([
    {
      name: "Select Sub Category",
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    c_id: localStorage.getItem("com_id"),
    cat_id: "",
    sub_cat_id: "",
    p_name: "",
    p_sku: "",
    inventory: "",
    hide_inventory: false,
    visibility: false,
    m_o_q: 2,
    pkg: "",
    mpkg: "",
    description: "",
    p_image: "",
    p_gallery_image: [],
    p_gallery_video: "",
    attribute_id: "",
    p_price: [
      {
        name: "",
        value: "",
      },
    ],
  });
  const [price] = useState([
    {
      name: "",
      value: "",
    },
  ]);

  const [subAttribte, setSubAttribute] = useState([
    {
      value: "Select Attribute",
    },
  ]);

  useEffect(() => {
    getAllCategory();
    getAttr();
  }, []);

  const clickChange = (e) => {
    const id = e.target.value;
    setNewProduct({ ...newProduct, cat_id: e.target.value });
    for (let i = 0; i < category.length; i++) {
      const element = category[i];
      if (element._id === id) {
        setSubCategory(element.sub_items);
      }
    }
  };

  //   attribute click handle
  const clickAttribute = (e) => {
    price.length = 0;
    setNewProduct({ ...newProduct, attribute_id: e.target.value });
    const id = e.target.value;
    for (let i = 0; i < attribute.length; i++) {
      const element = attribute[i];
      if (element._id === id) {
        setSubAttribute(element.data);
        for (let j = 0; j < element.data.length; j++) {
          const element2 = element.data[j];
          const obj = { name: element2.value, value: "" };
          price.push(obj);
          console.log(obj);
        }
      }
    }
  };

  const onInputFormData = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const onChangePriceAdd = (e) => {
    for (let i = 0; i < price.length; i++) {
      const element = price[i];
      if (element.name.toString() === e.target.name.toString()) {
        element.value = e.target.value;
        break;
      }
    }
  };

  return (
    <>
    <div  className="col-3">
      <div className="stepWrapper">
        {array.map((c, index) => {
          return (
            <>
              <StepItem
                label={c}
                index={index}
                updateStep={props.updateStep}
                selected={props.currentStep === index + 1}
              />
            </>
          );
        })}
      </div>
      </div>
      {/* step one start */}
      <div
        className={
          "stepContent mb-5 " + (props.currentStep === 1 ? " showStep" : "")
        }
      >
        <div className="card">
          <div className="card-header c_heading">
            <span className="headingcontent">Choose Category</span>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="exampleFormControlSelect2">
                Category
                {/* <i
                            className="bx bx-plus bx-sm align-middle"
                            style={{ cursor: "pointer", color: "orange" }}
                          ></i> */}
                <p className="btn btn-sm categoryBtn btn-outline-primary ">
                  Add Category
                </p>
              </label>
              <select
                multiple
                className="form-select "
                id="exampleFormControlSelect2"
                aria-label="Multiple select example"
                onChange={clickChange}
                required
              >
                {category.map((c, i) => {
                  return (
                    <option value={c._id} key={i}>
                      {c.cat_name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="sub_cat_id">Sub Category</label>
              <select
                className="form-control  "
                name="sub_cat_id"
                id="sub_cat_id"
                onChange={onInputFormData}
                required
              >
                {subCategory.length >= 1 && (
                  <option value="0">Select Sub Category</option>
                )}

                {subCategory.map((sub, i) => {
                  return (
                    <option value={sub._id} key={i}>
                      {sub.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* step two */}
      <div
        className={
          "stepContent mb-5 " + (props.currentStep === 2 ? " showStep" : "")
        }
      >
        <div className="card  p-0">
          <div className="card-header c_heading">
            <span className="headingcontent">Product Info</span>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="p_name">Product Name</label>
              <input
                type="text"
                className="form-control   m-0"
                name="p_name"
                id="p_name"
                aria-describedby="helpId"
                placeholder="Product Name"
                onChange={onInputFormData}
                required
              />
            </div>

            <div className="form-group my-2">
              <label htmlFor="p_sku">Product SKU</label>
              <input
                type="text"
                className="form-control   m-0"
                name="p_sku"
                id="p_sku"
                aria-describedby="helpId"
                placeholder="Product Name"
                onChange={onInputFormData}
                required
              />
            </div>

            <div className="form-group my-2">
              <label htmlFor="inventory">Product Unit</label>
              <input
                type="number"
                className="form-control   m-0"
                name="unit"
                id="unit"
                aria-describedby="helpId"
                placeholder="Unit"
                required
                onChange={onInputFormData}
              />
              <small id="helpId" class="form-text text-muted">
                Per 2 Kg
              </small>
            </div>

            <div className="form-group my-2">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                name="description"
                id="description"
                rows="3"
                placeholder="Description"
                onChange={onInputFormData}
                required
              ></textarea>
            </div>

            <div className="form-group my-2">
              <label htmlFor="inventory">Inventory</label>
              <input
                type="number"
                className="form-control   m-0"
                name="inventory"
                id="inventory"
                aria-describedby="helpId"
                placeholder="Inventory"
                required
                onChange={onInputFormData}
              />
            </div>

            <div className="form-group my-2">
              <label htmlFor="m_o_q">M. O. Q.</label>
              <input
                type="number"
                className="form-control   m-0"
                name="m_o_q"
                id="m_o_q"
                aria-describedby="helpId"
                placeholder="MOQ"
                onChange={onInputFormData}
                required
              />
            </div>

            <div className="form-group my-2">
              <label htmlFor="pkg">Pkg.</label>
              <input
                type="text"
                className="form-control   m-0"
                name="pkg"
                id="pkg"
                aria-describedby="helpId"
                placeholder="Product Name"
                onChange={onInputFormData}
                required
              />
            </div>

            <div className="form-group my-2">
              <label htmlFor="mpkg">Master Pkg.</label>
              <input
                type="text"
                className="form-control   m-0"
                name="mpkg"
                id="mpkg"
                aria-describedby="helpId"
                placeholder="Product Name"
                onChange={onInputFormData}
                required
              />
            </div>

            <div className="form-check form-switch mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Hide Inventory
              </label>
            </div>

            <div className="form-check form-switch mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Product Visibility
              </label>
            </div>

            <button type="submit" className="btn-primary orange-btn me-2 mt-3 ">
              Add
            </button>
          </div>
        </div>
      </div>

      {/* step 3 */}
      <div
        className={
          "stepContent mb-5 " + (props.currentStep === 3 ? " showStep" : "")
        }
      >
        <div className="card  p-0">
          <div className="card-header c_heading">
            <span className="headingcontent">Pricing</span>
          </div>
          <div className="card-body">
            <form method="post">
              <div className="mb-3">
                <label htmlFor="exampleFormControlSelect2">
                  Attribute (Variation)
                  <i
                    className="bx bx-plus bx-sm align-middle"
                    style={{ cursor: "pointer", color: "orange" }}
                  ></i>
                </label>
                <select
                  multiple
                  className="form-select"
                  id="exampleFormControlSelect2"
                  aria-label="Multiple select example"
                  onChange={clickAttribute}
                  required
                >
                  {attribute.map((a, i) => {
                    return (
                      <option value={a._id} key={i}>
                        {a.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="">Set Price Details</label>
                {subAttribte.map((sat, i) => {
                  return (
                    <>
                      <div className="form-group my-2" key={i}>
                        <label htmlFor="">{sat.value}</label>
                        <input
                          type="text"
                          className="form-control   m-0"
                          name={sat.value}
                          id=""
                          aria-describedby="helpId"
                          placeholder="Price"
                          onChange={onChangePriceAdd}
                        />
                      </div>
                    </>
                  );
                })}
              </div>

              {/* <div className="form-group my-2">
                      <label htmlFor="">Product Images</label>
                      <input
                        type="file"
                        className="form-control   m-0"
                        name="cat_name"
                        id=""
                        aria-describedby="helpId"
                      />
                    </div>

                    <div className="form-group my-2">
                      <label htmlFor="">Product Video</label>
                      <input
                        type="file"
                        className="form-control   m-0"
                        name="cat_name"
                        id=""
                        aria-describedby="helpId"
                      />
                    </div> */}
            </form>
          </div>
        </div>
      </div>

      {/* step 4 */}

      <div
        className={
          "stepContent mb-5 " + (props.currentStep === 4 ? " showStep" : "")
        }
      >
        <div className="card">
          <div className="card-header c_heading">
            <span className="headingcontent">Set Image</span>
          </div>
          <div className="card-body">
            <input type="file" className="form-control" />
          </div>
        </div>
      </div>

      {props.currentStep !== 1 && (
        <button
          className="btn orange-btn btn-primary me-2"
          onClick={() => props.updateStep(props.currentStep - 1)}
        >
          Back
        </button>
      )}
      
        <button
          className="btn orange-btn btn-primary me-2 my-2"
          onClick={() => props.updateStep(props.currentStep + 1)}
        >
            {props.currentStep !== 4 ? "Next":"Save"}
          
        </button>
      
    </>
  );
}
