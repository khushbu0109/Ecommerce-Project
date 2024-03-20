import React, { useState } from "react";
import LoginCon from "./LoginCon";


const LoginState = (props) => {
  const host = process.env.REACT_APP_URL;
  console.log(host);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkZjg4YWFhNDllYjE2NzFjYTdkZGNhIn0sImlhdCI6MTY3NTU5NTEzN30.xGYO_zIQPGR5YvcYhQFDlInCydDomn6Lrsqv6bZmrMQ";
  console.log(token);


  const [user, setUser] = useState([]);

  const createUser = async (body) => {

  }
  const deleteUser = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
    };
    const response = await fetch(
      `${host}/api/user/deleteuser/${id}`,
      requestOptions
    );
    const datares = await response.json();

    console.log(datares);
    setUser(datares.data);
    if (datares.status === "Success") {
      const updateData = user.filter((cat) => {
        return cat._id !== id

      })
      setUser(updateData)
    }
    return datares
  };
  const UserLogin = async (body) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token

      }, body: JSON.stringify(body)
    };
    const response = await fetch(
      `${host}/api/user/login`,
      requestOptions
    );
    const datares = await response.json();

    return datares;

  };


  return (
    <LoginCon.Provider
      value={{
        user,
        UserLogin,
        deleteUser,
        createUser

      }}

    >
      {props.children}
    </LoginCon.Provider>
  );
}
export default LoginState;