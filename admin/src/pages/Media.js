import React, { useState, useContext, useEffect } from "react";
import preloader from "../componant/Preloader";
import MediaCon from "../context/Media/MediaCon";

const Media = (props) => {
  const [preloader, setPreloader] = useState("");
  const [editMediaModel, seteditMediaModel] = useState(false);
  const [updateMedia, setUpdateMedia] = useState({});
  const [query, setQuery] = useState("");
  const myContext = useContext(MediaCon);
  const { media, getAllMedia, uploadMedia, deleteMedia } = myContext;
  useEffect(() => {
    getAllMedia();
  }, []);

  const style = {
    background: "#00000080",
    display: "block",
  };

  const [newMedia, setNewMedia] = useState({
    files: [],
  });

  const [addMediaModel, setAddMediaModel] = useState(false);
  const openData = () => {
    setAddMediaModel(!addMediaModel);
  };

  const handleClick = async (e) => {
    setPreloader("preShow");
    e.preventDefault();
    const from_data = new FormData();
    for (let i = 0; i < newMedia.files.length; i++) {
      const element = newMedia.files[i];
      from_data.append("file", element);
    }
    const response = await uploadMedia(from_data);
    if (response.status === "success") {
      props.showAlert(response.message, "success");
      openData();
      getAllMedia();
    } else {
      props.showAlert(response.message, "warning");
    }
    setPreloader("");

    console.log(newMedia);
  };
  const onChange = (e) => {
    setNewMedia({ files: [...newMedia.files, ...e.target.files] });
  };

const delete_media = async(id)=>{
  setPreloader("proShow")
  const response = await deleteMedia(id);
  console.log(id);
  if(response.status==="Success"){
    props.showAlert(response.message,"success")
  }
  else{
    props.showAlert(response.message,"danger")
  }
  setPreloader("")
}
const onEdit = (e) => {
  setUpdateMedia({ ...updateMedia, [e.target.name]: e.target.value });
};
const handleUpdate = async (e) => {
  e.preventDefault();
  setPreloader("preShow");
  const response = await updateMedia(updateMedia._id, updateMedia);
  if (response.status === "Success") {
    openMediaEdit({});
    props.showAlert(response.message, "success");
  } else {
    props.showAlert(response.message, "warning");
  }
  setPreloader("");
};
const openMediaEdit = (med) => {
  seteditMediaModel(!editMediaModel);
  if (med) {
    setUpdateMedia(med);
  }
};

  return (
    <>
      {editMediaModel && (
        <div className="modal reviewModal" style={style}>
          <div className="modal-dialog" style={{ width: "40%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Order Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={openMediaEdit}
                ></button>
              </div>
              <div className="modal-body">
                <form id="formAccountSettings" method="POST">
                  <div className="row">
                    <div className="col-12 my-1">
                      <form method="post"
                      onSubmit={handleUpdate}>
                        <div className="form-group">
                          <input
                            type="file"
                            className="form-control m-0"
                            name="file"
                           defaultValue={updateMedia.files}
                            id=""
                            multiple
                            aria-describedby="helpUd"
                            onChange={onEdit}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button
                      type="reset"
                      className="btn btn-outline-primary me-2 my-btn"
                      onClick={openMediaEdit}
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
      {addMediaModel && (
        <div className="modal reviewModal" style={style}>
          <div className="modal-dialog" style={{ width: "40%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Order Details
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
                <form id="formAccountSettings" method="POST">
                  <div className="row">
                    <div className="col-12 my-1">
                      <form method="post"
                      onSubmit={handleClick}>
                        <div className="form-group">
                          <input
                            type="file"
                            className="form-control m-0"
                            name="file"
                            id=""
                            multiple
                            aria-describedby="helpUd"
                            onChange={onChange}
                          />
                        </div>
                      </form>
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

      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="fixed-button">
            <div
              className="btn btn-sm fixed_button btn-outline-primary"
              onClick={openData}
            >
              + Add Media
            </div>
          </div>
          <div className="row">
            <h4 className="card-header c_heading">
              <span className="headingcontent">My Media</span>
            </h4>
            <div className="col-lg-12 mb-4">
              <div className="card">
                <h5 className="card-header">
                  <div className="row">
                    <div className="col-lg-6 font-bold">
                      <ul className="slider_button slider-white plain-orange">
                        <li className="slider-active">Images</li>
                        <li className="slider-active">Audio</li>
                        <li className="slider-active">Vedios</li>
                      </ul>

                    </div>
                    <div className="col-lg-6 text-right">
                      <input
                        type="text"
                        className="form-control search"
                        placeholder="Search Media"
                      />
                    </div>
                  </div>
                </h5>

                <div className="card-body">
                  <div className="row">
                    {media
                     .map((med, i) => {
                      return (

                        <div
                        key={i}
                          className="col-2 mb-2 thumbnail mx-2"
                          style={{ position: "relative" }}
                        >
                          <div className="img_del" onClick={()=>delete_media(med._id)}>
                            <i className=" fa fa-trash" />
                          </div>
                          <div className="img_update" onClick={()=>delete_media(med._id)}>
                          <i className="bx bx-edit me-1" onClick={()=>{
                            openMediaEdit(med)
                          }}></i>
                          </div>
                          <div className="attachment">
                            <div className="thumbnail_conte">
                              <div className="center_image">
                                <img
                                  className="img-fuild"
                                  src={med.m_url}
                                  key={i}
                                  alt="media_images"
                                  style={{ height: "100%", width: "100%" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Media;
