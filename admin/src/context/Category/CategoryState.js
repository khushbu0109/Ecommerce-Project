import React, { useState } from "react";
import categoryCon from "./CategoryContext";

const CategoryState = (props) => {
  const host = process.env.REACT_APP_URL;

  const token = localStorage.getItem("token");

  const [category, setCategory] = useState([]);

  const createCategory = async (body) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(body),
      };
      const response = await fetch(`${host}/api/category`, requestOptions);
      const dataresp = await response.json();
      console.log(dataresp + "new data res");
      if (dataresp.status === "success") {
        setCategory(category.concat(dataresp.data));
      }
      return dataresp;
    } catch (e) {}
  };
  const deleteCategory = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    const response = await fetch(`${host}/api/category/${id}`, requestOptions);
    const datares = await response.json();

    console.log(datares + "data res");
    /* setCategory(datares.data); */
    if (datares.status === "Success") {
      const updateData = category.filter((cat) => {
        return cat._id !== id;
      });

      setCategory(updateData);
    }
    return datares;
  };
  const getAllCatagory = async (type) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    const response = await fetch(`${host}/api/category/getAllCat`, requestOptions);
    const datares = await response.json();

    console.log(datares);
    if (datares.status === "Success") {
      const upateData = datares.data.filter((cat) => {
        return cat.cat_type === type;
      });
      setCategory(upateData);
    }
  };
  const updateCategory = async (id, body) => {
    try {
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
        `${host}/api/category/${id}`,
        requestOptions
      );
      const datares = await response.json();
      if (datares.status === "Success") {
        for (let i = 0; i < category.length; i++) {
          let ele = category[i];
          if (ele._id.toString() === id) {
            category[i] = datares.data;
          }
        }

        setCategory(category);
      }
      return datares;
    } catch (e) {}
  };

  const createSubCategory = async (id, body) => {
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
        `${host}/api/category/addSubCat/${id}`,
        requestOptions
      );
      const datares = await response.json();
      console.log(datares);
      if (datares.status === "Success") {
        const comp = datares.data;
        console.log(comp);
        let oldCategory = JSON.parse(JSON.stringify(category));
        for (let index = 0; index < oldCategory.length; index++) {
          const element = oldCategory[index];
          if (element._id === id) {
            oldCategory[index] = comp;
            //console.log(newCompany);
            break;
          }
        }
        setCategory(oldCategory);
      }
      return datares;
    } catch (e) {}
  };
  const deleteSubCategory = async (id, sub_id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    const response = await fetch(
      `${host}/api/category/deleteSubCat/${id}/${sub_id}`,
      requestOptions
    );
    const datares = await response.json();

    console.log(datares + "data res");
    if (datares.status === "Success") {
      for (let i = 0; i < category.length; i++) {
        const cat = category[i];
        for (let j = 0; j < cat.sub_cat.length; j++) {
          const sub_cat = cat.sub_cat[j];
          if (sub_cat._id === sub_id) {
            cat.sub_cat.splice(j, 1);
            break;
          }
        }
      }
      setCategory(category);
    }
    return datares;
  };

  return (
    <categoryCon.Provider
      value={{
        category,
        getAllCatagory,
        createCategory,
        deleteCategory,
        updateCategory,
        createSubCategory,
        deleteSubCategory
      }}
    >
      {props.children}
    </categoryCon.Provider>
  );
};
export default CategoryState;
