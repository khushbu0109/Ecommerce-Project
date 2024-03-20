import React, { useState } from "react";
import VarCon from "./VariationContext";

const VariationState = (props) => {
  const host = process.env.REACT_APP_URL;

  const token = localStorage.getItem("token");


 const [variation,setVariation] = useState([])

  const createVariation= async (body) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(body),
      };
      const response = await fetch(`${host}/api/variation/create`, requestOptions);
      const dataresp = await response.json();
      console.log(dataresp+"new data rwes");
      if (dataresp.status === "success") {
        setVariation(variation.concat(dataresp.data));
      }
      return dataresp;
    } catch (e) {}
  };
  const deleteVariation= async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    const response = await fetch(`${host}/api/variation/${id}`, requestOptions);
    const datares = await response.json();

    console.log(datares+"data res");
    /* setVariation(datares.data); */
    if (datares.status === "Success") {
      const updateData = variation.filter((pro) => {
        return pro._id !== id;
      });

      setVariation(updateData);
    }
    return datares;
  };
  const getAllVariation = async (type) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    const response = await fetch(`${host}/api/variation/`, requestOptions);
    const datares = await response.json();

    console.log(datares);
    if (datares.status === "Success") {
      const upateData = datares.data
      .filter((cat) => {
        return cat.cat_type === type;
      });
      setVariation(upateData);
    }
  };
  const updateVariation= async (id, body) => {

    try{
      console.log(body);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(`${host}/api/variation/edit/${id}`, requestOptions);
    const datares = await response.json();
      if (datares.status === "Success") {
        for (let i = 0; i < variation.length; i++) {
          let ele = variation[i];
          if (ele._id.toString() === id) {
            variation[i] = datares.data;
          }
        }

        setVariation(variation);
    }
    return datares;}
    catch (e) {}


  };




  return (
    <VarCon.Provider
      value={{
        variation,
        getAllVariation,
        createVariation,
        updateVariation,
        deleteVariation

      }}
    >
      {props.children}
    </VarCon.Provider>
  );
};
export default VariationState;
