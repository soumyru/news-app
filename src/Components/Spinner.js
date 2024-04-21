import React from "react";
import loading from "./spinner.gif";

const Spinner = () => {
  const spinnerStyle = {
    width: "50px",
    height: "50px",
  };

  return (
    <div className="text-center">
      <img src={loading} alt="loading" style={spinnerStyle}/>
    </div>
  );
};

export default Spinner;

