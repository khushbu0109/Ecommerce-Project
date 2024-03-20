import React, { useEffect } from "react";

function Redirect(props) {
  useEffect(() => {
    window.location.replace(
      "https://play.google.com/store/apps/details?com.myorderslip"
    );
  }, []);

  return <></>;
}

export default Redirect;
