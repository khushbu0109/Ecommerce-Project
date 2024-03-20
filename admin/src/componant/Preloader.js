import React from "react";

import "../css/preloader.css";

export default function Preloader(props) {
  
  return (
    <>
    
      <div className={"loaderBody " +  props.show}>
        <div className="loader"></div>
      </div>
    
    </>
  );
}
