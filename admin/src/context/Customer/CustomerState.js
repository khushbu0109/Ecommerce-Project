import React, { useState } from "react";
import Custcon from "./CustomerCon";

const CustomerState = (props) => {
  const host = process.env.REACT_APP_URL;

  const token = localStorage.getItem("token");

  const [customer, setCustomer] = useState([]);

  const createCustomer = async (body) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(body),
      };
      const response = await fetch(
        `${host}/api/customer/createCustomer`,
        requestOptions
      );
      const dataresp = await response.json();
      console.log(dataresp + "new data res");
      if (dataresp.status === "success") {
        setCustomer(customer.concat(dataresp.data));
      }
      return dataresp;
    } catch (e) {}
  };
  const deleteCustomer = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    const response = await fetch(
      `${host}/api/customer/deletecustomer/${id}`,
      requestOptions
    );
    const datares = await response.json();

    console.log(datares + "data res");
    /* setCustomer(datares.data); */
    if (datares.status === "Success") {
      const updateData = customer.filter((pro) => {
        return pro._id !== id;
      });

      setCustomer(updateData);
    }
    return datares;
  };
  const getAllcustomer = async (type) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    const response = await fetch(
      `${host}/api/customer/getCustomer`,
      requestOptions
    );
    const datares = await response.json();

    console.log(datares);
    if (datares.status === "Success") {
      const upateData = datares.data.filter((cat) => {
        return cat.cat_type === type;
      });
      setCustomer(upateData);
    }
  };
  const updatecustomer = async (id, body) => {
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
    const response = await fetch(
      `${host}/api/customer/updateCustomer/${id}`,
      requestOptions
    );
    const datares = await response.json();
      if (datares.status === "Success") {
        for (let i = 0; i < customer.length; i++) {
          let ele = customer[i];
          if (ele._id.toString() === id) {
            customer[i] = datares.data;
          }
        }

        setCustomer(customer);
      }
    return datares;
  }catch (e) {}
  };
  return (
    <Custcon.Provider
      value={{
        customer,
        getAllcustomer,
        createCustomer,
        updatecustomer,
        deleteCustomer,
      }}
    >
      {props.children}
    </Custcon.Provider>
  );
};

export default CustomerState;
