import { useState } from "react";
import React from "react";
export default function MyManageButton(props) {
  const [mystyle, setMystyle] = useState({
    left: "0%",
  });
  
  const setActive = (type) => {
    console.log(type);
    props.setManageType(type);
    if (type === "active") {
      const data = {
        left: "0%",
      };
      setMystyle(data);
    } else if (type === "pending") {
      const data = {
        left: "50%",
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
      <div className="wraperManage">
        <div className="btn_group">
          <p
            className="btn_two activeSlider"
            onClick={() => {
              setActive("active");
            }}
            id="active"
          >
            <span>Manage Customers</span>
            <div className="btn_bg" style={mystyle}></div>
          </p>
          <p
            className="btn_one slid_btn_active "
            onClick={() => {
              setActive("pending");
            }}
            id="pending"
          >
            <span>Manage Products</span>
          </p>          
        </div>
      </div>
    </>
  );
}
