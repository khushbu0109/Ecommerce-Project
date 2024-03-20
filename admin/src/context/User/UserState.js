import React, { useState } from "react";
import userCon from "./UserCon";

const userState = (props) => {
  const host = process.env.REACT_APP_URL;

  const token = localStorage.getItem("token");


const [user, setUser] = useState([])

  const createUser = async (body) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(body),
      };
      const response = await fetch(`${host}/api/user`, requestOptions);
      const dataresp = await response.json();
      console.log(dataresp+"new data rwes");
      if (dataresp.status === "success") {
        setUser(user.concat(dataresp.data));
      }
      return dataresp;
    } catch (e) {}
  };
  const deleteUser = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    const response = await fetch(`${host}/api/attribute/deleteUser/${id}`, requestOptions);
    const datares = await response.json();

    console.log(datares+"data res");
    /* setAttribute(datares.data); */
    if (datares.status === "Success") {
      const updateData = user.filter((att) => {
        return att._id !== id;
      });

      setUser(updateData);
    }
    return datares;
  };
  const getAllUser = async (type) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    const response = await fetch(`${host}/api/user/checkAdmin`, requestOptions);
    const datares = await response.json();

    console.log(datares);
    if (datares.status === "Success") {
      const upateData = datares.data
      .filter((user) => {
        return user.cat_type === type;
      });
      setUser(upateData);
    }
  };
  const updateUser = async (id, body) => {
    console.log(body);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(`${host}/api/user/${id}`, requestOptions);
    const datares = await response.json();
    if (datares.status === "Success") {
      const data = user.map((b) => {
        return b._id === id ? datares.data : b;
      });
      console.log(data);
      setUser(data);
    }
    return datares;

    console.log(datares);
  };




  return (
    <userCon.Provider
      value={{
       user,
       getAllUser,
       createUser,
       updateUser,
       deleteUser

      }}
    >
      {props.children}
    </userCon.Provider>
  );
};
export default userState;
