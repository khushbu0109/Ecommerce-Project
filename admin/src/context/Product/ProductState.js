import React, { useState } from "react";
import ProCon from "./ProCon";

const ProductState = (props) => {
  const host = process.env.REACT_APP_URL;

  const token = localStorage.getItem("token");

  const [product, setProduct] = useState([]);

  const createProduct = async (body) => {
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
        `${host}/api/product/addProduct`,
        requestOptions
      );
      const dataresp = await response.json();
      console.log(dataresp + "new data rwes");
      if (dataresp.status === "success") {
        setProduct(product.concat(dataresp.data));
      }
      return dataresp;
    } catch (e) {}
  };
  const deleteProduct = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    const response = await fetch(
      `${host}/api/product/deleteProduct/${id}`,
      requestOptions
    );
    const datares = await response.json();

    console.log(datares + "data res");
    /* setProduct(datares.data); */
    if (datares.status === "Success") {
      const updateData = product.filter((pro) => {
        return pro._id !== id;
      });

      setProduct(updateData);
    }
    return datares;
  };
  const getAllProduct = async (type) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    const response = await fetch(
      `${host}/api/product/getProduct`,
      requestOptions
    );
    const datares = await response.json();

    console.log(datares);
    if (datares.status === "Success") {
      const upateData = datares.data.filter((cat) => {
        return cat.cat_type === type;
      });
      setProduct(upateData);
    }
  };
  const updateProduct = async (id, body) => {
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
     const response = await fetch(`${host}/api/product/updateProduct/${id}`, requestOptions);
     const datares = await response.json();
     if (datares.status === "Success") {

         for(let i = 0;i<product.length;i++){
           let ele = product[i]
           if(ele._id.toString()===id){
             product[i] = datares.data
           }
         }

       setProduct(product);
     }
     return datares;
    }
 catch(e){

 }
   };

  return (
    <ProCon.Provider
      value={{
        product,
        getAllProduct,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {props.children}
    </ProCon.Provider>
  );
};
export default ProductState;
