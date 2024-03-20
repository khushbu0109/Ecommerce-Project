const host = process.env.REACT_APP_URL;
const token = localStorage.getItem("token");

const isFormData = (body) => {
  return body instanceof FormData;
};

const serverCallFuction = async (
  method = "GET",
  endPoints = "",
  body = null
) => {
  try {
    let header = {};

    if (body) {
      if (!isFormData(body)) {
        header = {
          "Content-Type": "application/json",
        };
      } else {
        header = {
          "auth-token": token,
        };
      }
    } else {
      header = {
        "Content-Type": "application/json",
      };
    }

    const requestOptions = {
      method: method,
      headers: header,
      body: body ? (isFormData(body) ? body : JSON.stringify(body)) : null,
    };

    console.log(requestOptions);
    const response = await fetch(`${host}/api/${endPoints}`, requestOptions);
    const dataresp = await response.json();
    return dataresp;
  } catch (e) {
    return e;
  }
};

export default serverCallFuction;
