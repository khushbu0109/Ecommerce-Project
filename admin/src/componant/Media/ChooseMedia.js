import React, { useContext, useEffect, useState } from 'react'
import MediaCon from '../../context/Media/MediaCon'
import categoryCon from "../../context/Category/CategoryContext";
import Preloader from '../Preloader';

export default function ChooseMedia(props) {
  const [preloader, setPreloader] = useState("");
  const context = useContext(MediaCon)
  const { media,
    getAllMedia, deleteMedia, uploadMedia, uploadYtube } = context

  useEffect(() => {
    getAllCatagory("blog")
    getAllMedia()
  }, [])

  const style = {
    background: "#00000080",
    display: "block",
  };
  const [changeimg, setchangeimg] = useState("image")
  const ImageChange = ((m_type) => {
    setchangeimg(m_type)

  })

  /* upload */
  const [mediaInfo, setmediaInfo] = useState({
    "title": "",

    "cat_id": "",
    "m_type": "youtube",
    "m_url": ""
  });
  const onChangeinfo = (e) => {
    setmediaInfo({ ...mediaInfo, [e.target.name]: e.target.value })
  }
  const catContext = useContext(categoryCon)
  const { category,
    getAllCatagory,
  } = catContext
  const [yTube, setyTube] = useState(false)
  const [newMedia, setnewMedia] = useState({
    files: [],
    m_type: false
  })
  const onChange = (e) => {
    setnewMedia({ files: [...newMedia.files, ...e.target.files] })
  }

  const handleClick = async (e) => {
    setPreloader("preShow");
    e.preventDefault();
    let from_data = null
    let response;
    if (!yTube) {
      from_data = new FormData()
      for (let i = 0; i < newMedia.files.length; i++) {
        const element = newMedia.files[i];
        from_data.append("file", element)
      }
      from_data.append("title", mediaInfo.title)
    
      if (mediaInfo.cat_id === "") {
        props.showAlert("please choose category . ", "warning")
        return
      }

      from_data.append("cat_id", mediaInfo.cat_id)
      response = await uploadMedia(from_data)
    }
    else {
      response = await uploadYtube(mediaInfo)
    }
    console.log(response);
    if (response.status === "success") {
      props.showAlert(response.message, "success")
      /*  props.open() */
      getAllMedia()
      setnewMedia({
        files: [],
        m_type: false
      })

    }
    else {
      props.showAlert(response.message, "warning")
    }
    setPreloader("")

    

  }

  const [showUploadForm, setshowUploadForm] = useState(false)
  return (
    <>
      (
      <Preloader show={preloader} />
      <div className="modal mediaModal" style={style}>
        <div className="modal-dialog" >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                choose image  <span className='badge bg-primary' onClick={() => { setshowUploadForm(!showUploadForm) }}> Upload Media</span>
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
              <form
                id="formAccountSettings"
                method="POST"
                className={`${showUploadForm ? "d-block" : "d-none"} mb-3`}
              //onSubmit={handleClick}
              >
                <div className="row ">
                  {/* category add section */}
                  <div className="col-md-12  my-1">
                    <div className="form-group">
                      <label className="form-label"> Select Media Type</label>
                      <table width="100%">
                        <tr>
                          <td><div className="form-check">
                            <input type="radio" className="form-check-input" name="type" defaultChecked={true} value={false} onChange={() => { setyTube(false) }} />
                            <label className="form-label"> Media</label>
                          </div></td>
                          <td><div className="form-check">
                            <input type="radio" className="form-check-input" name="type" value={true} onChange={() => { setyTube(true) }} />
                            <label className="form-label"> YouTube Link</label>
                          </div></td>

                        </tr>
                      </table></div>

                    <form method="post">
                      <div className="form-group">
                        <label className="form-label">Choose Category</label>
                        <select className="form-control" name="cat_id" onChange={onChangeinfo} >
                          <option value={0}>Choose Category</option>
                          {category.map((cat, i) => {
                            return (<option value={cat._id}>{cat.cat_name}</option>)
                          })}
                        </select>

                      </div>
                      <label className="form-label">Enter Title</label>
                      <input
                        type="text"
                        className="form-control    m-0"
                        name="title"
                        id=""
                        multiple
                        aria-describedby="helpId"
                        placeholder="Enter Title"
                        onChange={(e) => {
                          onChangeinfo(e)
                        }}
                      />
                      <label className="form-label">Enter title urdu</label>
                      <input
                        type="text"
                        className="form-control    m-0"
                        name="title2"
                        id=""
                        multiple
                        aria-describedby="helpId"
                        placeholder="Enter Title Urdu"
                        onChange={(e) => {
                          onChangeinfo(e)
                        }}
                      />   <label className="form-label">Enter title hindi</label>
                      <input
                        type="text"
                        className="form-control    m-0"
                        name="title3"
                        id=""
                        multiple
                        aria-describedby="helpId"
                        placeholder="Enter Title Hindi"
                        onChange={(e) => {
                          onChangeinfo(e)
                        }}
                      />
                      {(yTube) ?
                        <>




                          <div className="form-group">
                            <label className="form-label">Enter YouTube Link</label>
                            <input
                              type="text"
                              className="form-control    m-0"
                              name="m_url"
                              id=""
                              multiple
                              aria-describedby="helpId"
                              placeholder="Enter YouTube LInk"
                              onChange={onChangeinfo}
                            />
                          </div>

                        </> : <>


                          <div className="form-group">
                            <label className="form-label">Choose File</label>
                            <input
                              type="file"
                              className="form-control    m-0"
                              name="file"
                              id=""
                              multiple
                              aria-describedby="helpId"

                              onChange={onChange}
                            />
                          </div>

                        </>}


                    </form>
                  </div>
                  {/* category add section end */}
                </div>
                <div className="mt-3">
                  <button
                    type="reset"
                    className="btn btn-outline-primary me-2 my-btn"
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
             
              <div className="row">
                {media.filter((img) => {
                  return img.m_type?.includes(changeimg?.toLowerCase())
                }).map((med, i) => {

                  return (<div className="col-2 mb-2" key={i} onClick={() => {
                    props.selectImage(med.m_url)
                  }} style={{ "position": "relative" }}>
                    {med.m_type?.includes("image") ?
                      <img className="img-fluid" style={{ height: "100px", width: "100%" }} src={med.m_url} alt="media_images" />
                      :
                      <video width="100%" height="100" controls >
                        <source src={med.m_url} type={med.m_type} />
                      </video>

                    }

                  </div>)
                })}

              </div>
            </div>
          </div>
        </div>
      </div>
      )
    </>
  )
}
