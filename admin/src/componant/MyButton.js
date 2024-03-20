import { useState } from "react";
import React from "react";
export default function MyButton(props) {
  const [mystyle, setMystyle] = useState({
    left: "0%",
  });
  const setActive = (type) => {
    console.log(type);
    if (type === "active") {
      const data = {
        left: "0%",
      };
      setMystyle(data);
    } else if (type === "pending") {
      const data = {
        left: "33.33%",
      };
      setMystyle(data);
    } else if (type === "block") {
      const data = {
        left: "66.67%",
      };
      setMystyle(data);
    }
  };
  return (
    <>
      <div className="wraper">
        <div className="btn_group">
          <p
            className="btn_two"
            onClick={() => {
              setActive("active");
            }}
            id="active"
          >
            <span>Active</span>
            <span className="btn_bg" style={mystyle}></span>
          </p>
          <p
            className="btn_one slid_btn_active "
            onClick={() => {
              setActive("pending");
            }}
            id="pending"
          >
            <span>Pending</span>
          </p>
          <p
            className="btn_three"
            onClick={() => {
              setActive("block");
            }}
            id="block"
          >
            <span>Block</span>
          </p>
        </div>
      </div>
    </>
  );
}
