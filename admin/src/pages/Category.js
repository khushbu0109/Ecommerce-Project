import React, { useContext, useEffect, useState } from "react";
import Preloader from "../componant/Preloader";
import categoryCon from "../context/Category/CategoryContext";
import DataTable from "react-data-table-component";
export default function Category(props) {
  const [preloader, setPreloader] = useState("");

  const [editCatModel, setEditCatModel] = useState(false);
  const [updateCat, setUpdateCat] = useState({});

  const [query, setQuery] = useState("");

  const myContext = useContext(categoryCon);
  const {
    category,
    getAllCatagory,
    createCategory,
    deleteCategory,
    updateCategory,
    createSubCategory,
    deleteSubCategory
  } = myContext;

  useEffect(() => {
    getAllCatagory("blog");
  }, []);
  const style = {
    background: "#00000080",
    display: "block",
  };
  const [newCategory, setnewCategory] = useState({
    name: "",
    cat_type: "blog",
    status: true,

  });

  const [addCategoryModal, setAddCategoryModal] = useState(false);

  const openData = () => {
    setAddCategoryModal(!addCategoryModal);
  };

  const onChange = (e) => {
    setnewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setPreloader("preShow");
    const response = await createCategory(newCategory);
    if (response.status === "success") {
      openData();
      props.showAlert(response.message, "success");
    } else {
      props.showAlert(response.message, "warning");
    }
    setPreloader("");
  };

  /*   delete category */

  const delete_cat = async (id) => {
    setPreloader("preShow");
    const response = await deleteCategory(id);
    console.log(id);
    if (response.status === "Success") {
      props.showAlert(response.message, "success");
    } else {
      props.showAlert(response.messae, "warning");
    }
    setPreloader("");
  };

  const onEdit = (e) => {
    setUpdateCat({ ...updateCat, [e.target.name]: e.target.value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    setPreloader("preShow");
    const response = await updateCategory(updateCat._id, updateCat);
    if (response.status === "Success") {
      openCatEdit({});
      props.showAlert(response.message, "success");
    } else {
      props.showAlert(response.message, "warning");
    }
    setPreloader("");
  };
  const openCatEdit = (cat) => {
    setEditCatModel(!editCatModel);
    if (cat) {
      setUpdateCat(cat);
    }
  };

  const [addSubCatModel, setAddSubCatModel] = useState();
  const openSubData = () => {
    setAddSubCatModel(!addSubCatModel);
  };

  const [newSubCat, setNewSubCat] = useState({ sub_cat_name: "", cat_id: "" });

  const onsubchange = (e) => {
    setNewSubCat({ ...newSubCat, [e.target.name]: e.target.value });
  };
  const handlesubclick = async (e) => {
    e.preventDefault();
    setPreloader("preShow");
    const subcat = await createSubCategory(newSubCat.cat_id, {
      sub_cat_name: newSubCat.sub_cat_name,
    });
    if (subcat.status === "Success") {
      openSubData();
    }
    setPreloader("");
  };
  /* status update */

const deleSub = async(id,sub_id)=>{

  const res = await deleteSubCategory(id,sub_id);
  if(res.status==="Failed"){
    props.showAlert(res.message,"warning");
  }
  else{
    props.showAlert(res.message,"success");

  }

}
  const changeStatus = async (id, status, type) => {
    setPreloader("preShow");
    let response = {};
    if (type === "status") {
      response = await updateCategory(id, { status: status });
    } else {
      response = await updateCategory(id, { status: status });
    }
    response.status === "Success"
      ? props.showAlert(`${type} status is update`, "success")
      : props.showAlert(response.messae, "danger");
    setPreloader("");
  };

  const [statusChange, setStatusChange] = useState(null);

  const columns = [
    {
      name: "primary Category",
      selector: (row) => row.primary_category,
      sortable: true,
    },
    {
      name: "status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "sub Category",
      selector: (row) => row.sub_cat,
      sortable: true,
    },
    {
      name: "Action",
      selector: row => row.action,

    },

  ];

  const data = category
    .filter((cat) => {
      return (
        (statusChange === null || cat.status === statusChange) &&
        cat.name.toLowerCase().includes(query.toLowerCase())
      );
    })
    .map((cat, index) => {
      return {
        id: index,
        primary_category: cat.name,
        status: cat.status ? (
          <span class="badge bg-success me-1" onClick={() => {
            changeStatus(cat._id, false, "status");

          }}>Aproved</span>

        ) : (
          <span class="badge bg-danger me-1" onClick={() => {
            changeStatus(cat._id, true, "status");

          }}>Pending</span>
        ),
        sub_cat: cat.sub_cat.map((s, j) => {
          return (
            <div
              className="dropdown subcategory"
              style={{ display: "inline-flex" }}
              key={j}
            >
              {s.name}
              <div className="dropdown mx-2">
                <i className="bx bx-edit me-1 ml-2" onClick={()=>{
                  openCatEdit()
                }}></i>

                <i className="bx bx-trash me-1" onClick={()=>{
                  deleSub(cat._id,s.id)
                }}></i>
              </div>
            </div>
          );
        }),

        action: (
          <div className="dropdown">
          <span class="badge bg-warning me-1">
            <i
              className="bx bx-edit me-1"
              onClick={() => {
                openCatEdit(cat);
              }}
            ></i>
            </span>
            <span class="badge bg-danger">
            <i
              className="bx bx-trash me-1"
              onClick={() => {
                delete_cat(cat._id);
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

      {editCatModel && (
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
                    openCatEdit();
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
                            defaultValue={updateCat.name}
                            id=""
                            aria-describedby="helpId"
                            placeholder="Category Name"
                            onChange={onEdit}
                          />
                        </div>
                      </form>
                      <div className="form-group mb-3">
                        <input
                          type="textarea"
                          className="form-control    m-0"
                          name="description"
                          id=""
                          defaultValue={updateCat.description}
                          aria-describedby="helpId"
                          placeholder="Enter Discription"
                          onChange={onEdit}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <label className="form-label">Stock status</label>
                        <table width="100%" className="mb-3">
                          <tr>
                            <td>
                              <div className="form-check">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="status"
                                  value={false}
                                  defaultChecked={
                                    updateCat.status ? false : true
                                  }
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
                                  defaultChecked={
                                    updateCat.status ? true : false
                                  }
                                  onChange={onEdit}
                                />
                                <label className="form-label">Publish</label>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>

                      <div className="form-group mb-3">
                        <label className="form-label"> sub-Category</label>
                        <input
                          type="text"
                          defaultValue={updateCat.keywords}
                          className="form-control    m-0"
                          name="keywords"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter Meta Keywords"
                          onChange={onEdit}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <label className="form-label">
                          Enter Meta Description
                        </label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="description"
                          defaultValue={updateCat.description}
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter Meta Others"
                          onChange={onEdit}
                        />
                      </div>
                    </div>
                    {/* category add section end */}
                  </div>
                  <div className="mt-3">
                    <button
                      type="reset"
                      className="btn btn-outline-primary me-2 my-btn"
                      onClick={openCatEdit}
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

      {addCategoryModal && (
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
                            placeholder="Category Name"
                            onChange={onChange}
                          />
                        </div>
                      </form>
                      <div className="form-group mb-3">
                        <input
                          type="textarea"
                          className="form-control    m-0"
                          name="description"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter Discription"
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <label className="form-label"> status</label>
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
          </div>
        </div>
      )}
      {addSubCatModel && (
        <div className="modal reviewModal" style={style}>
          <div className="modal-dialog" style={{ width: "40%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Sub-Category
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={openSubData}
                ></button>
              </div>
              <div className="modal-body">
                <form
                  id="formAccountSettings"
                  method="POST"
                  onSubmit={handlesubclick}
                >
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <label className="form-label">Category name</label>
                        <select
                          type="text"
                          className="form-control    m-0"
                          name="cat_id"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter Sub-category"
                          onChange={onsubchange}
                        >
                          <option value="">select category</option>
                          {category.map((cat, i) => {
                            return <option value={cat._id}>{cat.name}</option>;
                          })}
                        </select>
                      </div>

                      <div className="form-group mb-3">
                        <label className="form-label">Sub_category name</label>
                        <input
                          type="text"
                          className="form-control    m-0"
                          name="sub_cat_name"
                          id=""
                          aria-describedby="helpId"
                          placeholder="Enter Sub-category"
                          onChange={onsubchange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button
                      type="reset"
                      className="btn btn-outline-primary me-2 my-btn"
                      onClick={openSubData}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn orange-btn btn-primary me-2"
                      onClick={handlesubclick}
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
              + Add Category
            </div>
          </div>
          <div className=" button">
            <div
              className="btn btn-sm fixed_button btn-outline-primary subcategory"
              onClick={openSubData}
            >
              + Add Sub-Category
            </div>
          </div>

          <div className="row">
            <h4 className="card-header c_heading">
              <span className="headingcontent">My Categories</span>


            </h4>

            <div className="col-lg-12 mb-4 ">
              <div className="card">
                <h5 className="card-header">
                  <div className="row">
                    <div className="col-lg-6 font-bold">
                      <ul className="slider_button slider-white plain-orange">
                        <li className="slider-active me-3">Categories</li>
                      </ul>
                    </div>
                    <div className="col-lg-6 text-right">
                      <input
                        type="text"
                        className="form-control search"
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
          </div>
        </div>
      </div>
    </>
  );
}
