import React, { useContext, useState } from "react";
import catalogContext from "../../context/Catalog/CatalogContext";
export default function AddNewCatalog(props) {
  const context = useContext(catalogContext);
  const { AddNewCatalogData } = context;
  const style = {
    background: "#00000080",
    display: "block",
  };
  const [newCatalog, setNewCatalog] = useState({
    c_id: localStorage.getItem("com_id"),
    catalog_name: "",
    nick_name:"",
    flattDiscount: false,
    discount: 0,
    products: [],
    customers:[]
  });
  const [type,setType]= useState("Percentage");
  const typeChange=(text)=>{
    setType(text);
    if (text==="Percentage") {
      setNewCatalog({...newCatalog, flattDiscount:false});
    }else{
      setNewCatalog({...newCatalog, flattDiscount:true});
    }
  }

  const setFormdata = (e) => {
    setNewCatalog({ ...newCatalog, [e.target.name]: e.target.value });
  };
  const submitformdata = async(e) => {
    e.preventDefault();
    const res = await AddNewCatalogData(newCatalog);
    if(res.status==="Success"){
      props.open();
      props.showAlert(res.msg,"success");
    }else{
      props.showAlert(res.msg,"danger");
    }
  };
  return (
    <>
      <div className="modal reviewModal" style={style}>
        <div className="modal-dialog" style={{ width: "35em" }}>
          <div className="modal-content">
            <form method="post" onSubmit={submitformdata}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Catalog
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={props.open}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Catalog Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="catalog_name"
                    id="review_name"
                    placeholder="Catalog Name"
                    onChange={setFormdata}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Nick Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="review_name"
                    placeholder="Catalog Nick Name"
                    name="nick_name"
                    onChange={setFormdata}
                  />
                  <small className="text-muted">
                    This name is only for your understanding. It's not visible
                    to your customers
                  </small>
                </div>

                <label htmlFor="message-text" className="col-form-label">
                  Catalog Discount
                </label>

                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Text input with dropdown button"
                    placeholder="Give discounts on MRP "
                    name="discount"
                    onChange={setFormdata}
                  />

                  <button
                    className="btn btn-outline-primary dropdown-toggle my-dropdown"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {type}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <p className="dropdown-item" onClick={()=>{typeChange("Percentage")}}>Percentage</p>
                    </li>
                    <li>
                      <p className="dropdown-item" onClick={()=>{typeChange("Amount")}}>Amount</p>
                    </li>
                  </ul>
                  <small className="text-muted">
                    Give Discount percetange wise or flat rate wise on MRP of
                    your products. All the products in the catalog will be
                    discounted by same percentage or amount you choose. When you give discount amount wise the amount wil be discounted on product unit and then the price of packaging and master packaging will be auto calculated.
                  </small>
                </div>

                <p className="instruction_para">
                  You can manage the customers and products of this catalog in
                  the next step.
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn  my-btn me-2 mb-2">
                  Watch Demo Video
                </button>
                <button
                  type="submit"
                  className="btn btn-primary orange-btn me-2 mb-2"
                >
                  Create Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
