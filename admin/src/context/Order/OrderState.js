import React, { useState } from "react";
import OrderContext from "./OrderContext";

const OrderState = (props) => {
  const host = process.env.REACT_APP_URL;

  const token = localStorage.getItem("token");


 const [order,setOrder] = useState([])

  const createOrder = async (body) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(body),
      };
      const response = await fetch(`${host}/api/order/postOrder`, requestOptions);
      const dataresp = await response.json();
      console.log(dataresp+"new data ");
      if (dataresp.status === "Success") {
        setOrder(order.concat(dataresp.data));
      }
      return dataresp;
    } catch (e) {}
  };
  const deleteOrder = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    const response = await fetch(`${host}/api/order/deleteOrder/${id}`, requestOptions);
    const datares = await response.json();

    console.log(datares+"data res");
    /* setOrder(datares.data); */
    if (datares.status === "Success") {
      const updateData = order.filter((att) => {
        return att._id !== id;
      });

      setOrder(updateData);
    }
    return datares;
  };
  const getAllOrder = async (type) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    const response = await fetch(`${host}/api/order/getOrder`, requestOptions);
    const datares = await response.json();

    console.log(datares);
    if (datares.status === "Success") {
      const upateData = datares.data
      .filter((att) => {
        return att.cat_type === type;
      });
      setOrder(upateData);
    }
  };
  const updateOrder = async (id, body) => {
    console.log(body);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(`${host}/api/order/updateOrder/${id}`, requestOptions);
    const datares = await response.json();
    if (datares.status === "Success") {
      for (let i = 0; i < order.length; i++) {
        let ele = order[i];
        if (ele._id.toString() === id) {
          order[i] = datares.data;
        }
      }

      setOrder(order);
    }
    return datares;

    console.log(datares);
  };




  return (
    <OrderContext.Provider
      value={{
        order,
        getAllOrder,
        createOrder,
        deleteOrder,
        updateOrder,

      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};
export default OrderState;
