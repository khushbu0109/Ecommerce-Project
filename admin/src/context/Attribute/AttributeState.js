import React, { useState } from "react";
import attributeCon from "./AttributeContext";

const AttributeState = (props) => {
  const host = process.env.REACT_APP_URL;

  const token = localStorage.getItem("token");


 const [attribute,setAttribute] = useState([])

  const createAttribute = async (body) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(body),
      };
      const response = await fetch(`${host}/api/attribute/addAttribute`, requestOptions);
      const dataresp = await response.json();
      console.log(dataresp+"new data rwes");
      if (dataresp.status === "success") {
        setAttribute(attribute.concat(dataresp.data));
      }
      return dataresp;
    } catch (e) {}
  };
  const deleteattribute = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    const response = await fetch(`${host}/api/attribute/deleteAttribute/${id}`, requestOptions);
    const datares = await response.json();

    console.log(datares+"data res");
    /* setAttribute(datares.data); */
    if (datares.status === "Success") {
      const updateData = attribute.filter((att) => {
        return att._id !== id;
      });

      setAttribute(updateData);
    }
    return datares;
  };
  const getAllAttribute = async (type) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    const response = await fetch(`${host}/api/attribute/getAtt`, requestOptions);
    const datares = await response.json();

    console.log(datares);
    if (datares.status === "Success") {
      const upateData = datares.data
      .filter((att) => {
        return att.cat_type === type;
      });
      setAttribute(upateData);
    }
  };
  const updateAttribute = async (id, body) => {
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
    const response = await fetch(`${host}/api/attribute/editAttribute/${id}`, requestOptions);
    const datares = await response.json();
      if (datares.status === "Success") {
        for (let i = 0; i < attribute.length; i++) {
          let ele = attribute[i];
          if (ele._id.toString() === id) {
            attribute[i] = datares.data;
          }
        }

        setAttribute(attribute);
      }
    return datares;
    }catch (e) {}

  };




  return (
    <attributeCon.Provider
      value={{
        attribute,
        getAllAttribute,
        createAttribute,
        deleteattribute,
        updateAttribute,

      }}
    >
      {props.children}
    </attributeCon.Provider>
  );
};
export default AttributeState;
