import React, { useState } from "react";
import MediaCon from "./MediaCon";
/* require("dotenv").config(); */
const MediaState = (props) => {
  const host = process.env.REACT_APP_URL;
  //console.log(host);
  const token = localStorage.getItem("token");
  //console.log(token);


  const [media, setMedia] = useState([]);


  const deleteMedia = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
    };
    const response = await fetch(
      `${host}/api/media/deleteMedia/${id}`,
      requestOptions
    );
    const datares = await response.json();

    console.log(datares);
    /* setCategory(datares.data); */
    if(datares.status=== "Success"){
      const updateData = media.filter((cat)=>{
        return cat._id!==id

      })
      setMedia(updateData)
      return datares
    }
  };
  const getAllMedia = async (id) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
    };
    const response = await fetch(
      `${host}/api/media`,
      requestOptions
    );
    const datares = await response.json();

    console.log(datares);
    setMedia(datares.data);
  };

  const uploadMedia = async (formdata) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {

          "auth-token": token
        }, body: formdata
      };
      const response = await fetch(
        `${host}/api/media/uploadmedia`,
        requestOptions
      );
      const dataresp = await response.json();
      console.log(dataresp);
      if (dataresp.status === "success") {
        setMedia(media.concat(dataresp.data))
      }
      return dataresp
    }
    catch (e) {

    }
  }

  const uploadYtube = async (formdata) => {
    try {
      console.log(formdata)
      const requestOptions = {
        method: "POST",
        headers: {

          "auth-token": token
        }, body: JSON.stringify(formdata)

      };
      const response = await fetch(
        `${host}/api/media/uploadYlink`,
        requestOptions
      );
      const dataresp = await response.json();
      console.log(dataresp);
      if (dataresp.status === "success") {
        setMedia(media.concat(dataresp.data))
      }
      return dataresp
    }
    catch (e) {

    }
  }

  const UpdateTitle = async ( id,body) => {
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        }, body: JSON.stringify(body)
      };
      const response = await fetch(
        `${host}/api/media/updateTitle/${id}`,
        requestOptions
      );
      const dataresp = await response.json();
      console.log(dataresp);
      if (dataresp.status === "Success") {

        for(let i = 0; i < media.length; i++){
          let element = media[i];
          if(element._id.toString() === id){
            media[i] = dataresp.data;
          }
        }
        setMedia(media);
      }
      return dataresp;

    }
    catch (e) {

    }
  }
  return (
    <MediaCon.Provider
      value={{
        media,
        getAllMedia,
        uploadMedia,
        deleteMedia,
        uploadYtube,
        UpdateTitle
      }}

    >
      {props.children}
    </MediaCon.Provider>
  );
}
export default MediaState;