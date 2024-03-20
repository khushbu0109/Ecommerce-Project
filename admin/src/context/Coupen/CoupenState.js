import React, { useState } from "react";
import couponCon from './CoupenContext';

const CoupenState = (props) => {
  const host = process.env.REACT_APP_URL;

  const token = localStorage.getItem("token");


 const [coupon,setCoupon] = useState([])

  const createCoupon = async (body) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(body),
      };
      const response = await fetch(`${host}/api/coupon/create`, requestOptions);
      const dataresp = await response.json();
      console.log(dataresp+"new data rwes");
      if (dataresp.status === "Success") {
        setCoupon(coupon.concat(dataresp.data));
      }
      return dataresp;
    } catch (e) {}
  };
  const deleteCoupon = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    const response = await fetch(`${host}/api/coupon/${id}`, requestOptions);
    const datares = await response.json();

    console.log(datares+"data res");
    /* setCoupon(datares.data); */
    if (datares.status === "Success") {
      const updateData = coupon.filter((coupon) => {
        return coupon._id !== id;
      });

      setCoupon(updateData);
    }
    return datares;
  };
  const getAllCoupon = async (type) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    const response = await fetch(`${host}/api/coupon/`, requestOptions);
    const datares = await response.json();

    console.log(datares);
    if (datares.status === "Success") {
      const upateData = datares.data
      .filter((cat) => {
        return cat.cat_type === type;
      });
      setCoupon(upateData);
    }
  };
  const updateCoupon = async (id, body) => {
    console.log(body);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(`${host}/api/coupon/edit/${id}`, requestOptions);
    const datares = await response.json();
    if (datares.status === "Success") {
      const data = coupon.map((b) => {
        return b._id === id ? datares.data : b;
      });
      console.log(data);
      setCoupon(data);
    }
    return datares;


  };




  return (
    <couponCon.Provider
      value={{
        coupon,
        getAllCoupon,
        createCoupon,
        deleteCoupon,
        updateCoupon,

      }}
    >
      {props.children}
    </couponCon.Provider>
  );
};
export default CoupenState;
