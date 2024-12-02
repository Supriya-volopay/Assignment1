import React from "react";
import loading from "../../assets/img/loading.gif";

const Loading = ({ height }) => {
  return (
    <div className="w-full flex items-center justify-center">
      <img className={`${height}`} src={loading} alt="Loading" />
    </div>
  );
};

export default Loading;
